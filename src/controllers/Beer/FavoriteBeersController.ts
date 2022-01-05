import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { instanceToInstance } from 'class-transformer';
import GetFavoriteBeers from '@services/Beer/GetFavoriteBeersService';
import FavoriteBeerService from '@services/Beer/FavoriteBeerService';

interface IndexParams {
  per_page?: number;
  page?: number;
}

export default class FavoriteBeersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { page = 1, per_page = 10 }: IndexParams = request.query;

    const getFavoriteBeers = container.resolve(GetFavoriteBeers);

    const { total, data } = await getFavoriteBeers.execute({
      user_id,
      pagination: { page, per_page },
    });

    return response.json({
      total,
      data: instanceToInstance(data),
    });
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { id: beer_id } = request.params;

    const favoriteBeer = container.resolve(FavoriteBeerService);

    const userFavoriteBeer = await favoriteBeer.execute({ user_id, beer_id });

    return response.json(instanceToInstance(userFavoriteBeer));
  }
}
