import { inject, injectable } from 'tsyringe';

import AppError from '@utils/AppError';

import IBeersRepository from '@repositories/BeersRepository/IBeersRepository';
import IBeerRatingRepository from '@repositories/BeerRatingRepository/IBeerRatingRepository';
import Beer from '@models/Beer';

interface IRequest {
  user_id: string;
  beer_id: string;
  rating: number;
}

@injectable()
class RateBeerService {
  constructor(
    @inject('BeerRatingRepository')
    private beerRatingRepository: IBeerRatingRepository,

    @inject('BeersRepository')
    private beersRepository: IBeersRepository,
  ) {}

  public async execute({ beer_id, user_id, rating }: IRequest): Promise<Beer> {
    const checkBeerExists = await this.beersRepository.findById(beer_id);

    if (!checkBeerExists) {
      throw new AppError('The provided beer_id does not exists');
    }

    const checkHasUserAlreadyRated = await this.beerRatingRepository.findRating(
      {
        beer_id,
        user_id,
      },
    );

    if (checkHasUserAlreadyRated) {
      throw new AppError('You have already rated this beer');
    }

    await this.beerRatingRepository.addRating({
      beer_id,
      rating,
      user_id,
    });

    const newBeerRatingAverage =
      await this.beerRatingRepository.getRatingByBeerId(beer_id);

    checkBeerExists.rating = newBeerRatingAverage;

    const updatedBeer = await this.beersRepository.save(checkBeerExists);

    updatedBeer.hasRated = true;

    return updatedBeer;
  }
}

export default RateBeerService;
