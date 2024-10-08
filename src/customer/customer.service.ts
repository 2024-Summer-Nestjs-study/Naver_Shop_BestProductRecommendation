import { Injectable, Request } from '@nestjs/common';
import { CustomerBuyDto } from './dto/customer.buy.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from '../Entity/product.entity';
import { OrderEntity } from '../Entity/order.entity';
import { CustomerEntity } from '../Entity/customer.entity';
import { CustomerSearchDto } from './dto/customer.search.dto';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productEntity: Repository<ProductEntity>,
    @InjectRepository(OrderEntity)
    private readonly orderEntity: Repository<OrderEntity>,
    @InjectRepository(CustomerEntity)
    private readonly customerEntity: Repository<CustomerEntity>,
  ) {}
  async buy(body: CustomerBuyDto, req: Request) {
    //주문을 위한 상품 찾기
    const product: ProductEntity = await this.productEntity.findOne({
      where: {
        id: body.product_id,
      },
    });
    //request를 통한 costomer
    const user = req['user'].id;
    console.log(user);
    const customer: CustomerEntity = await this.customerEntity.findOne({
      relations: {
        userid: true,
      },
      where: {
        userid: {
          id: req['user'].id,
        },
      },
    });
    product.volume += 1;
    await this.productEntity.save(product);
    //상품찾기 + costomer 합친 걸 order에 저장
    const save: OrderEntity = new OrderEntity();
    save.product = product;
    save.customer = customer;
    await this.orderEntity.save(save);
    return save;
  }
  async search(body: CustomerSearchDto) {
    const product: ProductEntity = await this.productEntity.findOne({
      where: {
        id: body.product_id,
      },
    });
    product.search += 1;
    await this.productEntity.save(product);
    return product;
  }
}
