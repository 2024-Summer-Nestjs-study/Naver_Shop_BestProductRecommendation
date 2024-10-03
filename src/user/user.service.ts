import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../Entity/user.entity';
import { Repository } from 'typeorm';
import { UserRegistDto } from './dto/user.regist.dto';
import { CustomerEntity } from '../Entity/customer.entity';
import { SellerEntity } from '../Entity/seller.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userEntity: Repository<UserEntity>,
    @InjectRepository(CustomerEntity)
    private readonly customerEntity: Repository<CustomerEntity>,
    @InjectRepository(SellerEntity)
    private readonly sellerEntity: Repository<SellerEntity>,
  ) {}
  async regist(body: UserRegistDto) {
    const data: UserEntity = new UserEntity();
    data.name = body.name;
    data.userID = body.userID;
    data.userPW = body.userPW;
    data.email = body.email;
    data.rela = body.rela;
    try {
      await this.userEntity.save(data);
      const customer: CustomerEntity = new CustomerEntity();
      if (data.rela === '소비자') {
        customer.name = data.name;
        customer.userid = data.id;
        await this.customerEntity.save(customer);
        return customer;
      }
      const seller: SellerEntity = new SellerEntity();
      if (data.rela === '판매자') {
        seller.name = data.name;
        seller.userid = data.id;
        await this.sellerEntity.save(seller);
        return seller;
      }
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new UnauthorizedException('이미 있는 회원정보입니다.');
      }
    }
  }
}
