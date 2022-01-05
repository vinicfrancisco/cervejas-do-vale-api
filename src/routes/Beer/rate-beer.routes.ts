import { Router } from 'express';

import RateBeerController from '@controllers/Beer/RateBeerController';

import ensureAuthenticated from '@middlewares/ensureAuthenticated';
import { celebrate, Segments, Joi } from 'celebrate';

const rateBeersRouter = Router();
const rateBeersController = new RateBeerController();

rateBeersRouter.use(ensureAuthenticated);

rateBeersRouter.post(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      rating: Joi.number().min(0).max(5).required(),
    },
  }),
  rateBeersController.create,
);

export default rateBeersRouter;
