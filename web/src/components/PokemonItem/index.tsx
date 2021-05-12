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
import IPokemon from '../../interfaces/IPokemon';
import styles from '../../styles/itemStyle';
import { useFavorites } from '../../hooks/favorites';

interface PokemonProps {
  item: IPokemon;
}

const PokemonItem: React.FC<PokemonProps> = ({ item }) => {
  const classes = styles();
  const { handleClickFavorite, checkFavorited } = useFavorites();

  const handleFavoriteIconClick = useCallback(() => {
    handleClickFavorite({
      api_type: 'pokemon',
      external_id: String(item.id),
      url: item.url,
    });
  }, [handleClickFavorite, item.id, item.url]);

  const imageLink = useCallback(
    () =>
      item.sprites.other['official-artwork'].front_default ||
      item.sprites.front_default,
    [item.sprites.front_default, item.sprites.other],
  );

  return (
    <Paper elevation={3} key={item.name} className={classes.card}>
      <CardHeader
        className={classes.avatar}
        avatar={<Avatar src={imageLink()} />}
        title={item.name}
        subheader={`Weight: ${item.weight} Kg`}
      />
      <CardContent>
        {item.stats.map(stat => (
          <Chip
            key={stat.stat.name}
            className={classes.description}
            label={`${stat.stat.name.toLocaleUpperCase()}: ${stat.base_stat}`}
          />
        ))}
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

export default PokemonItem;
