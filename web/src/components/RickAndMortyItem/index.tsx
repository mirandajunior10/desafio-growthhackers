import React, { useCallback } from 'react';
import {
  Avatar,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  IconButton,
  Paper,
} from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import styles from '../../styles/itemStyle';
import IRickAndMorty from '../../interfaces/IRickAndMorty';
import { useFavorites } from '../../hooks/favorites';

interface RickAndMortyProps {
  item: IRickAndMorty;
}

const RickAndMortyItem: React.FC<RickAndMortyProps> = ({ item }) => {
  const classes = styles();
  const { handleClickFavorite, checkFavorited } = useFavorites();

  const handleFavoriteIconClick = useCallback(() => {
    handleClickFavorite({
      api_type: 'rickAndMorty',
      external_id: String(item.id),
      url: item.url,
    });
  }, [handleClickFavorite, item.id, item.url]);

  return (
    <Paper elevation={3} key={item.id} className={classes.card}>
      <CardHeader
        className={classes.avatar}
        avatar={<Avatar src={item.image || undefined} />}
        title={item.name}
        subheader={`Gender: ${item.gender}`}
      />
      <CardContent color="primary">
        <Chip
          color="secondary"
          className={classes.description}
          label={`Origin: ${item.origin.name}`}
        />
        <Chip
          className={classes.description}
          label={`Current location: ${item.location.name}`}
        />

        <Chip
          className={classes.description}
          label={`Featured in ${item.episode.length} episodes`}
        />
        <Chip
          className={classes.description}
          label={`Created at ${new Date(item.created).toUTCString()}`}
        />
        <Chip className={classes.description} label={`Link: ${item.url}`} />
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          onClick={() => handleFavoriteIconClick()}
          color={checkFavorited(String(item.id)) ? 'primary' : 'default'}
        >
          <FavoriteIcon />
        </IconButton>
      </CardActions>
    </Paper>
  );
};

export default RickAndMortyItem;
