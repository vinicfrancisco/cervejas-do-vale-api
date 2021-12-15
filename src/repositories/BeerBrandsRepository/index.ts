import { getRepository, Repository } from 'typeorm';

import BeerBrand from '@models/BeerBrand';
import IBeerBrandsRepository, {
  ICreateBeerBrandDTO,
} from './IBeerBrandsRepository';

class BeerBrandsRepository implements IBeerBrandsRepository {
  private ormRepository: Repository<BeerBrand>;

  constructor() {
    this.ormRepository = getRepository(BeerBrand);
  }

  public async findAll(): Promise<BeerBrand[]> {
    const beerBrands = await this.ormRepository.find();

    return beerBrands;
  }

  public async create({ name }: ICreateBeerBrandDTO): Promise<BeerBrand> {
    const beerBrand = this.ormRepository.create({ name });

    await this.ormRepository.save(beerBrand);

    return beerBrand;
  }
}

export default BeerBrandsRepository;
