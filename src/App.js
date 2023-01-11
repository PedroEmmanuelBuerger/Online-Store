import React from 'react';
import { BrowserRouter, Link, Switch } from 'react-router-dom';
import Home from './pages/Home';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Link to="/" component={ Home } />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
// start
