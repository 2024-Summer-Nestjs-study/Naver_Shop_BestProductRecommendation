import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { CustomerModule } from './customer/customer.module';
import { UserEntity } from './Entity/user.entity';
import { ProductsService } from './products/products.service';
import { ProductsModule } from './products/products.module';
import { ProductEntity } from './Entity/product.entity';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';

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
        entities: [UserEntity, ProductEntity],
        synchronize: true,
      }),
    }),
    JwtModule,
    CustomerModule,
    ProductsModule,
    UserModule,
  ],
  controllers: [AppController, UserController],
  providers: [AppService, ProductsService, UserService],
  exports: [TypeOrmModule, JwtModule],
})
export class AppModule {}
