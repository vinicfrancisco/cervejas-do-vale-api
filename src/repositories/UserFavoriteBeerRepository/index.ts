import { getRepository, Repository, Not } from 'typeorm';

import UserFavoriteBeer from '@models/UserFavoriteBeer';
import IUserFavoriteBeerRepository, {
  IFavoriteBeerDTO,
} from './IUserFavoriteBeerRepository';

class UserFavoriteBeerRepository implements IUserFavoriteBeerRepository {
  private ormRepository: Repository<UserFavoriteBeer>;

  constructor() {
    this.ormRepository = getRepository(UserFavoriteBeer);
  }

  public async favoriteBeer({
    beer_id,
    user_id,
  }: IFavoriteBeerDTO): Promise<UserFavoriteBeer> {
    const userFavoriteBeer = this.ormRepository.create({ beer_id, user_id });

    await this.ormRepository.save(userFavoriteBeer);

    return userFavoriteBeer;
  }

  public async findFavoriteBeer({
    beer_id,
    user_id,
  }: IFavoriteBeerDTO): Promise<UserFavoriteBeer | undefined> {
    const userFavoriteBeer = await this.ormRepository.findOne({
      where: { beer_id, user_id },
    });

    return userFavoriteBeer;
  }

  public async removeFavoriteBeer(
    userFavoriteBeer: UserFavoriteBeer,
  ): Promise<void> {
    await this.ormRepository.remove(userFavoriteBeer);
  }
}

export default UserFavoriteBeerRepository;
