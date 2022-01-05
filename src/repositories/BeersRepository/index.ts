import { getRepository, Repository } from 'typeorm';

import Beer from '@models/Beer';
import IBeersRepository from './IBeersRepository';

class BeersRepository implements IBeersRepository {
  private ormRepository: Repository<Beer>;

  constructor() {
    this.ormRepository = getRepository(Beer);
  }

  public async findAll(): Promise<Beer[]> {
    const beers = await this.ormRepository.find();

    return beers;
  }

  public async findById(id: string): Promise<Beer | undefined> {
    const beer = await this.ormRepository.findOne(id);

    return beer;
  }
}

export default BeersRepository;
