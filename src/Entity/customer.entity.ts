import { Entity } from 'typeorm';
import { IsEmail, IsString } from 'class-validator';
import { DefaultEntity } from './default.entity';

@Entity()
export class CustomerEntity extends DefaultEntity {
  @IsString()
  name: string;
  @IsString()
  userID: string;
  @IsString()
  userPW: string;
  @IsString()
  address: string;
  @IsEmail()
  email: string;
}
