import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserResolver } from './user/user.resolver';
import { UserRepositoryModule } from 'src/persistence/user/user-repository.module';

@Module({
  imports: [UserRepositoryModule],
  providers: [UserResolver, ConfigService],
})
export class ResolverModule {}
