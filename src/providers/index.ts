import { container } from 'tsyringe';

import IHashProvider from './HashProvider/IHashProvider';
import BCryptHashProvider from './HashProvider';

import IStorageProvider from './StorageProvider/IStorageProvider';
import StorageProvider from './StorageProvider';

import IUsersRepository from '@repositories/UsersRepository/IUsersRepository';
import UsersRepository from '@repositories/UsersRepository';

import IUserTokensRepository from '@repositories/UserTokensRepository/IUserTokensRepository';
import UserTokensRepository from '@repositories/UserTokensRepository';

import IBeerBrandsRepository from '@repositories/BeerBrandsRepository/IBeerBrandsRepository';
import BeerBrandsRepository from '@repositories/BeerBrandsRepository';

import IBeerTypesRepository from '@repositories/BeerTypesRepository/IBeerTypesRepository';
import BeerTypesRepository from '@repositories/BeerTypesRepository';

import IBeersRepository from '@repositories/BeersRepository/IBeersRepository';
import BeersRepository from '@repositories/BeersRepository';

import IUserFavoriteBeerRepository from '@repositories/UserFavoriteBeerRepository/IUserFavoriteBeerRepository';
import UserFavoriteBeerRepository from '@repositories/UserFavoriteBeerRepository';

import IBeerRatingRepository from '@repositories/BeerRatingRepository/IBeerRatingRepository';
import BeerRatingRepository from '@repositories/BeerRatingRepository';

import IUserAlexaCodesRepository from '@repositories/UserAlexaCodesRepository/IUserAlexaCodesRepository';
import UserAlexaCodesRepository from '@repositories/UserAlexaCodesRepository';

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  StorageProvider,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);

container.registerSingleton<IBeerBrandsRepository>(
  'BeerBrandsRepository',
  BeerBrandsRepository,
);

container.registerSingleton<IBeerTypesRepository>(
  'BeerTypesRepository',
  BeerTypesRepository,
);

container.registerSingleton<IBeersRepository>(
  'BeersRepository',
  BeersRepository,
);

container.registerSingleton<IUserFavoriteBeerRepository>(
  'UserFavoriteBeerRepository',
  UserFavoriteBeerRepository,
);

container.registerSingleton<IBeerRatingRepository>(
  'BeerRatingRepository',
  BeerRatingRepository,
);

container.registerSingleton<IUserAlexaCodesRepository>(
  'UserAlexaCodesRepository',
  UserAlexaCodesRepository,
);
