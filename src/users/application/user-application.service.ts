import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { SigninUserInput } from '../../auth/presentation/dto/signin-user.input';
import { SignupResponse } from '../../auth/presentation/dto/signup-response';
import { User } from '../infraestructure/user.entity';
import { UserRepositoryService } from '../infraestructure/user-repository.service';
import { UserMapper } from '../mappers/user.mapper';
import { UsersResponse } from '../presentation/dto/get-all-users-response.dto';

@Injectable()
export class UserApplicationService {
  constructor(
    private userRepositoryService: UserRepositoryService,
    private userMapper: UserMapper,
  ) {}

  async createUser(createUserInput: SigninUserInput): Promise<SignupResponse> {
    const { username, password } = createUserInput;
    try {
      const user = await this.userRepositoryService.createUser({
        username,
        password,
      });
      const response = { username: user.username };
      return response;
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Username already exists.');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async getUser(username: string): Promise<User> {
    const user = await this.userRepositoryService.getUser(username);
    if (!user) {
      throw new NotFoundException(`User ${username} not found.`);
    }
    return user;
  }

  async getAllUsers(): Promise<UsersResponse> {
    const users = await this.userRepositoryService.getAllUsers();
    if (!users) {
      throw new NotFoundException(`Users not found.`);
    }
    const usernamesMapped = this.userMapper.getAllUsersMapper(users);
    const response = new UsersResponse(usernamesMapped);
    return response;
  }

  mapDataToNames(data: User[]): string[] {
    return data.map((item) => item.username);
  }
}
