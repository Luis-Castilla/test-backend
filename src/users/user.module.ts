import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './infraestructure/user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { UserResolver } from './presentation/user.resolver';
import { ConfigService } from '@nestjs/config';
import { UserRepositoryService } from './infraestructure/user-repository.service';
import { UserDomainService } from './domain/user-domain.service';
import { UserApplicationService } from './application/user-application.service';
import { UserMapper } from './mappers/user.mapper';

@Module({
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => AuthModule)],
  providers: [
    UserDomainService,
    UserResolver,
    ConfigService,
    UserRepositoryService,
    UserApplicationService,
    UserMapper,
  ],
  exports: [UserRepositoryService, UserApplicationService],
})
export class UserModule {}
