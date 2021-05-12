import ICreateFavoriteDTO from '@modules/favorites/dtos/ICreateFavoriteDTO';
import IFavoritesRepository from '@modules/favorites/repositories/IFavoritesRepository';
import { getRepository, Repository } from 'typeorm';

import Favorite from '../entities/Favorite';

class FavoritesRepository implements IFavoritesRepository {
  private ormRepository: Repository<Favorite>;

  constructor() {
    this.ormRepository = getRepository(Favorite);
  }

  public async findById(id: string): Promise<Favorite> {
    const favorite = await this.ormRepository.findOne(id);
    return favorite;
  }

  public async findByExternalId(external_id: string): Promise<Favorite> {
    const favorite = await this.ormRepository.findOne({
      where:{
        external_id
      }
    });
    return favorite;
  }

  public async listAllFavorites(user_id: string): Promise<Favorite[]>{

    return await this.ormRepository.find({
      where:{
        user_id
      }
    });

  }


  public async create(favoriteData: ICreateFavoriteDTO): Promise<Favorite> {
    const favorite = this.ormRepository.create(favoriteData);
    await this.ormRepository.save(favorite);
    return favorite;
  }

  public async save(favorite: Favorite): Promise<Favorite> {
    return this.ormRepository.save(favorite);
  }

  public async unfavorite(id: string): Promise<void> {
    this.ormRepository.delete(id)
  }

}

export default FavoritesRepository;
