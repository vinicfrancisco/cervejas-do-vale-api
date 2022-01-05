import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { instanceToInstance } from 'class-transformer';
import GetFavoriteBeers from '@services/Beer/GetFavoriteBeersService';
import FavoriteBeerService from '@services/Beer/FavoriteBeerService';

export default class FavoriteBeersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const getFavoriteBeers = container.resolve(GetFavoriteBeers);

    const beers = await getFavoriteBeers.execute({ user_id });

    return response.json(instanceToInstance(beers));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { id: beer_id } = request.params;

    const favoriteBeer = container.resolve(FavoriteBeerService);

    const userFavoriteBeer = await favoriteBeer.execute({ user_id, beer_id });

    return response.json(instanceToInstance(userFavoriteBeer));
  }
}
