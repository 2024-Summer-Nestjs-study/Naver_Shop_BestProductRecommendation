import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../Entity/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { CustomerEntity } from '../Entity/customer.entity';
import { CustomerService } from '../customer/customer.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, CustomerEntity]),
    JwtModule.register({}),
  ],
  controllers: [UserController],
  providers: [UserService, CustomerService],
  exports: [TypeOrmModule],
})
export class UserModule {}
