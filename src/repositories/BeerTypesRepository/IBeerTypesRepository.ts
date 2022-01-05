import BeerType from '@models/BeerType';

export default interface IBeerTypesRepository {
  findAll: () => Promise<BeerType[]>;
}
