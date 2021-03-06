import React from 'react';
import { IndexRoute, Route } from 'react-router';
import { isLoaded as isAuthLoaded, load as loadAuth } from 'redux/modules/auth';
import {
  App,
  Chat,
  Home,
  About,
  Login,
  LoginSuccess,
  Order,
  Cart,
  NotFound,
  Pagination,
} from 'containers';

export default (store) => {
  const requireLogin = (nextState, replace, cb) => {
    function checkAuth() {
      const { auth: { user }} = store.getState();
      if (!user) {
        // oops, not logged in, so can't be here!
        replace('/');
      }
      cb();
    }

    if (!isAuthLoaded(store.getState())) {
      store.dispatch(loadAuth()).then(checkAuth);
    } else {
      checkAuth();
    }
  };

  return (
    <Route path="/" component={App}>
      { /* Home (main) route */}
      <IndexRoute component={Home} />

      { /* Routes requiring login */}
      <Route onEnter={requireLogin}>
        <Route path="chat" component={Chat} />
        <Route path="loginSuccess" component={LoginSuccess} />
      </Route>

      { /* Routes */}
      <Route path="product/:type" component={Home} />
      <Route path="about" component={About} />
      <Route path="login" component={Login} />
      <Route path="pagination" component={Pagination} />
      <Route path="cart" component={Cart} />
      <Route path="order" component={Order} />

      { /* Catch all route */}
      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
};
