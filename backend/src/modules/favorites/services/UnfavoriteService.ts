import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IFavoritesRepository from '../repositories/IFavoritesRepository';

@injectable()
class FavoriteService {
  constructor(
    @inject('FavoritesRepository')
    private favoritesRepository: IFavoritesRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const checkFavoriteExists = await this.favoritesRepository.findById(id);

    if (!checkFavoriteExists) {
      throw new AppError('This item is not a favorite.');
    }

    await this.favoritesRepository.unfavorite(id)

  }
}

export default FavoriteService;
