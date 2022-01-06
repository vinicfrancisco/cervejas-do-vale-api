import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { instanceToInstance } from 'class-transformer';
import GetBeerTypesService from '@services/Beer/GetBeerTypesService';

export default class BeerTypesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const getBeerTypes = container.resolve(GetBeerTypesService);

    const types = await getBeerTypes.execute();

    return response.json(instanceToInstance(types));
  }
}
