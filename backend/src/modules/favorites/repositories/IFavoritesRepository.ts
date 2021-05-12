import ICreateFavoriteDTO from '../dtos/ICreateFavoriteDTO';
import Favorite from '../infra/typeorm/entities/Favorite';

export default interface IFavoritesRepository {
  findById(id: string): Promise<Favorite | undefined>;
  findByExternalId(external_id: string): Promise<Favorite | undefined>;
  create(data: ICreateFavoriteDTO): Promise<Favorite>;
  listAllFavorites(user_id: string): Promise<Favorite[]>;
  save(user: Favorite): Promise<Favorite>;
  unfavorite(id: string): Promise<void>;
}
