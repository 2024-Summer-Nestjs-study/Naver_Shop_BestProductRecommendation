import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../Entity/user.entity';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserRegistDto } from './dto/user.regist.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userEntity: Repository<UserEntity>,
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}
  async regist(body: UserRegistDto) {
    const data: UserEntity = new UserEntity();
    data.name = body.name;
    data.userID = body.userID;
    data.userPW = body.userPW;
    data.email = body.email;
    data.rela = body.rela;

    const userdata: UserEntity = await this.userEntity.save(data);
    return userdata;
  }
}
