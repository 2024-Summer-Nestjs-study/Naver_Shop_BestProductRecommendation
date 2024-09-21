import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AccessGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const token = req.header.authorization;
    if (!token) {
      throw new UnauthorizedException('헤드가 비었습니다.');
    }
    const jwt = token.replace('Bearer ', '');
    const secretR = this.configService.get('refresh_Key');
    try {
      const payload = await this.jwtService.verifyAsync(jwt, {
        secret: secretR,
      });
      req['user'] = payload;
    } catch (e) {
      if (e.name === 'JsonWebTokenError') {
        throw new UnauthorizedException('accessToken Error');
      }
      if (e.name === 'TokenExpiredError') {
        throw new UnauthorizedException(
          '만료되었습니다. 토큰을 다시 발급 받으시오.',
        );
      }
      throw new Error();
    }
    return true;
  }
}
