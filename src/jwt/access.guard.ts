import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
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
    const token = req.headers.authorization;
    if (!token) {
      throw new UnauthorizedException('헤드가 비었습니다.');
    }
    const jwt = token.replace('Bearer ', '');
    const secretA = this.configService.get<string>('access_Key');
    try {
      const payload = await this.jwtService.verifyAsync(jwt, {
        secret: secretA,
      });
      req['user'] = payload;
    } catch (e) {
      if (e.name === 'JsonWebTokenError') {
        throw new UnauthorizedException('access 아닌데?');
      }
      if (e.name === 'TokenExpiredError') {
        throw new UnauthorizedException(
          '만료되었습니다. 토큰을 다시 발급 받으시오.',
        );
      }
      console.log(e);
      throw new UnauthorizedException();
    }
    return true;
  }
}
