import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { CustomerModule } from './customer/customer.module';
import { UserEntity } from './Entity/user.entity';
import { ProductsModule } from './products/products.module';
import { UserModule } from './user/user.module';
import { CustomerEntity } from './Entity/customer.entity';
import { SellerEntity } from './Entity/seller.entity';

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
        entities: [UserEntity, CustomerEntity, SellerEntity],
        synchronize: true,
      }),
    }),
    JwtModule,
    CustomerModule,
    ProductsModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [TypeOrmModule, JwtModule],
})
export class AppModule {}
