import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from './App';
import MovieCard from './components/MovieCard';

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={App} />
        <Route path='/movie/:id' component={MovieCard} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;