import BeerType from '@models/BeerType';
import IBeerTypesRepository from './IBeerTypesRepository';

class FakeBeerTypesRepository implements IBeerTypesRepository {
  private beerTypes: BeerType[] = [];

  public async findAll(): Promise<BeerType[]> {
    return this.beerTypes;
  }
}

export default FakeBeerTypesRepository;
