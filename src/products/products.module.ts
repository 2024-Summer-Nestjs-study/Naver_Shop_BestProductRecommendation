import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from '../Entity/product.entity';
import { JwtModule } from '@nestjs/jwt';
import { ProductsService } from './products.service';
import { SellerEntity } from '../Entity/seller.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductEntity, SellerEntity]),
    JwtModule.register({}),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [TypeOrmModule, JwtModule],
})
export class ProductsModule {}
