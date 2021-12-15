import { v4 as uuid } from 'uuid';

import BeerType from '@models/BeerType';
import IBeerTypesRepository, {
  ICreateBeerTypeDTO,
} from './IBeerTypesRepository';

class FakeBeerTypesRepository implements IBeerTypesRepository {
  private beerTypes: BeerType[] = [];

  public async findAll(): Promise<BeerType[]> {
    return this.beerTypes;
  }

  public async create({ name }: ICreateBeerTypeDTO): Promise<BeerType> {
    const beerType = new BeerType();

    Object.assign(beerType, { id: uuid(), name });

    this.beerTypes.push(beerType);

    return beerType;
  }
}

export default FakeBeerTypesRepository;
