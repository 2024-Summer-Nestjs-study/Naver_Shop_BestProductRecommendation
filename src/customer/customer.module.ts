import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ProductEntity } from '../Entity/product.entity';
import { OrderEntity } from '../Entity/order.entity';
import { CustomerEntity } from '../Entity/customer.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductEntity, OrderEntity, CustomerEntity]),
    JwtModule.register({}),
  ],
  controllers: [CustomerController],
  providers: [CustomerService],
  exports: [TypeOrmModule, JwtModule],
})
export class CustomerModule {}
