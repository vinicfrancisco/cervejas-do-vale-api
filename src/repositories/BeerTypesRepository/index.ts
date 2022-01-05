import { getRepository, Repository } from 'typeorm';

import BeerType from '@models/BeerType';
import IBeerTypesRepository from './IBeerTypesRepository';

class BeerTypesRepository implements IBeerTypesRepository {
  private ormRepository: Repository<BeerType>;

  constructor() {
    this.ormRepository = getRepository(BeerType);
  }

  public async findAll(): Promise<BeerType[]> {
    const beerTypes = await this.ormRepository.find();

    return beerTypes;
  }
}

export default BeerTypesRepository;
