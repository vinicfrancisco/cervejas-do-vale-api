import { inject, injectable } from 'tsyringe';

import Beer from '@models/Beer';
import IBeersRepository, {
  IFindFavoritesOptions,
  IListBeersResponse,
} from '@repositories/BeersRepository/IBeersRepository';

@injectable()
class GetFavoriteBeers {
  constructor(
    @inject('BeersRepository')
    private beersRepository: IBeersRepository,
  ) {}

  public async execute({
    user_id,
    pagination,
  }: IFindFavoritesOptions): Promise<IListBeersResponse> {
    const response = await this.beersRepository.findFavorites({
      user_id,
      pagination,
    });

    return response;
  }
}

export default GetFavoriteBeers;
