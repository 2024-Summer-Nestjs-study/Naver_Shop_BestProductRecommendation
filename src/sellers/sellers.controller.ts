import { Body, Controller, Post } from '@nestjs/common';
import { SellersService } from './sellers.service';
import { SellersRegistDto } from './dto/req/sellers.regist.dto';
import { SellersLoginDto } from './dto/req/sellers.login.dto';

@Controller('sellers')
export class SellersController {
  constructor(private readonly sellersService: SellersService) {}

  @Post('regist')
  async regist(@Body() body: SellersRegistDto) {
    return this.sellersService.regist(body);
  }
  @Post('login')
  async login(@Body() body: SellersLoginDto) {
    return this.sellersService.login(body);
  }
}
