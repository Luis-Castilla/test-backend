import { UseGuards } from '@nestjs/common';
import { Resolver, Query } from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserApplicationService } from '../application/user-application.service';
import { UsersResponse } from './dto/get-all-users-response.dto';

@Resolver()
export class UserResolver {
  constructor(private userApplicationService: UserApplicationService) {}
  @Query(() => UsersResponse)
  @UseGuards(JwtAuthGuard)
  async getAllUsers(): Promise<UsersResponse> {
    return this.userApplicationService.getAllUsers();
  }
}
