import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {User} from '../entities/user.entity';
import {MicrosoftTokenPayload} from '../interfaces/microsoft-token.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
  }

  async upsertFromToken(
    tokenPayload: MicrosoftTokenPayload,
  ): Promise<User> {
    const userId = tokenPayload.oid;

    let user = await this.userRepository.findOne({where: {id: userId}});

    if (!user) {
      user = this.userRepository.create({
        id: userId,
        email: tokenPayload.email || tokenPayload.upn,
        name: tokenPayload.name,
        preferredUsername: tokenPayload.preferred_username,
        givenName: tokenPayload.given_name,
        familyName: tokenPayload.family_name,
        tenantId: tokenPayload.tid,
        roles: tokenPayload.roles || [],
        rawClaims: tokenPayload,
      });
    } else {
      // Update existing user with fresh claims
      Object.assign(user, {
        email: tokenPayload.email || tokenPayload.upn,
        name: tokenPayload.name,
        preferredUsername: tokenPayload.preferred_username,
        givenName: tokenPayload.given_name,
        familyName: tokenPayload.family_name,
        roles: tokenPayload.roles || [],
        rawClaims: tokenPayload,
      });
    }

    return this.userRepository.save(user);
  }
}
