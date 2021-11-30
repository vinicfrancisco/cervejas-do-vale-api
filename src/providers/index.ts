import { container } from 'tsyringe';

import IHashProvider from './HashProvider/IHashProvider';
import BCryptHashProvider from './HashProvider';

import IStorageProvider from './StorageProvider/IStorageProvider';
import StorageProvider from './StorageProvider';

import IUsersRepository from '@repositories/UsersRepository/IUsersRepository';
import UsersRepository from '@repositories/UsersRepository';

import IUserTokensRepository from '@repositories/UserTokensRepository/IUserTokensRepository';
import UserTokensRepository from '@repositories/UserTokensRepository';

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
