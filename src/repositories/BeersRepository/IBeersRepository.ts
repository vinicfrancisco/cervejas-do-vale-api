import Beer from '@models/Beer';

export default interface IBeersRepository {
  findAll: () => Promise<Beer[]>;
  findById: (id: string) => Promise<Beer | undefined>;
}
