import { Body, Controller, Post } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerRegistDto } from './dto/customer.regist.dto';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post('regist')
  async regist(@Body() body: CustomerRegistDto) {
    return this.customerService.regist(body);
  }
}
