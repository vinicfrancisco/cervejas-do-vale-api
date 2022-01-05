import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import Beer from './Beer';

@Entity('user_favorite_beers')
class UserFavoriteBeer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @Column()
  beer_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Beer, beer => beer.favoriteUsers)
  @JoinColumn({ name: 'beer_id' })
  favorite_beers: Beer;
}

export default UserFavoriteBeer;
