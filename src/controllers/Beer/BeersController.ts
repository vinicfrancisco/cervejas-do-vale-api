import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { instanceToInstance } from 'class-transformer';
import GetBeersService from '@services/Beer/GetBeersService';
import ShowBeerService from '@services/Beer/ShowBeerService';

export default class BeersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const getBeers = container.resolve(GetBeersService);

    const beers = await getBeers.execute();

    return response.json(instanceToInstance(beers));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showBeer = container.resolve(ShowBeerService);

    const beers = await showBeer.execute({ beer_id: id });

    return response.json(instanceToInstance(beers));
  }
}