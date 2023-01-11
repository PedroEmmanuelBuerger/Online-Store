import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import ShoppingCart from './pages/ShoppingCart';

function App() {
  return (
    <main>
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={ Home } />
            <Route to="/ShoppingCart" component={ ShoppingCart } />
          </Switch>
        </BrowserRouter>
      </div>
    </main>
  );
}

export default App;
