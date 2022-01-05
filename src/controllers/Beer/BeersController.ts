import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { instanceToInstance } from 'class-transformer';
import GetBeersService from '@services/Beer/GetBeersService';
import ShowBeerService from '@services/Beer/ShowBeerService';
import { ListBeersSort } from '@repositories/BeersRepository/IBeersRepository';

interface IndexParams {
  per_page?: number;
  page?: number;
  sort?: ListBeersSort;
  beer_brand_id?: string;
  beer_type_id?: string;
  search?: string;
}
export default class BeersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const {
      page = 1,
      per_page = 10,
      sort,
      beer_brand_id,
      beer_type_id,
      search,
    }: IndexParams = request.query;

    const getBeers = container.resolve(GetBeersService);

    const { data, total } = await getBeers.execute({
      pagination: { page, per_page },
      sort,
      filters: {
        beer_brand_id,
        beer_type_id,
        search,
      },
    });

    return response.json({
      total,
      data: instanceToInstance(data),
    });
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const user_id = request.user.id;

    const showBeer = container.resolve(ShowBeerService);

    const beer = await showBeer.execute({ beer_id: id, user_id });

    return response.json(instanceToInstance(beer));
  }
}
