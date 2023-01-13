import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Details from './pages/Details';
import ShoppingCart from './pages/ShoppingCart';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            component={ Home }
          />
          <Route path="/ShoppingCart" component={ ShoppingCart } />
          <Route
            path="/product/:id"
            component={ Details }
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
