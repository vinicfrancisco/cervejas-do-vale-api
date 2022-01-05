import { Router } from 'express';

import BeersController from '@controllers/Beer/BeersController';

import ensureAuthenticated from '@middlewares/ensureAuthenticated';

const beersRouter = Router();
const beersController = new BeersController();

beersRouter.use(ensureAuthenticated);

beersRouter.get('/', beersController.index);
beersRouter.get('/:id', beersController.show);

export default beersRouter;
