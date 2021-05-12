import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import FavoritesController from '../controllers/FavoritesController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const favoritesRouter = Router();

const favoritesController = new FavoritesController();

favoritesRouter.use(ensureAuthenticated)

favoritesRouter.get(
  '/',
  favoritesController.show,
);

favoritesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      external_id: Joi.string().required(),
      api_type: Joi.string().required(),
      url: Joi.string().required(),
    },
  }),
  favoritesController.create,
);

favoritesRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid()
    },
  }),
  favoritesController.delete,
);

export default favoritesRouter;
