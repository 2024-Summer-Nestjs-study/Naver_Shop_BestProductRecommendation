import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from '../Entity/product.entity';
import { Repository } from 'typeorm';
import { ProductsCreateDto } from './dto/req/products.create.dto';
import { SellerEntity } from '../Entity/seller.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productEntity: Repository<ProductEntity>,
  ) {}
  async create(body: ProductsCreateDto, req: Request) {
    const seller: SellerEntity = new SellerEntity();
    seller.id = req['user'].id;
    const products: ProductEntity = new ProductEntity();
    products.name = body.name;
    products.stock = body.stock; //buy 하면 1씩 감소하기.
    products.price = body.price;
    products.desc = body.desc;
    products.volume = 0;
    products.search = 0;
    products.seller = seller;
    const sameData: ProductEntity = await this.productEntity.findOne({
      relations: {
        seller: true,
      },
      where: {
        seller: {
          id: req['user'].id,
        },
        name: products.name,
      },
    });
    if (!sameData) {
      await this.productEntity.save(products);
    } else {
      throw new ServiceUnavailableException('이미 등록되어있는 상품입니다.');
    }
    return products;
  }
}
