import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './routes/home/Home';
import Checkout from './routes/Checkout';
import Cart from './routes/Cart';

function App() {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/cart">
        <Cart />
      </Route>
      <Route path="/checkout">
        <Checkout />
      </Route>
    </Switch>
  );
}

export default App;
