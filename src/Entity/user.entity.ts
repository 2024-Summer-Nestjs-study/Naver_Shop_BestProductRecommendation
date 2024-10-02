import { Column, Entity } from 'typeorm';
import { DefaultEntity } from './default.entity';

@Entity()
export class UserEntity extends DefaultEntity {
  @Column()
  name: string;
  @Column()
  userID: string;
  @Column()
  userPW: string;
  @Column()
  email: string;
  @Column()
  rela: string; // 판매자 , 소비자 구분.
}
