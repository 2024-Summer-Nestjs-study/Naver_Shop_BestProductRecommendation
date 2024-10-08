import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerBuyDto } from './dto/customer.buy.dto';
import { AccessGuard } from '../jwt/access.guard';
import { CustomerSearchDto } from './dto/customer.search.dto';

@Controller('customer')
@UseGuards(AccessGuard)
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}
  @Post('buy')
  async buy(@Body() body: CustomerBuyDto, @Request() req: Request) {
    return this.customerService.buy(body, req);
  }
  @Post('search')
  async search(@Body() body: CustomerSearchDto) {
    return this.customerService.search(body);
  }
}
