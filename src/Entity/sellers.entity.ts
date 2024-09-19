import { Column, Entity } from 'typeorm';
import { DefaultEntity } from './default.entity';

@Entity()
export class SellersEntity extends DefaultEntity {
  @Column()
  name: string;
  @Column()
  userID: string;
  @Column()
  userPW: string;
}
