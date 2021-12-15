import BeerType from '@models/BeerType';

export interface ICreateBeerTypeDTO {
  name: string;
}

export default interface IBeerTypesRepository {
  findAll: () => Promise<BeerType[]>;
  create: (data: ICreateBeerTypeDTO) => Promise<BeerType>;
}
