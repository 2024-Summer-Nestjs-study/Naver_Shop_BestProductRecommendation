import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SellersEntity } from '../Entity/sellers.entity';
import { SellersController } from './sellers.controller';
import { SellersService } from './sellers.service';

@Module({
  imports: [TypeOrmModule.forFeature([SellersEntity])],
  controllers: [SellersController],
  providers: [SellersService],
  exports: [TypeOrmModule],
})
export class SellersModule {}
