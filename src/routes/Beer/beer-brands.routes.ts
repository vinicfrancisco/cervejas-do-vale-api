import { Router } from 'express';

import ensureAuthenticated from '@middlewares/ensureAuthenticated';
import BeerBrandsController from '@controllers/Beer/BeerBrandsController';

const beerBrandsRouter = Router();
const beerBrandsController = new BeerBrandsController();

beerBrandsRouter.use(ensureAuthenticated);

beerBrandsRouter.get('/', beerBrandsController.index);

export default beerBrandsRouter;
