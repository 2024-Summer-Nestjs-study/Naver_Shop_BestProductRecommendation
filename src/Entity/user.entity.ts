import { Column, Entity, Unique } from 'typeorm';
import { DefaultEntity } from './default.entity';

@Entity()
@Unique(['userID', 'email'])
export class UserEntity extends DefaultEntity {
  @Column()
  userID: string;
  @Column()
  name: string;
  @Column()
  userPW: string;
  @Column()
  email: string;
  @Column()
  rela: string; // 판매자 , 소비자 구분.
}
