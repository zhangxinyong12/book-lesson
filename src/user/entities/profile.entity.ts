import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  gender: string;

  @Column()
  photo: string;

  @Column()
  address: string;

  @Column()
  phone: string;

  @OneToOne(() => User)
  // @JoinColumn({ name: 'user_id' }) // 指定外键列名
  @JoinColumn()
  user: User;
}
