import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SellersEntity } from '../Entity/sellers.entity';
import { Repository } from 'typeorm';
import { SellersRegistDto } from './dto/req/sellers.regist.dto';
import * as bcrypt from 'bcrypt';
import { SellersLoginDto } from './dto/req/sellers.login.dto';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { LoginResDto } from './dto/res/login.res.dto';

@Injectable()
export class SellersService {
  constructor(
    @InjectRepository(SellersEntity)
    private readonly sellersEntity: Repository<SellersEntity>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}
  async regist(body: SellersRegistDto) {
    const data: SellersEntity = new SellersEntity();
    data.name = body.name;
    data.userID = body.userID;
    data.userPW = await bcrypt.hash(body.userPW, 10);

    const save: SellersEntity = await this.sellersEntity.save(data);
    return save;
  }
  async login(body: SellersLoginDto) {
    const res = new LoginResDto();
    const data: SellersEntity = await this.sellersEntity.findOne({
      where: {
        userID: body.userID,
      },
    });
    if (!data) {
      throw new NotFoundException('ID가 틀렸습니다.');
    }
    const validatePW = await bcrypt.compare(body.userPW, data.userPW);
    if (validatePW === false) {
      throw new UnauthorizedException('PW가 틀렸습니다.');
    }
    const payload = {
      id: data.id.toString(),
      name: data.name.toString(),
    };
    const secretA = this.configService.get('access_Key');
    const secretR = this.configService.get('refresh_Key');
    const accessToken: string = this.jwtService.sign(payload, {
      secret: secretR,
      expiresIn: '1h',
    });
    const refreshToken: string = this.jwtService.sign(payload, {
      secret: secretA,
      expiresIn: '100s',
    });
    res.accessToken = accessToken;
    res.refreshToken = refreshToken;
    return res;
  }
}
