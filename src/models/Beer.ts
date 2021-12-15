import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import BeerBrand from './BeerBrand';
import BeerType from './BeerType';

@Entity('beers')
class Beer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  volume: number;

  @Column()
  alcoholic_degree: number;

  @Column()
  price: number;

  @Column()
  beer_type_id: string;

  @Column()
  beer_brand_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => BeerType, beerType => beerType.beers)
  @JoinColumn({ name: 'beer_type_id' })
  beer_type: BeerType;

  @ManyToOne(() => BeerBrand, beerBrand => beerBrand.beers)
  @JoinColumn({ name: 'beer_brand_id' })
  beer_brand: BeerBrand;
}

export default Beer;
