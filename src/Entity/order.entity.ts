import { Entity, JoinColumn, ManyToOne } from 'typeorm';
import { DefaultEntity } from './default.entity';
import { CustomerEntity } from './customer.entity';
import { ProductEntity } from './product.entity';

@Entity()
export class OrderEntity extends DefaultEntity {
  @ManyToOne(() => CustomerEntity, (customer: CustomerEntity) => customer.id)
  @JoinColumn({ name: 'customerId' })
  customer: CustomerEntity;

  @ManyToOne(() => ProductEntity, (product: ProductEntity) => product.id)
  @JoinColumn({ name: 'productId' })
  product: ProductEntity;
}
