import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { instanceToInstance } from 'class-transformer';
import RateBeerService from '@services/Beer/RateBeerService';

export default class RateBeerController {
  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { id: beer_id } = request.params;
    const { rating } = request.body;

    const rateBeer = container.resolve(RateBeerService);

    const beer = await rateBeer.execute({
      beer_id,
      rating,
      user_id,
    });

    return response.json(instanceToInstance(beer));
  }
}
