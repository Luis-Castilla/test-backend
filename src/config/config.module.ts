import { Module } from '@nestjs/common';
import { ConfigService, ConfigModule as config } from '@nestjs/config';
import { dataBaseConfig } from './dataBaseConfig';
import { appConfig } from './appBaseConfig';

@Module({
  imports: [
    config.forRoot({
      isGlobal: true,
      cache: true,
      load: [dataBaseConfig, appConfig],
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
