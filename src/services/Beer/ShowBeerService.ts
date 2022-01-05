import { inject, injectable } from 'tsyringe';

import Beer from '@models/Beer';
import IBeersRepository from '@repositories/BeersRepository/IBeersRepository';
import AppError from '@utils/AppError';

interface IRequest {
  beer_id: string;
}

@injectable()
class ShowBeerService {
  constructor(
    @inject('BeersRepository')
    private beersRepository: IBeersRepository,
  ) {}

  public async execute({ beer_id }: IRequest): Promise<Beer> {
    const beer = await this.beersRepository.findById(beer_id);

    if (!beer) {
      throw new AppError('User not found');
    }

    return beer;
  }
}

export default ShowBeerService;
