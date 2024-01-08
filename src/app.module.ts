import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { DatabaseModule } from './database/database.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { appConfig } from './config/appBaseConfig';
import { dataBaseConfig } from './config/dataBaseConfig';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './users/user.module';

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
    AuthModule,
    UserModule,
  ],
  providers: [ConfigService],
})
export class AppModule {}
