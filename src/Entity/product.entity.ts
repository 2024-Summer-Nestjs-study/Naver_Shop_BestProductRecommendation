import { Column, JoinColumn, ManyToOne } from 'typeorm';
import { DefaultEntity } from './default.entity';
import { SellersEntity } from './sellers.entity';

export class ProductEntity extends DefaultEntity {
  @ManyToOne((type) => SellersEntity, (user: SellersEntity) => user.id)
  @JoinColumn()
  user: SellersEntity;
  @Column()
  name: string;
  @Column()
  stock: number;
  @Column()
  price: number;
  @Column()
  descirption: string;
  // @Column()
  // category_id   // FK  (n:1)
}
