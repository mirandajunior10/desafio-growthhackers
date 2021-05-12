import React, { useCallback, useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import { useAPI } from '../../../hooks/apis';
import styles from './styles';
import IRickAndMorty from '../../../interfaces/IRickAndMorty';
import RickAndMortyItem from '../../../components/RickAndMortyItem';

interface APIInfo {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

interface RickAndMortyAPIResponse {
  info: APIInfo;
  results: IRickAndMorty[];
}

const RickAndMortyList: React.FC = () => {
  const classes = styles();
  const { externalAPI } = useAPI();

  const [apiInfo, setApiInfo] = useState<APIInfo>({} as APIInfo);
  const [items, setItems] = useState<IRickAndMorty[]>([] as IRickAndMorty[]);
  const [page, setPage] = useState(1);

  const fetchCharacters = useCallback(async () => {
    const response = await externalAPI.get<RickAndMortyAPIResponse>(
      'character',
      {
        params: {
          page,
        },
      },
    );
    setItems(response.data.results);
    setApiInfo(response.data.info);
  }, [externalAPI, page]);

  const handleChange = useCallback(
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
          <RickAndMortyItem key={item.id} item={item} />
        ))}
      </Grid>
      <Pagination
        className={classes.pagination}
        count={apiInfo.pages}
        page={page}
        onChange={handleChange}
      />
    </>
  );
};

export default RickAndMortyList;
