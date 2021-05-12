import { inject, injectable } from 'tsyringe';
import Favorite from '../infra/typeorm/entities/Favorite';
import IFavoritesRepository from '../repositories/IFavoritesRepository';

@injectable()
class FavoriteService {
  constructor(
    @inject('FavoritesRepository')
    private favoritesRepository: IFavoritesRepository,
  ) {}

  public async execute(id: string): Promise<Favorite[]> {

    const favorites = await this.favoritesRepository.listAllFavorites(id);

    return favorites;
  }
}

export default FavoriteService;
