import { inject, injectable } from 'tsyringe';

import Beer from '@models/Beer';
import IBeersRepository, {
  IListBeersOptions,
  IListBeersResponse,
} from '@repositories/BeersRepository/IBeersRepository';

@injectable()
class GetBeersService {
  constructor(
    @inject('BeersRepository')
    private beersRepository: IBeersRepository,
  ) {}

  public async execute({
    filters,
    pagination,
    sort,
  }: IListBeersOptions): Promise<IListBeersResponse> {
    const response = await this.beersRepository.findAll({
      filters,
      pagination,
      sort,
    });

    return response;
  }
}

export default GetBeersService;
