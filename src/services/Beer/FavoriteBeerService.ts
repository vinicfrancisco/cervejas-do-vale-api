import { inject, injectable } from 'tsyringe';

import AppError from '@utils/AppError';

import UserFavoriteBeer from '@models/UserFavoriteBeer';
import IUserFavoriteBeerRepository from '@repositories/UserFavoriteBeerRepository/IUserFavoriteBeerRepository';
import IBeersRepository from '@repositories/BeersRepository/IBeersRepository';

interface IRequest {
  user_id: string;
  beer_id: string;
}

@injectable()
class FavoriteBeerService {
  constructor(
    @inject('UserFavoriteBeerRepository')
    private userFavoriteBeerRepository: IUserFavoriteBeerRepository,

    @inject('BeersRepository')
    private beersRepository: IBeersRepository,
  ) {}

  public async execute({
    beer_id,
    user_id,
  }: IRequest): Promise<UserFavoriteBeer | void> {
    const checkBeerExists = await this.beersRepository.findById(beer_id);

    if (!checkBeerExists) {
      throw new AppError('The provided beer_id does not exists');
    }

    const checkUserFavoriteBeerExists =
      await this.userFavoriteBeerRepository.findFavoriteBeer({
        beer_id,
        user_id,
      });

    if (checkUserFavoriteBeerExists) {
      await this.userFavoriteBeerRepository.removeFavoriteBeer(
        checkUserFavoriteBeerExists,
      );
    } else {
      const userFavoriteBeer = this.userFavoriteBeerRepository.favoriteBeer({
        beer_id,
        user_id,
      });
      return userFavoriteBeer;
    }
  }
}

export default FavoriteBeerService;
