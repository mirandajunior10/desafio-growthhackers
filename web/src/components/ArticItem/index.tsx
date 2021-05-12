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
import IArtic from '../../interfaces/IArtic';
import styles from '../../styles/itemStyle';
import { useFavorites } from '../../hooks/favorites';

interface ArticItemProps {
  item: IArtic;
}

const ArticItem: React.FC<ArticItemProps> = ({ item }) => {
  const classes = styles();
  const { handleClickFavorite, checkFavorited } = useFavorites();

  const handleFavoriteIconClick = useCallback(() => {
    handleClickFavorite({
      api_type: 'Artic',
      external_id: String(item.id),
      url: item.api_link,
    });
  }, [handleClickFavorite, item.api_link, item.id]);

  return (
    <Paper elevation={3} className={classes.card}>
      <CardHeader
        className={classes.avatar}
        avatar={<Avatar src={item.image_link} />}
        title={item.title}
        subheader={item.artist_title}
      />
      <CardContent>
        <Chip
          className={classes.description}
          label={`Place of origin: ${item.place_of_origin}`}
        />

        <Chip
          className={classes.description}
          label={`Dimensions: ${item.dimensions}`}
        />
        <Chip
          className={classes.description}
          label={`Link: ${item.api_link}`}
        />
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

export default ArticItem;
