import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SellersEntity } from '../Entity/sellers.entity';
import { Repository } from 'typeorm';
import { SellersRegistDto } from './dto/sellers.regist.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SellersService {
  constructor(
    @InjectRepository(SellersEntity)
    private readonly sellersEntity: Repository<SellersEntity>,
  ) {}
  async regist(body: SellersRegistDto) {
    const data: SellersEntity = new SellersEntity();
    data.name = body.name;
    data.userID = body.userID;
    data.userPW = await bcrypt.hash(body.userPW, 10);

    const save: SellersEntity = await this.sellersEntity.save(data);
    return save;
  }
}
