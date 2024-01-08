import { UseGuards } from '@nestjs/common';
import { Resolver, Query } from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserRepositoryService } from 'src/persistence/user/user-repository.service';

@Resolver()
export class UserResolver {
  constructor(private userRepositoryService: UserRepositoryService) {}
  @Query(() => [String])
  @UseGuards(JwtAuthGuard)
  async getAllUsers(): Promise<string[]> {
    return this.userRepositoryService.getAllUsers();
  }
}
