import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerEntity } from '../Entity/customer.entity';
import { Repository } from 'typeorm';
import { CustomerRegistDto } from './dto/req/customer.regist.dto';
import * as bcrypt from 'bcrypt';
import { CustomerLoginDto } from './dto/req/customer.login.dto';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { LoginResDto } from './dto/res/customer.res.dto';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(CustomerEntity)
    private readonly customerEntity: Repository<CustomerEntity>,
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}
  async regist(body: CustomerRegistDto) {
    const data: CustomerEntity = new CustomerEntity();
    data.name = body.name;
    data.userID = body.userID;
    data.userPW = await bcrypt.hash(body.userPW, 10);
    data.address = body.address;
    data.email = body.email;

    const save: CustomerEntity = await this.customerEntity.save(data);
    return save;
  }
  async login(body: CustomerLoginDto) {
    const res = new LoginResDto();
    const data: CustomerEntity = await this.customerEntity.findOne({
      where: {
        userID: body.userID, // 회원가입에서 id 중복안되도록 설정해야함.
      },
    });
    if (!data) {
      throw new Error('ID가 틀렸습니다.');
    }
    const validatePW = await bcrypt.compare(body.userPW, data.userPW);
    if (validatePW === false) {
      throw new UnauthorizedException('PW가 틀렸습니다.');
    }
    const payload = {
      id: data.id.toString(),
      name: data.name.toString(),
    };
    const secreaA = this.configService.get('access_Key');
    const secretR = this.configService.get('refresh_Key');
    const accessToken: string = this.jwtService.sign(payload, {
      secret: secreaA,
      expiresIn: '1h',
    });
    const refreshToken: string = this.jwtService.sign(payload, {
      secret: secretR,
      expiresIn: '10s',
    });
    res.accessToken = accessToken;
    res.refreshToken = refreshToken;
    return res;
  }
}
