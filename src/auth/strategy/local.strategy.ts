import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy } from 'passport-local';
import { User } from '../../users/infraestructure/user.entity';
import { AuthApplicationService } from '../application/auth-application.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authApplicationService: AuthApplicationService) {
    super();
  }

  async validate(username: string, password: string): Promise<User> {
    const user = await this.authApplicationService.validateUser(
      username,
      password,
    );
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
