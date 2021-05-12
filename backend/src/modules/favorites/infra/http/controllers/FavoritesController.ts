import { Request, Response } from 'express';
import { container } from 'tsyringe';

import FavoriteService from '@modules/favorites/services/FavoriteService';
import UnfavoriteService from '@modules/favorites/services/UnfavoriteService';
import ShowFavoritesService from '@modules/favorites/services/ShowFavoritesService';
import { classToClass } from 'class-transformer';

export default class FavoritesController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { external_id, api_type, url,} = req.body;
    const { id: user_id } = req.user;

    const createFavorite = container.resolve(FavoriteService);

    const favorite = await createFavorite.execute({ external_id, api_type, url, user_id });

    return res.json(classToClass(favorite));
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const unfavorite = container.resolve(UnfavoriteService);

    await unfavorite.execute(id);

    return res.json({deleted: true});
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;

    const listFavorites = container.resolve(ShowFavoritesService);

    const favorites = await listFavorites.execute(id);

    return res.json(favorites);
  }
}
