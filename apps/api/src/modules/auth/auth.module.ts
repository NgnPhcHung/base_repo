import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/modules/user/user.module';
import { JwtRefreshTokenStrategy } from 'src/strategies';
import { JwtStrategy } from 'src/strategies/jwt.strategy';
import { LocalStrategy } from '../../strategies/local.strategy';
import { AuthController } from './auth.controller';
import { AuthMapper } from './auth.mapper';
import { AuthService } from './auth.service';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '2m' },
    }),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    AuthMapper,
    JwtRefreshTokenStrategy,
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
