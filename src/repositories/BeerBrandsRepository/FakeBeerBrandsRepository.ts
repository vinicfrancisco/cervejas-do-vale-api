import { v4 as uuid } from 'uuid';

import BeerBrand from '@models/BeerBrand';
import IBeerBrandsRepository, {
  ICreateBeerBrandDTO,
} from './IBeerBrandsRepository';

class FakeBeerBrandsRepository implements IBeerBrandsRepository {
  private beerBrands: BeerBrand[] = [];

  public async findAll(): Promise<BeerBrand[]> {
    return this.beerBrands;
  }

  public async create({ name }: ICreateBeerBrandDTO): Promise<BeerBrand> {
    const beerBrand = new BeerBrand();

    Object.assign(beerBrand, { id: uuid(), name });

    this.beerBrands.push(beerBrand);

    return beerBrand;
  }
}

export default FakeBeerBrandsRepository;
