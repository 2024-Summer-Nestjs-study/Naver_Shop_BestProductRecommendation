import { Body, Controller, Post } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerRegistDto } from './dto/req/customer.regist.dto';
import { CustomerLoginDto } from './dto/req/customer.login.dto';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post('regist')
  async regist(@Body() body: CustomerRegistDto) {
    return this.customerService.regist(body);
  }
  @Post('login')
  async login(@Body() body: CustomerLoginDto) {
    return this.customerService.login(body);
  }
}
