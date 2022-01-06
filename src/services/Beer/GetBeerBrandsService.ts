import { inject, injectable } from 'tsyringe';

import IBeerBrandsRepository from '@repositories/BeerBrandsRepository/IBeerBrandsRepository';
import BeerBrand from '@models/BeerBrand';

@injectable()
class GetBeerBrandsService {
  constructor(
    @inject('BeerBrandsRepository')
    private beerBrandsRepository: IBeerBrandsRepository,
  ) {}

  public async execute(): Promise<BeerBrand[]> {
    const brands = await this.beerBrandsRepository.findAll();

    return brands;
  }
}

export default GetBeerBrandsService;
