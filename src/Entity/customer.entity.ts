import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { DefaultEntity } from './default.entity';
import { UserEntity } from './user.entity';

@Entity()
export class CustomerEntity extends DefaultEntity {
  @OneToOne(() => UserEntity)
  @JoinColumn({ name: 'userid' })
  userid: UserEntity;

  @Column()
  name: string;
}
