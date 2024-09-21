import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SellersEntity } from '../Entity/sellers.entity';
import { SellersController } from './sellers.controller';
import { SellersService } from './sellers.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([SellersEntity]), JwtModule.register({})],
  controllers: [SellersController],
  providers: [SellersService],
  exports: [TypeOrmModule],
})
export class SellersModule {}
