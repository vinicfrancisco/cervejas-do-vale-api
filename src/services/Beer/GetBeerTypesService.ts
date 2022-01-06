import { inject, injectable } from 'tsyringe';

import IBeerTypesRepository from '@repositories/BeerTypesRepository/IBeerTypesRepository';
import BeerType from '@models/BeerType';

@injectable()
class GetBeerTypesService {
  constructor(
    @inject('BeerTypesRepository')
    private beerTypesRepository: IBeerTypesRepository,
  ) {}

  public async execute(): Promise<BeerType[]> {
    const types = await this.beerTypesRepository.findAll();

    return types;
  }
}

export default GetBeerTypesService;
