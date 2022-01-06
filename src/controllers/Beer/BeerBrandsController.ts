import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { instanceToInstance } from 'class-transformer';
import GetBeerBrandsService from '@services/Beer/GetBeerBrandsService';

export default class BeerBrandsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const getBeerBrands = container.resolve(GetBeerBrandsService);

    const brands = await getBeerBrands.execute();

    return response.json(instanceToInstance(brands));
  }
}
