import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import Favorites from '../pages/Favorites';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Dashboard} />
    <Route path="/favorites" exact component={Favorites} />
  </Switch>
);

export default Routes;
