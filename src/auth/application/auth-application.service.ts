import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { SigninUserInput } from '../presentation/dto/signin-user.input';
import { SigninResponse } from '../presentation/dto/signin-response';
import { SignupResponse } from '../presentation/dto/signup-response';
import { User } from 'src/users/infraestructure/user.entity';
import { AuthDomainService } from '../domain/auth-domain.service';
import { UserRepositoryService } from 'src/users/infraestructure/user-repository.service';

@Injectable()
export class AuthApplicationService {
  constructor(
    private userRepositoryService: UserRepositoryService,
    private authDomainService: AuthDomainService,
  ) {}

  async signup(loginUserInput: SigninUserInput): Promise<SignupResponse> {
    loginUserInput.password = await this.authDomainService.hashedPassword(
      loginUserInput.password,
    );
    const userDb = await this.userRepositoryService.createUser(loginUserInput);
    return new SignupResponse(userDb.username);
  }

  async signin(user: User): Promise<SigninResponse> {
    const username = user.username;
    const access_token = await this.authDomainService.createJwt(
      username,
      user.id,
    );
    if (!access_token) {
      throw new InternalServerErrorException();
    }
    return new SigninResponse(access_token, username);
  }

  async validateUser(username: string, password: string): Promise<User> {
    const user = await this.userRepositoryService.getUser(username);
    if (
      user &&
      (await this.authDomainService.comparePassword(user.password, password))
    ) {
      return user;
    }
    throw new UnauthorizedException();
  }
}
