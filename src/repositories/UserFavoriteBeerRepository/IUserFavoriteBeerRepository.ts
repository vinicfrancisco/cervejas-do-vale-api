import UserFavoriteBeer from '@models/UserFavoriteBeer';

export interface IFavoriteBeerDTO {
  user_id: string;
  beer_id: string;
}

export default interface IUserFavoriteBeerRepository {
  findFavoriteBeer(
    data: IFavoriteBeerDTO,
  ): Promise<UserFavoriteBeer | undefined>;
  favoriteBeer(data: IFavoriteBeerDTO): Promise<UserFavoriteBeer>;
  removeFavoriteBeer(favoriteBeer: UserFavoriteBeer): Promise<void>;
}
