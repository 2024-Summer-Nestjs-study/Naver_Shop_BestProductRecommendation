import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { CustomerEntity } from '../Entity/customer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerEntity]), JwtModule.register({})],
  controllers: [CustomerController],
  providers: [CustomerService],
  exports: [TypeOrmModule],
})
export class CustomerModule {}
