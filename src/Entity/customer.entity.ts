import { Column, Entity } from 'typeorm';
import { DefaultEntity } from './default.entity';

@Entity()
export class CustomerEntity extends DefaultEntity {
  @Column()
  name: string;
  @Column()
  userID: string;
  @Column()
  userPW: string;
  @Column()
  address: string;
  @Column()
  email: string;
}
