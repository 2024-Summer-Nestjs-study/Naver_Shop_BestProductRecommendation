import { Body, Controller, Post } from '@nestjs/common';
import { SellersService } from './sellers.service';
import { SellersRegistDto } from './dto/sellers.regist.dto';

@Controller('sellers')
export class SellersController {
  constructor(private readonly sellersService: SellersService) {}

  @Post('regist')
  async regist(@Body() body: SellersRegistDto) {
    return this.sellersService.regist(body);
  }
}
