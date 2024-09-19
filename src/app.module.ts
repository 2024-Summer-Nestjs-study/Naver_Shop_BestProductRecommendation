import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SellersController } from './sellers/sellers.controller';
import { SellersService } from './sellers/sellers.service';
import { SellersModule } from './sellers/sellers.module';

@Module({
  imports: [SellersModule],
  controllers: [AppController, SellersController],
  providers: [AppService, SellersService],
})
export class AppModule {}
