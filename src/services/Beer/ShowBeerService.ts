import { inject, injectable } from 'tsyringe';

import Beer from '@models/Beer';
import IBeersRepository from '@repositories/BeersRepository/IBeersRepository';
import AppError from '@utils/AppError';
import IUserFavoriteBeerRepository from '@repositories/UserFavoriteBeerRepository/IUserFavoriteBeerRepository';
import IBeerRatingRepository from '@repositories/BeerRatingRepository/IBeerRatingRepository';

interface IRequest {
  beer_id: string;
  user_id: string;
}

@injectable()
class ShowBeerService {
  constructor(
    @inject('BeersRepository')
    private beersRepository: IBeersRepository,

    @inject('UserFavoriteBeerRepository')
    private userFavoriteBeerRepository: IUserFavoriteBeerRepository,

    @inject('BeerRatingRepository')
    private beerRatingRepository: IBeerRatingRepository,
  ) {}

  public async execute({ beer_id, user_id }: IRequest): Promise<Beer> {
    const beer = await this.beersRepository.findById(beer_id);

    if (!beer) {
      throw new AppError('User not found');
    }

    const checkUserFavoriteBeerExists =
      await this.userFavoriteBeerRepository.findFavoriteBeer({
        beer_id,
        user_id,
      });

    const checkHasUserAlreadyRated = await this.beerRatingRepository.findRating(
      {
        beer_id,
        user_id,
      },
    );

    beer.hasFavorited = !!checkUserFavoriteBeerExists;
    beer.hasRated = !!checkHasUserAlreadyRated;

    return beer;
  }
}

export default ShowBeerService;
