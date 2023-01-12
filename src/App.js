import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Product from './pages/Product';
import ShoppingCart from './pages/ShoppingCart';

class App extends React.Component {
  state = {
    product: '',
  };

  getProductObject = (product) => {
    this.setState(() => ({
      product,
    }));
  };

  render() {
    const { product } = this.state;
    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={ (props) => (<Home
              { ...props }
              getProductObject={ this.getProductObject }
            />) }
          />
          <Route path="/ShoppingCart" component={ ShoppingCart } />
          <Route
            path="/product/:id"
            render={ () => (<Product data-testid="product" product={ product } />) }
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
