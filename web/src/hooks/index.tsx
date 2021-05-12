import React from 'react';
import { APIsProvider } from './apis';

import { AuthProvider } from './auth';
import { FavoritesProvider } from './favorites';

const AppProvider: React.FC = ({ children }) => {
  return (
    <APIsProvider>
      <AuthProvider>
        <FavoritesProvider>{children}</FavoritesProvider>
      </AuthProvider>
    </APIsProvider>
  );
};

export default AppProvider;
