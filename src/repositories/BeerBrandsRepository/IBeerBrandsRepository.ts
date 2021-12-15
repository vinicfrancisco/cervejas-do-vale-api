import BeerBrand from '@models/BeerBrand';

export interface ICreateBeerBrandDTO {
  name: string;
}

export default interface IBeerBrandsRepository {
  findAll: () => Promise<BeerBrand[]>;
  create: (data: ICreateBeerBrandDTO) => Promise<BeerBrand>;
}
