import Beer from '@models/Beer';
import IBeersRepository from './IBeersRepository';

class FakeBeersRepository implements IBeersRepository {
  private beers: Beer[] = [];

  public async findAll(): Promise<Beer[]> {
    return this.beers;
  }

  public async findById(id: string): Promise<Beer | undefined> {
    const findBeer = this.beers.find(beer => beer.id === id);

    return findBeer;
  }
}

export default FakeBeersRepository;
