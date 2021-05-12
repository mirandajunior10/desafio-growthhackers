import ICreateFavoriteDTO from '@modules/favorites/dtos/ICreateFavoriteDTO';
import IFavoritesRepository from '@modules/favorites/repositories/IFavoritesRepository';

import Favorite from '@modules/favorites/infra/typeorm/entities/Favorite';
import { uuid } from 'uuidv4';

class FakeFavoritesRepository implements IFavoritesRepository {

  private favorites: Favorite[] = [];

  public async findById(id: string): Promise<Favorite | undefined> {
    const findFavorite = this.favorites.find(favorite => favorite.id === id);

    return findFavorite;
  }

  public async findByExternalId(external_id: string): Promise<Favorite | undefined> {
    const findFavorite = this.favorites.find(favorite => favorite.external_id === external_id);

    return findFavorite;
  }

  public async listAllFavorites(user_id: string): Promise<Favorite[]> {
    return this.favorites.filter(favorite => favorite.user_id === user_id);
  }

  public async create(favoriteData: ICreateFavoriteDTO): Promise<Favorite> {
    const favorite = new Favorite();

    Object.assign(favorite, { id: uuid() }, favoriteData);
    this.favorites.push(favorite);

    return favorite;
  }

  public async save(favorite: Favorite): Promise<Favorite> {
    const findIndex = this.favorites.findIndex(findFavorite => findFavorite.id === favorite.id);
    this.favorites[findIndex] = favorite;

    return favorite;
  }

  public async unfavorite(id: string): Promise<void> {

    this.favorites = this.favorites.filter(favorite => favorite.id !== id);

  }
}

export default FakeFavoritesRepository;
