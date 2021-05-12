import React, { useCallback, useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import styles from './styles';
import api from '../../services/api';
import IPokemon from '../../interfaces/IPokemon';
import PokemonItem from '../../components/PokemonItem';
import IRickAndMorty from '../../interfaces/IRickAndMorty';
import RickAndMortyItem from '../../components/RickAndMortyItem';
import IArtic from '../../interfaces/IArtic';
import ArticItem from '../../components/ArticItem';
import IFavorite from '../../interfaces/IFavorite';
import { useFavorites } from '../../hooks/favorites';

interface IArticRequest {
  data: IArtic;
}

const Favorites: React.FC = () => {
  const classes = styles();
  const { favorites } = useFavorites();
  const [favoriteCards, setFavoriteCards] = useState<JSX.Element[]>(
    [] as JSX.Element[],
  );

  const parseFavorite = useCallback(async (item: IFavorite) => {
    if (item.api_type === 'pokemon') {
      const { data: pokemonData } = await api.get<IPokemon>(item.url);
      setFavoriteCards(oldCards => [
        ...oldCards,
        <PokemonItem key={pokemonData.name} item={pokemonData} />,
      ]);
    }
    if (item.api_type === 'rickAndMorty') {
      const { data: rickAndMortyData } = await api.get<IRickAndMorty>(item.url);
      setFavoriteCards(oldCards => [
        ...oldCards,
        <RickAndMortyItem key={rickAndMortyData.id} item={rickAndMortyData} />,
      ]);
    }
    if (item.api_type === 'Artic') {
      const { data: articData } = await api.get<IArticRequest>(item.url);
      setFavoriteCards(oldCards => [
        ...oldCards,
        <ArticItem key={articData.data.id} item={articData.data} />,
      ]);
    }
  }, []);

  useEffect(() => {
    setFavoriteCards([]);
    favorites.map(favorite => parseFavorite(favorite));
  }, [favorites, parseFavorite]);

  return (
    <>
      <Grid
        container
        className={classes.container}
        direction="row"
        justify="center"
        alignItems="center"
      >
        {favoriteCards}
      </Grid>
    </>
  );
};

export default Favorites;
