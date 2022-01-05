import Beer from '@models/Beer';

export type ListBeersSort =
  | 'price'
  | '-price'
  | 'graduation'
  | '-graduation'
  | 'rating'
  | '-rating';

export interface IPaginationOptions {
  pagination?: {
    page: number;
    per_page: number;
  };
}

export interface IListBeersOptions extends IPaginationOptions {
  filters?: {
    beer_brand_id?: string;
    beer_type_id?: string;
    search?: string;
  };
  sort?: ListBeersSort;
}

export interface IFindFavoritesOptions extends IPaginationOptions {
  user_id: string;
}

export interface IListBeersResponse {
  data: Beer[];
  total: number;
}

export default interface IBeersRepository {
  findAll: (data: IListBeersOptions) => Promise<IListBeersResponse>;
  findById: (id: string) => Promise<Beer | undefined>;
  findFavorites: (data: IFindFavoritesOptions) => Promise<IListBeersResponse>;
  save(beer: Beer): Promise<Beer>;
}
