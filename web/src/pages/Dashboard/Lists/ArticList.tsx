import React, { useCallback, useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import { useAPI } from '../../../hooks/apis';
import styles from './styles';
import IArtic from '../../../interfaces/IArtic';
import ArticItem from '../../../components/ArticItem';

interface APIInfo {
  total: number;
  limit: number;
  offset: number;
  total_pages: number;
  current_page: number;
  next_url?: string;
  prev_url?: string;
}

interface ArticListResponse {
  pagination: APIInfo;
  data: IArtic[];
}

const ArticList: React.FC = () => {
  const classes = styles();
  const { externalAPI } = useAPI();

  const [apiInfo, setApiInfo] = useState<APIInfo>({} as APIInfo);
  const [items, setItems] = useState<IArtic[]>([] as IArtic[]);
  const [page, setPage] = useState(1);

  const fetchCharacters = useCallback(async () => {
    const response = await externalAPI.get<ArticListResponse>('artworks', {
      params: {
        page,
      },
    });
    const parsedData = response.data.data.map(data => {
      if (data.image_id) {
        return {
          ...data,
          image_link: `https://www.artic.edu/iiif/2/${data.image_id}/full/843,/0/default.jpg`,
        };
      }
      return data;
    });
    setItems(parsedData);
    setApiInfo(response.data.pagination);
  }, [externalAPI, page]);

  const handleChange = useCallback(
    (_: React.ChangeEvent<unknown>, value: number) => {
      if (value > page && !apiInfo.next_url) return;
      setPage(value);
    },
    [apiInfo.next_url, page],
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
          <ArticItem key={item.id} item={item} />
        ))}
      </Grid>
      <Pagination
        className={classes.pagination}
        count={apiInfo.total_pages}
        page={page}
        onChange={handleChange}
      />
    </>
  );
};

export default ArticList;
