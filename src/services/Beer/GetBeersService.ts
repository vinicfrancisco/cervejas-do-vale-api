import { inject, injectable } from 'tsyringe';

import Beer from '@models/Beer';
import IBeersRepository from '@repositories/BeersRepository/IBeersRepository';

@injectable()
class GetBeersService {
  constructor(
    @inject('BeersRepository')
    private beersRepository: IBeersRepository,
  ) {}

  public async execute(): Promise<Beer[]> {
    const beers = await this.beersRepository.findAll();

    return beers;
  }
}

export default GetBeersService;
