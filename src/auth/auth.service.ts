import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { SigninUserInput } from './dto/signin-user.input';
import { SigninResponse } from './dto/signin-response';
import { SignupResponse } from './dto/signup-response';
import { User } from 'src/persistence/user/user.entity';
import { UserService } from 'src/domain/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signup(loginUserInput: SigninUserInput): Promise<SignupResponse> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(loginUserInput.password, salt);
    loginUserInput.password = hashedPassword;

    return this.userService.createUser(loginUserInput);
  }

  async signin(user: User): Promise<SigninResponse> {
    const username = user.username;
    const access_token = await this.jwtService.sign({
      username,
      sub: user.id,
    });
    if (!access_token) {
      throw new InternalServerErrorException();
    }
    return {
      access_token,
      username,
    };
  }

  async validateUser(username: string, password: string): Promise<User> {
    const user = await this.userService.getUser(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    throw new UnauthorizedException();
  }
}
