import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';
import IFavorite from '../interfaces/IFavorite';
import api from '../services/api';

interface INewFavorite {
  api_type: string;
  url: string;
  external_id: string;
}
interface FavoritesContextData {
  favorites: IFavorite[];
  addFavorite: (
    favoriteData: Omit<IFavorite, 'id' | 'created_at'>,
  ) => Promise<void>;
  unfavorite: (id: string) => Promise<void>;
  checkFavorited: (id: string) => IFavorite | undefined;
  handleClickFavorite: (newFavorite: INewFavorite) => void;
}
const FavoritesContext = createContext<FavoritesContextData>(
  {} as FavoritesContextData,
);

const FavoritesProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<IFavorite[]>([] as IFavorite[]);

  const addFavorite = useCallback(
    async (favoriteData: Omit<IFavorite, 'id' | 'created_at'>) => {
      const { data: newFavorite } = await api.post('favorites', favoriteData);
      setData(oldData => [...oldData, newFavorite]);
    },
    [],
  );
  const unfavorite = useCallback(async (id: string) => {
    await api.delete(`favorites/${id}`);
    setData(oldFavorites =>
      oldFavorites.filter(favorite => favorite.id !== id),
    );
  }, []);

  const fetchFavorites = useCallback(async () => {
    const { data: favorites } = await api.get<IFavorite[]>('favorites');
    setData(favorites);
  }, []);

  const checkFavorited = useCallback(
    (id: string) => {
      const findFavorite = data.find(favorite => favorite.external_id === id);
      return findFavorite;
    },
    [data],
  );

  const handleClickFavorite = useCallback(
    ({ api_type, url, external_id }: INewFavorite) => {
      const favorited = checkFavorited(external_id);
      if (favorited) {
        unfavorite(favorited.id);
      } else {
        addFavorite({ api_type, url, external_id });
      }
    },
    [addFavorite, checkFavorited, unfavorite],
  );

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  return (
    <FavoritesContext.Provider
      value={{
        favorites: data,
        addFavorite,
        unfavorite,
        checkFavorited,
        handleClickFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

function useFavorites(): FavoritesContextData {
  const context = useContext(FavoritesContext);

  return context;
}

export { FavoritesProvider, useFavorites };
