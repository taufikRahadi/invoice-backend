import { Module, forwardRef } from '@nestjs/common';
import { AuthenticationService } from './services/authentication.service';
import { AuthenticationResolver } from './resolvers/authentication.resolver';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from '../../user/user.module';
import { JwtStrategy } from '../../../common/guards/strategies/jwt.strategy';

@Module({
  imports: [
    forwardRef(() => UserModule),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (env: ConfigService) => ({
        secret: env.get<string>('JWT_SECRET') ?? 'AnjingTanah',
        signOptions: {
          expiresIn: '1h',
          algorithm: 'HS512',
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthenticationService, AuthenticationResolver, JwtStrategy],
  exports: [AuthenticationService, JwtStrategy, AuthenticationResolver],
})
export class AuthenticationModule {}
