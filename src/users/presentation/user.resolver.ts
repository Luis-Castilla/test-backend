import { UseGuards } from '@nestjs/common';
import { Resolver, Query } from '@nestjs/graphql';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { UserApplicationService } from '../application/user-application.service';
import { UsersResponse } from './dto/get-all-users-response.dto';

@Resolver()
@UseGuards(JwtAuthGuard)
export class UserResolver {
  constructor(private userApplicationService: UserApplicationService) {}
  @Query(() => UsersResponse)
  async getAllUsers(): Promise<UsersResponse> {
    return this.userApplicationService.getAllUsers();
  }
}
