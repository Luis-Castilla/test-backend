import { Injectable } from '@nestjs/common';
import { User } from '../infraestructure/user.entity';

@Injectable()
export class UserMapper {
  getAllUsersMapper(users: User[]): string[] {
    return users.map((user) => user.username);
  }
}
