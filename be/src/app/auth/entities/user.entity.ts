import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryColumn('uuid')
  id: string; // Microsoft 'oid' (Object ID)

  @Column({unique: true})
  email: string; // 'email' or 'upn' claim

  @Column({nullable: true})
  name: string; // 'name' claim

  @Column({nullable: true})
  preferredUsername: string; // 'preferred_username' claim

  @Column({nullable: true})
  givenName: string; // 'given_name' claim

  @Column({nullable: true})
  familyName: string; // 'family_name' claim

  @Column({nullable: true})
  tenantId: string; // 'tid' claim

  @Column({type: 'simple-array', nullable: true})
  roles: string[]; // 'roles' claim (if available)

  @Column({type: 'jsonb', nullable: true})
  rawClaims: Record<string, any>; // Store complete token payload

  @CreateDateColumn()
  firstSeenAt: Date;

  @UpdateDateColumn()
  lastSeenAt: Date;
}
