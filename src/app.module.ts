import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ResolverModule } from './resolver/resolvers.module';
import { join } from 'path';
import { DatabaseModule } from './database/database.module';
import { PersistenceModule } from './persistence/persistence.module';
import { DomainModule } from './domain/domain.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { appConfig } from './config/appBaseConfig';
import { dataBaseConfig } from './config/dataBaseConfig';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      driver: ApolloDriver,
      context: ({ req }) => ({ req }),
      sortSchema: true,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [dataBaseConfig, appConfig],
    }),
    DatabaseModule,
    ResolverModule,
    PersistenceModule,
    DomainModule,
    AuthModule,
  ],
  providers: [ConfigService],
})
export class AppModule {}
