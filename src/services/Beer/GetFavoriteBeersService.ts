import { inject, injectable } from 'tsyringe';

import Beer from '@models/Beer';
import IBeersRepository from '@repositories/BeersRepository/IBeersRepository';

interface IRequest {
  user_id: string;
}

@injectable()
class GetFavoriteBeers {
  constructor(
    @inject('BeersRepository')
    private beersRepository: IBeersRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<Beer[]> {
    const beers = await this.beersRepository.findFavorites(user_id);

    return beers;
  }
}

export default GetFavoriteBeers;
