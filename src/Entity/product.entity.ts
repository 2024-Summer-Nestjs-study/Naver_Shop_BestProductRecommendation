import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { DefaultEntity } from './default.entity';
import { SellerEntity } from './seller.entity';

@Entity()
export class ProductEntity extends DefaultEntity {
  @ManyToOne(() => SellerEntity, (seller: SellerEntity) => seller.id)
  @JoinColumn({ name: 'sellerId' })
  seller: SellerEntity;
  @Column()
  name: string;
  @Column()
  stock: number;
  @Column()
  price: number;
  @Column()
  desc: string;
  @Column()
  volume: number;
}
