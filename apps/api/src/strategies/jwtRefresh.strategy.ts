import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { AuthService } from 'src/modules/auth/auth.service';

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh-token',
) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.['refreshToken']; // Ensure your cookie name matches
        },
      ]),
      secretOrKey: process.env.JWT_REFRESH_TOKEN_SECRET,
      ignoreExpiration: false, // Depends on your use case
    });
  }

  async validate(req: any, payload: any) {
    console.log('Cookies received:', req.cookies); // Log cookies to see if they're being passed correctly
    const refreshToken = req.cookies['refreshToken']; // Match this key to your cookie's name
  }
}
