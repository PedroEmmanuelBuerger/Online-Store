import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Details from './pages/Details';
import ShoppingCart from './pages/ShoppingCart';
import Checkout from './pages/Checkout';

class App extends React.Component {
  render() {
    return (
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
        <Route path="/Checkout" component={ Checkout } />
      </Switch>
    );
  }
}

export default App;
