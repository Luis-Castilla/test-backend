import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/users/infraestructure/user.entity';
import { UserRepositoryService } from 'src/users/infraestructure/user-repository.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private userRepositoryService: UserRepositoryService,
    private configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: any) {
    const { username } = payload;
    const user: User = await this.userRepositoryService.getUser(username);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
