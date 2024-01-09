import { Injectable } from '@nestjs/common';
import { User } from '../infraestructure/user.entity';

@Injectable()
export class UserMapper {
  getAllUsersMapper(users: User[]): string[] {
    const dataMapped = users.map((user) => user.username);
    return dataMapped;
  }
}
