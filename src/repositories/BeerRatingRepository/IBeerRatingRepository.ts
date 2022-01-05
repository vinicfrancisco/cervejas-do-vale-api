import BeerRating from '@models/BeerRating';

export interface IAddRatingDTO {
  beer_id: string;
  user_id: string;
  rating: number;
}

export interface IFindRatingDTO {
  user_id: string;
  beer_id: string;
}

export default interface IBeerTypesRepository {
  addRating: (data: IAddRatingDTO) => Promise<BeerRating>;
  findRating: (data: IFindRatingDTO) => Promise<BeerRating | undefined>;
  getRatingByBeerId: (beer_id: string) => Promise<number>;
}
