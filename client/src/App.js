import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layouts/Navbar';
import levels from './components/pages/levels';
import Signin from './components/pages/Signin';
import Register from './components/pages/Register';
import Game from './components/pages/Game';
import PrivateRoute from './components/routing/privateRoute';

import HistoryState from './context/history/HistoryState';
import AuthState from './context/auth/AuthState';
import setAuthToken from './utils/setAuthToken';
import './App.css';
import Home from './components/pages/Home';
import Main from './components/pages/Main';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <AuthState>
      <HistoryState>
        <Router>
          <div className='App'>
            <Navbar />
            <div className='Routes'>
              <Switch>
                <PrivateRoute exact path='/' component={Main} />
                <PrivateRoute exact path='/home' component={Home} />
                <Route exact path='/signin' component={Signin} />
                <Route exact path='/register' component={Register} />
                <PrivateRoute exact path='/game' component={Game} />
                <PrivateRoute exact path='/levels' component={levels}/>
              </Switch>
            </div>
          </div>
        </Router>
      </HistoryState>
    </AuthState>
  );
};

export default App;
