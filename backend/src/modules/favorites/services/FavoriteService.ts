import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import Favorite from '../infra/typeorm/entities/Favorite';
import IFavoritesRepository from '../repositories/IFavoritesRepository';

interface IRequest {
  external_id: string;
  api_type: string;
  url: string;
  user_id: string;
}
@injectable()
class FavoriteService {
  constructor(
    @inject('FavoritesRepository')
    private favoritesRepository: IFavoritesRepository,
  ) {}

  public async execute({ external_id, api_type, url, user_id }: IRequest): Promise<Favorite> {
    const checkFavoriteExists = await this.favoritesRepository.findByExternalId(external_id);

    if (checkFavoriteExists) {
      throw new AppError('This item is already a favorite.');
    }

    const favorite = await this.favoritesRepository.create({
      external_id, api_type, url, user_id
    });

    return favorite;
  }
}

export default FavoriteService;
