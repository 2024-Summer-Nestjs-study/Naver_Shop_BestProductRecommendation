import { DefaultEntity } from './default.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity()
export class SellerEntity extends DefaultEntity {
  @OneToOne(() => UserEntity)
  @JoinColumn({ name: 'userid' })
  userid: UserEntity;

  @Column()
  name: string;
}
