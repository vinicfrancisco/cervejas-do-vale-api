import { Expose } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import uploadConfig from '@config/upload';
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

  @Column()
  image: string;

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

  @Expose({ name: 'image_url' })
  getImageUrl(): string | null {
    if (!this.image) {
      return null;
    }

    switch (uploadConfig.driver) {
      case 'disk':
        return `${process.env.APP_API_URL}/files/${this.image}`;

      case 's3':
        return `https://${uploadConfig.config.aws.Bucket}.s3.amazonaws.com/${this.image}`;
      default:
        return null;
    }
  }
}

export default Beer;
