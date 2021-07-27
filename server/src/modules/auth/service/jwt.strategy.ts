import { Injectable } from '@nestjs/common';
import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';

const GUARD_NAME = 'jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, GUARD_NAME) {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: any): Promise<any> {
    const { iat, exp, ...res } = payload;
    return res;
  }
}

export const JwtAuthGuard = AuthGuard(GUARD_NAME);
