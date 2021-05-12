import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import CreateUserService from '@modules/users/services/CreateUserService';
import FakeFavoritesRepository from '../repositories/fakes/FakeFavoritesRepository';
import FavoriteService from './FavoriteService';
import ShowFavoritesService from './ShowFavoritesService';

let createFavorite: FavoriteService;
let createUser: CreateUserService;
let showFavorites: ShowFavoritesService;

let fakeFavoritesRepository: FakeFavoritesRepository;
let fakeUsersRepository: FakeUsersRepository;

let fakeHashProvider: FakeHashProvider;

describe('ListFavorites', () => {
  beforeEach(() => {
    fakeFavoritesRepository = new FakeFavoritesRepository();
    createFavorite = new FavoriteService(
      fakeFavoritesRepository,
    );

    fakeHashProvider = new FakeHashProvider();
    fakeUsersRepository = new FakeUsersRepository();
    createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
    showFavorites = new ShowFavoritesService(fakeFavoritesRepository)


  });

  it('should be able to list favorites', async () => {
    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

 const favorite1 =  await createFavorite.execute({
   api_type: 'pokemon',
   external_id: '2',
   user_id: user.id,
   url: 'http://example.com',
  });
  const favorite2 = await createFavorite.execute({
   api_type: 'pokemon',
   external_id: '3',
   user_id: user.id,
   url: 'http://example.com',
  });

  const favorite3 = await createFavorite.execute({
   api_type: 'pokemon',
   external_id: '4',
   user_id: user.id,
   url: 'http://example.com',
  });

  const favorites = await showFavorites.execute(user.id)
  expect(favorites).toEqual([favorite1, favorite2, favorite3]);

  })
});
