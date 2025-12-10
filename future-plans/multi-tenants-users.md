# Multi-Tenant Identity Architecture Plan

## Problem Statement

Current implementation uses Microsoft OID directly as the primary key in the users table. This creates critical issues:

1. **Multi-tenant collision risk**: OIDs from different tenants could theoretically collide
2. **Tight coupling**: User identity tied to external provider ID
3. **Email uniqueness constraint**: Blocks same email from different tenants (different people)
4. **No multi-provider support**: Cannot link multiple auth methods (MS Tenant A + MS Tenant B + NAFATH)
5. **Email change breaks identity**: Changing email in Azure AD cannot preserve user data

## Requirements (User-Confirmed)

- Support TWO Microsoft Azure AD tenants (different domains)
- Same email in different tenants = DIFFERENT users (separate identities)
- Email changes should PRESERVE user identity and all data
- Design for future: Saudi NAFATH login support
- Use internal UUID generation (not external provider IDs)

## Recommended Architecture

### Two-Table Design: Users + External Identities

**Core Concept**: Separate internal user identity from external authentication providers.

```
┌─────────────────────────┐
│   users                 │
│  (Internal Identity)    │
├─────────────────────────┤
│ id (UUID, PK)           │  ← Our stable identifier
│ email                   │  ← NO UNIQUE constraint
│ name                    │
│ givenName               │
│ familyName              │
│ preferredUsername       │
│ metadata (JSONB)        │
└─────────────────────────┘
          ▲
          │ (1:N)
          │
┌─────────────────────────────────────────┐
│   external_identities                   │
│  (Provider Authentication Links)        │
├─────────────────────────────────────────┤
│ id (UUID, PK)                           │
│ userId (FK → users.id)                  │
│ provider (ENUM)                         │  ← microsoft_tenant_a
│ providerUserId (OID)                    │      microsoft_tenant_b
│ providerTenantId (TID)                  │      nafath
│ providerEmail                           │
│ rawClaims (JSONB)                       │
│ linkedAt                                │
│ lastSeenAt                              │
│                                         │
│ UNIQUE(provider, providerUserId,        │
│        providerTenantId)                │
└─────────────────────────────────────────┘
```

## Why This Design Works

### Multi-Tenant Scenario

```
Scenario: alice@example.com exists in both tenants

Tenant A Login (OID: abc-123, TID: tenant-a):
  → External Identity lookup: (microsoft_tenant_a, abc-123, tenant-a)
  → NOT FOUND
  → Create User #1 (UUID: user-aaa-111)
  → Create External Identity → User #1

Tenant B Login (OID: xyz-789, TID: tenant-b):
  → External Identity lookup: (microsoft_tenant_b, xyz-789, tenant-b)
  → NOT FOUND
  → Create User #2 (UUID: user-bbb-222)
  → Create External Identity → User #2

Result: Two separate users, no conflict
```

### Email Change Preservation

```
Login 1: email=old@company.com, OID=abc-123
  → User created with email=old@company.com

[User changes email in Azure AD]

Login 2: email=new@company.com, OID=abc-123 (SAME OID)
  → External Identity lookup: (provider, abc-123, tenant-id)
  → FOUND → Linked to existing User
  → Update User.email = new@company.com
  → All data preserved (same UUID)
```

### Future Multi-Provider Support

```
User logs in via MS Tenant A:
  → User created (UUID: user-123)
  → External Identity: (microsoft_tenant_a, oid-abc, tid-a)

Same user later links NAFATH:
  → External Identity: (nafath, nafath-id-xyz, null)
  → Both linked to User #123

User can now login via either provider → same internal User
```

## Database Schema

### Updated `users` Table

```typescript

@Entity('users')
export class User extends BaseEntity {
  // BaseEntity provides: @PrimaryGeneratedColumn('uuid') id

  @Column({nullable: true})
  email: string; // NO UNIQUE CONSTRAINT

  @Column({nullable: true})
  name: string;

  @Column({nullable: true, name: 'given_name'})
  givenName: string;

  @Column({nullable: true, name: 'family_name'})
  familyName: string;

  @Column({nullable: true, name: 'preferred_username'})
  preferredUsername: string;

  @Column({type: 'jsonb', nullable: true})
  metadata: Record<string, any>;

  @OneToMany(() => ExternalIdentity, identity => identity.user, {cascade: true})
  externalIdentities: ExternalIdentity[];
}
```

### New `external_identities` Table

```typescript
export enum AuthProvider {
  MICROSOFT_TENANT_A = 'microsoft_tenant_a',
  MICROSOFT_TENANT_B = 'microsoft_tenant_b',
  NAFATH = 'nafath',
}

@Entity('external_identities')
@Index(['provider', 'providerUserId', 'providerTenantId'], {unique: true})
export class ExternalIdentity extends BaseEntity {
  @ManyToOne(() => User, user => user.externalIdentities, {onDelete: 'CASCADE'})
  @JoinColumn({name: 'user_id'})
  user: User;

  @Column({type: 'uuid', name: 'user_id'})
  userId: string;

  @Column({type: 'enum', enum: AuthProvider})
  provider: AuthProvider;

  @Column({type: 'varchar', length: 255, name: 'provider_user_id'})
  providerUserId: string; // MS: 'oid', NAFATH: user_id

  @Column({type: 'varchar', length: 255, nullable: true, name: 'provider_tenant_id'})
  providerTenantId: string; // MS: 'tid', NAFATH: null

  @Column({type: 'varchar', length: 500, nullable: true, name: 'provider_email'})
  providerEmail: string;

  @Column({type: 'jsonb', nullable: true, name: 'raw_claims'})
  rawClaims: Record<string, any>;

  @CreateDateColumn({name: 'linked_at'})
  linkedAt: Date;

  @UpdateDateColumn({name: 'last_seen_at'})
  lastSeenAt: Date;
}
```

## Identity Resolution Logic

### Core Service: `IdentityService`

```typescript
async
findOrCreateUserByExternalIdentity(data
:
ExternalIdentityData
):
Promise < User > {
  // Step 1: Find existing external identity
  const externalIdentity = await this.externalIdentityRepository.findOne({
    where: {
      provider: data.provider,
      providerUserId: data.providerUserId,
      providerTenantId: data.providerTenantId || null,
    },
    relations: ['user'],
  });

  if(externalIdentity) {
    // EXISTING USER PATH
    // Update external identity metadata
    externalIdentity.providerEmail = data.providerEmail;
    externalIdentity.rawClaims = data.rawClaims;
    await this.externalIdentityRepository.save(externalIdentity);

    // Update user profile (handles email changes)
    const user = externalIdentity.user;
    user.email = data.userProfile.email || user.email;
    user.name = data.userProfile.name || user.name;
    user.givenName = data.userProfile.givenName || user.givenName;
    user.familyName = data.userProfile.familyName || user.familyName;
    user.preferredUsername = data.userProfile.preferredUsername || user.preferredUsername;
    await this.userRepository.save(user);

    return user;
  }

  // NEW USER PATH
  // Step 2: Create user
  const user = this.userRepository.create({
    email: data.userProfile.email,
    name: data.userProfile.name,
    givenName: data.userProfile.givenName,
    familyName: data.userProfile.familyName,
    preferredUsername: data.userProfile.preferredUsername,
  });
  await this.userRepository.save(user);

  // Step 3: Link external identity
  const newIdentity = this.externalIdentityRepository.create({
    userId: user.id,
    provider: data.provider,
    providerUserId: data.providerUserId,
    providerTenantId: data.providerTenantId,
    providerEmail: data.providerEmail,
    rawClaims: data.rawClaims,
  });
  await this.externalIdentityRepository.save(newIdentity);

  return user;
}
```

## JWT Authentication Strategy

### Multi-Tenant Approach: Separate Strategies Per Tenant

Each tenant gets its own Passport strategy with tenant-specific configuration.

**`jwt-tenant-a.strategy.ts`:**

```typescript

@Injectable()
export class JwtTenantAStrategy extends PassportStrategy(Strategy, 'jwt-tenant-a') {
  constructor(
    private configService: ConfigService,
    private identityService: IdentityService,
  ) {
    const tenantId = configService.get('AZURE_AD_TENANT_A_ID');
    const clientId = configService.get('AZURE_AD_TENANT_A_CLIENT_ID');

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      audience: clientId,
      issuer: `https://login.microsoftonline.com/${tenantId}/v2.0`,
      algorithms: ['RS256'],
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://login.microsoftonline.com/${tenantId}/discovery/v2.0/keys`,
      }),
    });
  }

  async validate(payload: MicrosoftTokenPayload) {
    if (!payload.oid) {
      throw new UnauthorizedException('Token missing oid claim');
    }

    const user = await this.identityService.findOrCreateUserByExternalIdentity({
      provider: AuthProvider.MICROSOFT_TENANT_A,
      providerUserId: payload.oid,
      providerTenantId: payload.tid,
      providerEmail: payload.email || payload.upn,
      rawClaims: payload,
      userProfile: {
        email: payload.email || payload.upn,
        name: payload.name,
        givenName: payload.given_name,
        familyName: payload.family_name,
        preferredUsername: payload.preferred_username,
      },
    });

    return user; // Attached to request.user
  }
}
```

**`jwt-tenant-b.strategy.ts`:** Similar implementation with Tenant B config and `AuthProvider.MICROSOFT_TENANT_B`

### Multi-Strategy Guard

```typescript

@Injectable()
export class JwtAuthGuard extends AuthGuard(['jwt-tenant-a', 'jwt-tenant-b']) {
  // Passport tries strategies in order until one succeeds
  // Token from Tenant A → jwt-tenant-a succeeds
  // Token from Tenant B → jwt-tenant-a fails, jwt-tenant-b succeeds
  // Token from unknown tenant → both fail, 401 Unauthorized
}
```

**Usage**: Applied per-controller with `@UseGuards(JwtAuthGuard)` decorator (not enabled globally)

## Environment Configuration

Update `be/.env`:

```env
# Microsoft Tenant A
AZURE_AD_TENANT_A_ID=859f050e-9731-4556-aab4-683a27e7fa1b
AZURE_AD_TENANT_A_CLIENT_ID=6a913976-173d-402e-830c-35e02c87a7c3

# Microsoft Tenant B
AZURE_AD_TENANT_B_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
AZURE_AD_TENANT_B_CLIENT_ID=yyyyyyyy-yyyy-yyyy-yyyy-yyyyyyyyyyyy

# Database (unchanged)
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=project_management
```

## Edge Cases Handled

### 1. Same Email, Different Tenants

**Scenario**: alice@example.com exists in both Tenant A and Tenant B (different people)

**Resolution**: Two separate `User` records created, each linked to their respective `ExternalIdentity`. No conflict because email has no UNIQUE constraint.

### 2. Email Change in Azure AD

**Scenario**: User changes email from old@company.com → new@company.com

**Resolution**: External identity lookup uses (provider, OID, TID) → finds existing user → updates `User.email` → all data preserved.

### 3. Account Deletion & Re-creation

**Scenario**: User deletes their MS account, someone else creates account with same email later

**Resolution**: If OID changes → new `ExternalIdentity` → new `User`. If OID somehow reused (rare) → same user reactivated.

### 4. Concurrent Login Race Condition

**Scenario**: First-time user submits two login requests simultaneously

**Resolution**: Composite UNIQUE constraint on `external_identities` prevents duplicate insertion. One request succeeds, other gets constraint violation and retries.

### 5. Provider Account Deleted

**Scenario**: User's MS account deleted in Azure AD, but User record still exists

**Resolution**: `ExternalIdentity.lastSeenAt` tracks last login. Periodic cleanup job can mark stale identities (90+ days) or offer account unlinking.

## Implementation Steps

### Phase 1: Create New Entities & Services

**Files to CREATE:**

1. `be/src/app/auth/entities/external-identity.entity.ts` - External identity linking entity
2. `be/src/app/auth/enums/auth-provider.enum.ts` - Provider enum (tenant_a, tenant_b, nafath)
3. `be/src/app/auth/services/identity.service.ts` - Core identity resolution logic
4. `be/src/app/auth/strategies/jwt-tenant-a.strategy.ts` - Tenant A JWT strategy
5. `be/src/app/auth/strategies/jwt-tenant-b.strategy.ts` - Tenant B JWT strategy
6. `be/src/app/auth/interfaces/external-identity-data.interface.ts` - DTO for identity linking

### Phase 2: Update Existing Entities

**Files to MODIFY:**

1. `be/src/app/auth/entities/user.entity.ts`
  - Change PK from `@PrimaryColumn('uuid')` to extend `BaseEntity` (provides UUID PK)
  - Remove `@Column({unique: true})` from email → `@Column({ nullable: true })`
  - Remove tenant-specific fields (tenantId, roles, rawClaims)
  - Add `@OneToMany` relation to `externalIdentities`

### Phase 3: Update Auth Module & Guards

**Files to MODIFY:**

1. `be/src/app/auth/auth.module.ts`
  - Add `ExternalIdentity` to TypeORM entities
  - Register `IdentityService`
  - Register both JWT strategies (`JwtTenantAStrategy`, `JwtTenantBStrategy`)
  - Remove old `UserService` and `JwtStrategy`
  - Keep global guard **disabled** (per-controller auth only)

2. `be/src/app/auth/guards/jwt-auth.guard.ts`
  - Update to multi-strategy: `AuthGuard(['jwt-tenant-a', 'jwt-tenant-b'])`
  - Rejects tokens from unconfigured tenants (returns 401)

### Phase 4: Environment & Configuration

**Files to MODIFY:**

1. `be/.env` - Add tenant-specific environment variables

### Phase 5: Migration Strategy

**Confirmed Approach**: Fresh start (no production data)

- Drop existing `users` table
- Let TypeORM `synchronize: true` create new schema automatically
- Clean slate with new multi-tenant architecture

### Phase 6: Deprecate Old Files

**Files to REMOVE** (after migration):

1. `be/src/app/auth/services/user.service.ts` - Replaced by IdentityService
2. `be/src/app/auth/strategies/jwt.strategy.ts` - Replaced by tenant-specific strategies

## Testing Strategy

### Unit Tests

- `IdentityService.findOrCreateUserByExternalIdentity()`:
  - New user creation
  - Existing user update
  - Email change preservation
  - Multi-tenant isolation

### Integration Tests

- Full authentication flow with mock JWT tokens
- Tenant A token → User A created
- Tenant B token (same email) → User B created
- Email change token → User A updated

### E2E Tests

- Real Azure AD token validation
- JWKS public key fetching
- Concurrent login handling

## Future Enhancements

### 1. NAFATH Integration

- Add `NAFATH` to `AuthProvider` enum
- Create `jwt-nafath.strategy.ts` (or custom NAFATH flow)
- Update `JwtAuthGuard` to include `'jwt-nafath'`

### 2. Identity Linking UI

- Endpoint: `POST /auth/link-identity`
- User logs in with Tenant A, can link Tenant B or NAFATH
- Creates additional `ExternalIdentity` for same `User.id`

### 3. Admin Dashboard

- View all users and their linked external identities
- Manually merge duplicate accounts (if needed)
- Unlink identities
- View login history via `lastSeenAt` timestamps

### 4. Audit Trail Enhancement

- Track which external identity was used for each action
- Modify `BaseEntity` to include `performedViaIdentityId`

## Critical Files Reference

### Files to Create (6 new files)

1. `be/src/app/auth/entities/external-identity.entity.ts`
2. `be/src/app/auth/enums/auth-provider.enum.ts`
3. `be/src/app/auth/services/identity.service.ts`
4. `be/src/app/auth/strategies/jwt-tenant-a.strategy.ts`
5. `be/src/app/auth/strategies/jwt-tenant-b.strategy.ts`
6. `be/src/app/auth/interfaces/external-identity-data.interface.ts`

### Files to Modify (4 files)

1. `be/src/app/auth/entities/user.entity.ts`
2. `be/src/app/auth/auth.module.ts`
3. `be/src/app/auth/guards/jwt-auth.guard.ts`
4. `be/.env`

### Files to Remove (2 files, after migration)

1. `be/src/app/auth/services/user.service.ts`
2. `be/src/app/auth/strategies/jwt.strategy.ts`

## Summary

This architecture provides:

- ✅ Multi-tenant support with identity isolation
- ✅ Email change preservation
- ✅ Future multi-provider extensibility (NAFATH)
- ✅ Internal UUID-based stable identifiers
- ✅ No external provider coupling
- ✅ Composite unique constraints prevent data integrity issues
- ✅ Production-ready with comprehensive edge case handling
