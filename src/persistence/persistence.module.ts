import { Module } from '@nestjs/common';
import { UserRepositoryModule } from './user/user-repository.module';

@Module({
  imports: [UserRepositoryModule],
})
export class PersistenceModule {}
