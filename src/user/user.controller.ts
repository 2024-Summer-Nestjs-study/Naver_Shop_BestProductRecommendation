import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRegistDto } from './dto/user.regist.dto';
import { UserLoginDto } from './dto/user.login.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('regist')
  async regist(@Body() body: UserRegistDto) {
    return this.userService.regist(body);
  }
  @Post('login')
  async login(@Body() body: UserLoginDto) {
    return this.userService.login(body);
  }
}
