import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useLocation,
  useHistory,
} from 'react-router-dom';

import {
  Main,
  Login,
  Orders,
} from '../../pages/';
import AppHeader from '../app-header/app-header';
import { getUser } from '../../services/actions/user';
import { useDispatch } from 'react-redux';
import { ProtectedUnauthorizedRoute } from '../protected-unauthorized-route/protected-unauthorized-route';
import { getMenuIngredients } from '../../services/actions';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
    dispatch(getMenuIngredients());
  }, []);

  const ModalSwitch = () => {
    const location = useLocation<any>();
    const history = useHistory();
    let background =
      history.action === 'PUSH' && location.state && location.state.background;

    return (
      <div>
        <AppHeader />
        <Switch location={background || location}>
          <Route path='/' exact>
            <Main />
          </Route>
          <ProtectedUnauthorizedRoute path='/login' exact>
            <Login />
          </ProtectedUnauthorizedRoute>
          <Route path='/feed' exact>
            <Orders />
          </Route>
        </Switch>
      </div>
    );
  };

  return (
    <Router>
      <ModalSwitch />
    </Router>
  );
}

export default App;
