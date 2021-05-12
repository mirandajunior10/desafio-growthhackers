import React, { useMemo } from 'react';
import { useAPI } from '../../hooks/apis';
import { ArticList, PokemonList, RickAndMortyList } from './Lists';

const Dashboard: React.FC = () => {
  const { selectedAPI } = useAPI();

  const List = useMemo(() => {
    switch (selectedAPI) {
      case 'Pokemon':
        return PokemonList;
      case 'Artic':
        return ArticList;
      case 'Rick and Morty':
        return RickAndMortyList;
      default:
        return RickAndMortyList;
    }
  }, [selectedAPI]);
  return <List />;
};

export default Dashboard;
