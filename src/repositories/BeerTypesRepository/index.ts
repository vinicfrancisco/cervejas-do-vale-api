import { getRepository, Repository } from 'typeorm';

import BeerType from '@models/BeerType';
import IBeerTypesRepository, {
  ICreateBeerTypeDTO,
} from './IBeerTypesRepository';

class BeerTypesRepository implements IBeerTypesRepository {
  private ormRepository: Repository<BeerType>;

  constructor() {
    this.ormRepository = getRepository(BeerType);
  }

  public async findAll(): Promise<BeerType[]> {
    const beerTypes = await this.ormRepository.find();

    return beerTypes;
  }

  public async create({ name }: ICreateBeerTypeDTO): Promise<BeerType> {
    const beerType = this.ormRepository.create({ name });

    await this.ormRepository.save(beerType);

    return beerType;
  }
}

export default BeerTypesRepository;
