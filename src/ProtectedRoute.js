import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export default function ProtectedRoute({ children, ...rest }) {
  let token = localStorage.getItem('tokenWarmindo');
  

  return (
    <Route {...rest}>
      {!token ? <Redirect to={'/auth/login-page'} /> : children}
    </Route>
  );
}
