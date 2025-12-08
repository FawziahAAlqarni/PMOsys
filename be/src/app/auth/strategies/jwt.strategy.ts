import {Injectable, UnauthorizedException} from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import {ExtractJwt, Strategy} from 'passport-jwt';
import {passportJwtSecret} from 'jwks-rsa';
import {ConfigService} from '@nestjs/config';
import {UserService} from '../services/user.service';
import {MicrosoftTokenPayload} from '../interfaces/microsoft-token.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private userService: UserService,
  ) {
    const tenantId = configService.get<string>('AZURE_AD_TENANT_ID');
    const clientId = configService.get<string>('AZURE_AD_CLIENT_ID');

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
    // Cryptographic verification happens automatically via jwks-rsa
    // If we reach here, token signature is valid

    // Additional validation
    if (!payload.oid) {
      throw new UnauthorizedException('Token missing oid claim');
    }

    // Upsert user in database with fresh token data
    const user = await this.userService.upsertFromToken(payload);

    // Return user object (attached to request.user)
    return user;
  }
}
