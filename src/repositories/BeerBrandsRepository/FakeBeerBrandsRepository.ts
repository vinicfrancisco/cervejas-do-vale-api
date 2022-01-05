import BeerBrand from '@models/BeerBrand';
import IBeerBrandsRepository from './IBeerBrandsRepository';

class FakeBeerBrandsRepository implements IBeerBrandsRepository {
  private beerBrands: BeerBrand[] = [];

  public async findAll(): Promise<BeerBrand[]> {
    return this.beerBrands;
  }
}

export default FakeBeerBrandsRepository;
