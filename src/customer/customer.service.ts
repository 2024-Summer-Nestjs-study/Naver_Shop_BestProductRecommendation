import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerEntity } from '../Entity/customer.entity';
import { Repository } from 'typeorm';
import { CustomerRegistDto } from './dto/customer.regist.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(CustomerEntity)
    private readonly customerEntity: Repository<CustomerEntity>,
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
}
