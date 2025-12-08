import {Module} from '@nestjs/common';
import {PassportModule} from '@nestjs/passport';
import {JwtModule} from '@nestjs/jwt';
import {TypeOrmModule} from '@nestjs/typeorm';
import {User} from './entities/user.entity';
import {UserService} from './services/user.service';
import {JwtStrategy} from './strategies/jwt.strategy';

@Module({
  imports: [
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.register({}), // No signing needed (only verification)
    TypeOrmModule.forFeature([User]),
  ],
  providers: [UserService, JwtStrategy],
  exports: [UserService, JwtStrategy, PassportModule],
})
export class AuthModule {
}
