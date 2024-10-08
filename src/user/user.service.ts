import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../Entity/user.entity';
import { Repository } from 'typeorm';
import { UserRegistDto } from './dto/user.regist.dto';
import { CustomerEntity } from '../Entity/customer.entity';
import { SellerEntity } from '../Entity/seller.entity';
import { UserLoginDto } from './dto/user.login.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserLoginResDto } from './dto/user.login.res.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userEntity: Repository<UserEntity>,
    @InjectRepository(CustomerEntity)
    private readonly customerEntity: Repository<CustomerEntity>,
    @InjectRepository(SellerEntity)
    private readonly sellerEntity: Repository<SellerEntity>,
    private jwtService: JwtService,
    private configService: ConfigService,
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
      if (data.rela === '소비자') {
        const customer: CustomerEntity = new CustomerEntity();
        customer.name = data.name;
        customer.userid = data;
        await this.customerEntity.save(customer);
        return data;
      }
      const seller: SellerEntity = new SellerEntity();
      if (data.rela === '판매자') {
        seller.name = data.name;
        seller.userid = data;
        await this.sellerEntity.save(seller);
        return data;
      }
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new UnauthorizedException('이미 있는 회원정보입니다.');
      }
    }
  }
  async login(body: UserLoginDto) {
    const res = new UserLoginResDto();
    const IDdata: UserEntity = await this.userEntity.findOne({
      where: {
        userID: body.userID,
      },
    });
    if (!IDdata) {
      throw new UnauthorizedException('ID가 틀렸습니다.');
    }
    const PWdata: UserEntity = await this.userEntity.findOne({
      where: {
        userPW: body.userPW,
      },
    });
    if (!PWdata) {
      throw new UnauthorizedException('PW가 틀렸습니다.');
    }
    const payload = {
      id: IDdata.id.toString(),
      name: IDdata.name.toString(),
    };
    const secretA = this.configService.get('access_Key');
    const secretR = this.configService.get('refresh_Key');
    const refreshToken = this.jwtService.sign(payload, {
      secret: secretR,
      expiresIn: '1h',
    });
    const accessToken = this.jwtService.sign(payload, {
      secret: secretA,
      expiresIn: '100s',
    });
    res.accessToken = accessToken;
    res.refreshToken = refreshToken;

    return res;
  }
}
