import { Router } from 'express';

import FavoriteBeersController from '@controllers/Beer/FavoriteBeersController';

import ensureAuthenticated from '@middlewares/ensureAuthenticated';

const favoriteBeersRouter = Router();
const favoriteBeersController = new FavoriteBeersController();

favoriteBeersRouter.use(ensureAuthenticated);

favoriteBeersRouter.get('/', favoriteBeersController.index);
favoriteBeersRouter.post('/:id', favoriteBeersController.create);

export default favoriteBeersRouter;
