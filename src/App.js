import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Product from './pages/Product';
import ShoppingCart from './pages/ShoppingCart';

function App() {
  return (
    <main>
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={ Home } />
            <Route path="/ShoppingCart" component={ ShoppingCart } />
            <Route path="/product/:id" render={ (props) => (<Product { ...props } />) } />
          </Switch>
        </BrowserRouter>
      </div>
    </main>
  );
}

export default App;
// start
