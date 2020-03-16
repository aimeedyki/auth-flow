import React, { Suspense, useContext, useEffect } from "react";
import {
  Switch,
  Route,
  useHistory
} from "react-router-dom";

const Login = React.lazy(() => import('./Login'));
const TermsAndConditions = React.lazy(() => import('./TermsAndConditions'));
const UserInformation = React.lazy(() => import('./UserInformation'));
const Welcome = React.lazy(() => import('./Welcome'));
import Navbar from './Navbar';
import { Loader, Notification } from './common';
import ErrorBoundary from './ErrorBoundary';
import { AuthenticationContext } from '../context/AuthenticationContext';
import ProtectedRoute from './ProtectedRoute';
import { getRoute } from '../helpers';
import routes from '../routes';

import './App.scss';

const App = () => {
  const { isAuthenticated, user } = useContext(AuthenticationContext);
  let history = useHistory();

  useEffect(() => {
    const userRoute = getRoute(user);

    history.push(userRoute);
  }, [user, history]);

  return (
    <div className="app">
      <div className="app__wrapper">
        <ErrorBoundary>
          {isAuthenticated && <Navbar />}
          <Notification />
          <Suspense fallback={<Loader show />}>
            <Switch>
              <ProtectedRoute path={routes.welcome}>
                <Welcome />
              </ProtectedRoute>
              <ProtectedRoute path={routes.terms}>
                <TermsAndConditions />
              </ProtectedRoute>
              <ProtectedRoute path={routes.details}>
                <UserInformation />
              </ProtectedRoute>
              <Route path={routes.login}>
                <Login />
              </Route>
            </Switch>
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default App;
