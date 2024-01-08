import { forwardRef, Module } from '@nestjs/common';
import { AuthResolver } from './presentation/auth.resolver';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from 'src/users/user.module';
import { LocalStrategy } from './strategy/local.strategy';
import { AuthDomainService } from './domain/auth-domain.service';
import { AuthApplicationService } from './application/auth-application.service';

@Module({
  imports: [
    ConfigModule,
    forwardRef(() => UserModule),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        signOptions: {
          expiresIn: '24h',
        },
        secret: configService.get('JWT_SECRET'),
      }),
    }),
  ],
  providers: [
    AuthDomainService,
    AuthApplicationService,
    AuthResolver,
    JwtStrategy,
    LocalStrategy,
  ],
})
export class AuthModule {}
