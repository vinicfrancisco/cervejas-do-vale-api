import { v4 as uuid } from 'uuid';

import UserFavoriteBeer from '@models/UserFavoriteBeer';
import IUserFavoriteBeerRepository, {
  IFavoriteBeerDTO,
} from './IUserFavoriteBeerRepository';

class FakeUserFavoriteBeersRepository implements IUserFavoriteBeerRepository {
  private userFavoriteBeers: UserFavoriteBeer[] = [];

  public async favoriteBeer({
    beer_id,
    user_id,
  }: IFavoriteBeerDTO): Promise<UserFavoriteBeer> {
    const userFavoriteBeer = new UserFavoriteBeer();

    Object.assign(userFavoriteBeer, { id: uuid(), beer_id, user_id });

    this.userFavoriteBeers.push(userFavoriteBeer);

    return userFavoriteBeer;
  }

  public async findFavoriteBeer({
    beer_id,
    user_id,
  }: IFavoriteBeerDTO): Promise<UserFavoriteBeer | undefined> {
    const findUserFavoriteBeer = this.userFavoriteBeers.find(
      favorite => favorite.beer_id === beer_id && favorite.user_id === user_id,
    );

    return findUserFavoriteBeer;
  }

  public async removeFavoriteBeer(
    favoriteBeer: UserFavoriteBeer,
  ): Promise<void> {
    this.userFavoriteBeers = this.userFavoriteBeers.filter(
      favorite => favorite.id !== favoriteBeer.id,
    );
  }
}

export default FakeUserFavoriteBeersRepository;
