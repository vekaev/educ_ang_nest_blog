import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';

const GUARD_NAME = 'local';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, GUARD_NAME) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'login',
    });
  }

  async validate(login: string, password: string): Promise<any> {
    const admin = await this.authService.validateAdmin({ login, password });

    if (!admin) {
      throw new UnauthorizedException();
    }

    return admin;
  }
}

export const LocalAuthGuard = AuthGuard(GUARD_NAME);
