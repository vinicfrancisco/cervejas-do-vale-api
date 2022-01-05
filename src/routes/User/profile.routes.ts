import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ProfileController from '@controllers/User/ProfileController';

import ensureAuthenticated from '@middlewares/ensureAuthenticated';

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(ensureAuthenticated);

profileRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      old_password: Joi.string().allow(''),
      password: Joi.string().allow(''),
      password_confirmation: Joi.string().valid(Joi.ref('password')),
    },
  }),
  profileController.update,
);

profileRouter.get('/', profileController.show);

export default profileRouter;
