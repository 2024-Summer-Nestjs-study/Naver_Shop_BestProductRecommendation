import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SellersController } from './sellers/sellers.controller';
import { SellersService } from './sellers/sellers.service';
import { SellersModule } from './sellers/sellers.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as process from 'node:process';
import { SellersEntity } from './Entity/sellers.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './src/.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mariadb',
        host: configService.get('DB_HOST'),
        port: parseInt(configService.get('DB_PORT')),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [SellersEntity],
        synchronize: true,
      }),
    }),
    SellersModule,
  ],
  controllers: [AppController, SellersController],
  providers: [AppService, SellersService],
  exports: [TypeOrmModule],
})
export class AppModule {}
