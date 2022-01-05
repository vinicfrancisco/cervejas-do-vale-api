import { getRepository, Repository } from 'typeorm';

import BeerBrand from '@models/BeerBrand';
import IBeerBrandsRepository from './IBeerBrandsRepository';

class BeerBrandsRepository implements IBeerBrandsRepository {
  private ormRepository: Repository<BeerBrand>;

  constructor() {
    this.ormRepository = getRepository(BeerBrand);
  }

  public async findAll(): Promise<BeerBrand[]> {
    const beerBrands = await this.ormRepository.find();

    return beerBrands;
  }
}

export default BeerBrandsRepository;
