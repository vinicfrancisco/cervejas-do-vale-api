import Beer from '@models/Beer';

export default interface IBeersRepository {
  findAll: () => Promise<Beer[]>;
  findById: (id: string) => Promise<Beer | undefined>;
  findFavorites: (user_id: string) => Promise<Beer[]>;
  save(beer: Beer): Promise<Beer>;
}
