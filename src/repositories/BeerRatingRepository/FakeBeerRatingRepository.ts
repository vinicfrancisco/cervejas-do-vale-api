import { v4 as uuid } from 'uuid';

import BeerRating from '@models/BeerRating';
import IBeerRatingRepository, {
  IAddRatingDTO,
  IFindRatingDTO,
} from './IBeerRatingRepository';

class FakeBeerRatingRepository implements IBeerRatingRepository {
  private beerRatings: BeerRating[] = [];

  public async addRating({
    beer_id,
    rating,
    user_id,
  }: IAddRatingDTO): Promise<BeerRating> {
    const beerRating = new BeerRating();

    Object.assign(beerRating, { id: uuid(), beer_id, user_id, rating });

    this.beerRatings.push(beerRating);

    return beerRating;
  }

  public async findRating({
    beer_id,
    user_id,
  }: IFindRatingDTO): Promise<BeerRating | undefined> {
    const findBeerRating = this.beerRatings.find(
      beerRating =>
        beerRating.beer_id === beer_id && beerRating.user_id === user_id,
    );

    return findBeerRating;
  }

  public async getRatingByBeerId(beer_id: string): Promise<number> {
    let sum = 0;
    let count = 0;

    this.beerRatings
      .filter(beerRating => beerRating.beer_id === beer_id)
      .forEach(beer => {
        sum += beer.rating;
        count++;
      });

    return sum / count;
  }
}

export default FakeBeerRatingRepository;
