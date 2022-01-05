import { getRepository, Repository } from 'typeorm';

import BeerRating from '@models/BeerRating';
import IBeerRatingRepository, {
  IAddRatingDTO,
  IFindRatingDTO,
} from './IBeerRatingRepository';

class BeerRatingRepository implements IBeerRatingRepository {
  private ormRepository: Repository<BeerRating>;

  constructor() {
    this.ormRepository = getRepository(BeerRating);
  }

  public async getRatingByBeerId(beer_id: string): Promise<number> {
    const { avg } = await this.ormRepository
      .createQueryBuilder('beer_ratings')
      .select('AVG(beer_ratings.rating)', 'avg')
      .where('beer_ratings.beer_id = :beer_id', { beer_id })
      .getRawOne();

    return Number(avg);
  }

  public async addRating({
    beer_id,
    user_id,
    rating,
  }: IAddRatingDTO): Promise<BeerRating> {
    const beerRating = this.ormRepository.create({ beer_id, user_id, rating });

    await this.ormRepository.save(beerRating);

    return beerRating;
  }

  public async findRating({
    beer_id,
    user_id,
  }: IFindRatingDTO): Promise<BeerRating | undefined> {
    const beerRating = await this.ormRepository.findOne({
      where: { beer_id, user_id },
    });

    return beerRating;
  }
}

export default BeerRatingRepository;
