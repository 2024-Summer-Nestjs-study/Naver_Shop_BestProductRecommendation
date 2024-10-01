import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SellersModule } from './sellers/sellers.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SellersEntity } from './Entity/sellers.entity';
import { JwtModule } from '@nestjs/jwt';
import { CustomerModule } from './customer/customer.module';
import { CustomerEntity } from './Entity/customer.entity';
import { ProductsService } from './products/products.service';
import { ProductsModule } from './products/products.module';
import { ProductEntity } from './Entity/product.entity';

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
        entities: [SellersEntity, CustomerEntity, ProductEntity],
        synchronize: true,
      }),
    }),
    SellersModule,
    JwtModule,
    CustomerModule,
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService, ProductsService],
  exports: [TypeOrmModule, JwtModule],
})
export class AppModule {}
