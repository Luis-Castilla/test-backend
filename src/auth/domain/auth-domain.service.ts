import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/infraestructure/user.entity';

@Injectable()
export class AuthDomainService {
  constructor(private jwtService: JwtService) {}

  async hashedPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }

  async createJwt(username: string, userId: string): Promise<string> {
    return this.jwtService.sign({
      username,
      sub: userId,
    });
  }

  async comparePassword(userPassword: string, password: string): Promise<User> {
    return await bcrypt.compare(password, userPassword);
  }
}
