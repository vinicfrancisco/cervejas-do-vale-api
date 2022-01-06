import { Router } from 'express';
import alexaRoutes from './alexa';
import usersRouter from './User/user.routes';
import profileRouter from './User/profile.routes';
import sessionRouter from './User/sessions.routes';
import beersRouter from './Beer/beers.routes';
import favoriteBeersRouter from './Beer/favorite-beers.routes';
import rateBeersRouter from './Beer/rate-beer.routes';
import beerBrandsRouter from './Beer/beer-brands.routes';
import beerTypesRouter from './Beer/beer-types.routes';

const routes = Router();

routes.use('/signin', sessionRouter);

routes.use('/alexa', alexaRoutes);

routes.use('/users', usersRouter);
routes.use('/beers', beersRouter);
routes.use('/favorites', favoriteBeersRouter);
routes.use('/brands', beerBrandsRouter);
routes.use('/types', beerTypesRouter);
routes.use('/rate', rateBeersRouter);
routes.use('/profile', profileRouter);

export default routes;
