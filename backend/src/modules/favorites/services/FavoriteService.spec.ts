import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import CreateUserService from '@modules/users/services/CreateUserService';
import FakeFavoritesRepository from '../repositories/fakes/FakeFavoritesRepository';
import FavoriteService from './FavoriteService';

let fakeFavoritesRepository: FakeFavoritesRepository;
let createFavorite: FavoriteService;
let createUser: CreateUserService;


let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;

describe('CreateFavorite', () => {
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
  });

  it('should be able to create a new favorite', async () => {
      const user = await createUser.execute({
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '123456',
      });

    const favorite = await createFavorite.execute({
     api_type: 'pokemon',
     external_id: '2',
     user_id: user.id,
     url: 'http://example.com',
    });

    expect(favorite).toHaveProperty('id');
  });
});
