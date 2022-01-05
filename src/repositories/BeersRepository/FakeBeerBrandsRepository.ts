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

  public async save(beer: Beer): Promise<Beer> {
    const findIndex = this.beers.findIndex(findBeer => findBeer.id === beer.id);

    this.beers[findIndex] = beer;

    return beer;
  }
}

export default FakeBeersRepository;
