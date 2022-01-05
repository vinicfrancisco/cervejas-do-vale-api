import BeerBrand from '@models/BeerBrand';

export default interface IBeerBrandsRepository {
  findAll: () => Promise<BeerBrand[]>;
}
