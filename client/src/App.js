import React from 'react';
import { BrowserRouter as Router, Route, Switch, useLocation } from 'react-router-dom';
import Navbar from './components/layouts/Navbar';
import Levels from "./components/pages/levels"; 
import Signin from './components/pages/Signin';
import Register from './components/pages/Register';
import Game from './components/pages/Game';
import PrivateRoute from './components/routing/privateRoute';

import HistoryState from './context/history/HistoryState';
import AuthState from './context/auth/AuthState';
import setAuthToken from './utils/setAuthToken';
import './App.css';
import Main from './components/pages/Main';
import Dashboard from './components/pages/Dashboard';
import Sidebar from './components/layouts/Sidebar'; 

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <AuthState>
      <HistoryState>
        <Router>
          <div className="App">
            <Navbar />
            <PageLayout>
              <Switch>
                <PrivateRoute exact path="/" component={Main} />
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
                <Route exact path="/signin" component={Signin} />
                <Route exact path="/register" component={Register} />
                <PrivateRoute exact path="/game" component={Game} />
                <PrivateRoute exact path="/levels" component={Levels} />
              </Switch>
            </PageLayout>
          </div>
        </Router>
      </HistoryState>
    </AuthState>
  );
};

const PageLayout = ({ children }) => {
  const location = useLocation();
  const isLevelsPage = location.pathname === '/levels'; 

  return (
    <div style={{ display: 'flex' }}>
      {isLevelsPage && <Sidebar />} 
      <div style={{ flex: 1 }}>{children}</div>
    </div>
  );
};

export default App;
