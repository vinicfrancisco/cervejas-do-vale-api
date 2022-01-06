import { Router } from 'express';

import ensureAuthenticated from '@middlewares/ensureAuthenticated';
import BeerTypesController from '@controllers/Beer/BeerTypesController';

const beerTypesRouter = Router();
const beerTypesController = new BeerTypesController();

beerTypesRouter.use(ensureAuthenticated);

beerTypesRouter.get('/', beerTypesController.index);

export default beerTypesRouter;
