import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './infraestructure/user.entity';
import { UserResolver } from './presentation/user.resolver';
import { ConfigService } from '@nestjs/config';
import { UserRepositoryService } from './infraestructure/user-repository.service';
import { UserDomainService } from './domain/user-domain.service';
import { UserApplicationService } from './application/user-application.service';
import { UserMapper } from './mappers/user.mapper';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    UserDomainService,
    UserResolver,
    ConfigService,
    UserRepositoryService,
    UserApplicationService,
    UserMapper,
    JwtAuthGuard,
  ],
  exports: [UserRepositoryService, UserApplicationService],
})
export class UserModule {}
