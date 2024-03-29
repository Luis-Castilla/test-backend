import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { SigninUserInput } from '../../auth/presentation/dto/signin-user.input';
import { SignupResponse } from '../../auth/presentation/dto/signup-response';

@Injectable()
export class UserRepositoryService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async createUser(createUserInput: SigninUserInput): Promise<SignupResponse> {
    const { username, password } = createUserInput;
    const user = this.usersRepository.create({ username, password });
    try {
      const savedUser = await this.usersRepository.save(user);
      return savedUser;
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Username already exists.');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async getUser(username: string): Promise<User> {
    return await this.usersRepository.findOne({ where: { username } });
  }

  async getAllUsers(): Promise<User[]> {
    return await this.usersRepository.find();
  }
}
