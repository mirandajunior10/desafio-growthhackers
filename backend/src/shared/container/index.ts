import { container } from 'tsyringe';

import '@modules/users/providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import IFavoritesRepository from '@modules/favorites/repositories/IFavoritesRepository';
import FavoritesRepository from '@modules/favorites/infra/typeorm/repositories/FavoritesRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);
container.registerSingleton<IFavoritesRepository>(
  'FavoritesRepository',
  FavoritesRepository,
);
