import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../Entity/user.entity';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserRegistDto } from './dto/user.regist.dto';
import { CustomerEntity } from '../Entity/customer.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userEntity: Repository<UserEntity>,
    @InjectRepository(CustomerEntity)
    private readonly customerEntity: Repository<CustomerEntity>,
  ) {}
  async regist(body: UserRegistDto, req: Request) {
    const data: UserEntity = new UserEntity();
    data.name = body.name;
    data.userID = body.userID;
    data.userPW = body.userPW;
    data.email = body.email;
    data.rela = body.rela;
    try {
      await this.userEntity.save(data);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new UnauthorizedException('이미 있는 회원정보입니다.');
      }
    }
  }

}
