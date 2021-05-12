import React, { useCallback, useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import { useAPI } from '../../../hooks/apis';
import styles from './styles';
import IPokemon from '../../../interfaces/IPokemon';
import PokemonItem from '../../../components/PokemonItem';

interface APIResponse {
  name: string;
  url: string;
}

interface PokemonAPIResponse {
  count: number;
  previous?: string;
  next?: string;
  results: APIResponse[];
}

const PokemonList: React.FC = () => {
  const classes = styles();
  const { externalAPI } = useAPI();

  const [apiInfo, setApiInfo] = useState<Omit<PokemonAPIResponse, 'results'>>(
    {} as Omit<PokemonAPIResponse, 'results'>,
  );
  const [items, setItems] = useState<IPokemon[]>([] as IPokemon[]);
  const [page, setPage] = useState(1);

  const fetchPokemon = useCallback(
    async url => {
      const response = await externalAPI.get<IPokemon>(url);
      return { ...response.data, url };
    },
    [externalAPI],
  );

  const fetchCharacters = useCallback(async () => {
    const response = await externalAPI.get<PokemonAPIResponse>('pokemon', {
      params: {
        offset: page * 20,
      },
    });
    const promises = response.data.results.map(async result =>
      fetchPokemon(result.url),
    );
    const pokemons = await Promise.all(promises);
    setItems(pokemons);
    setApiInfo(response.data);
  }, [externalAPI, fetchPokemon, page]);

  const handleChangePage = useCallback(
    (_: React.ChangeEvent<unknown>, value: number) => {
      if (value > page && !apiInfo.next) return;
      setPage(value);
    },
    [apiInfo.next, page],
  );

  useEffect(() => {
    fetchCharacters();
  }, [fetchCharacters]);

  return (
    <>
      <Grid
        container
        className={classes.container}
        direction="row"
        justify="center"
        alignItems="center"
      >
        {items.map(item => (
          <PokemonItem key={item.name} item={item} />
        ))}
      </Grid>
      <Pagination
        className={classes.pagination}
        count={Math.ceil(apiInfo.count / 20)}
        page={page}
        onChange={handleChangePage}
      />
    </>
  );
};

export default PokemonList;
