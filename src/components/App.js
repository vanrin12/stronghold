// @flow
import * as React from 'react';

import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

// Wrappers to redirect to login or wallet based on if they are logged-in
import persistAuth from './containers/persistUserIsAuthenticated';
import noAuth from './containers/userIsNotAuthenticated';

// Components
import Wallet from './containers/Wallet';
import Login from './containers/Login';
import Logout from './containers/Logout';
import SignUp from './containers/SignUp';
import Charts from './containers/Charts';
import VerifyEmail from './containers/VerifyEmail';
import ForgotPassword from './containers/ForgotPassword';
import PasswordReset from './containers/PasswordReset';
import Trade from './containers/Trade';
import Security from './containers/Security';
import Transactions from './containers/Transactions';
import Convert from './containers/Convert'
/*import Maintenance from './pages/Maintenance';*/
import NotFound from './pages/404';

import './App.css';

class App extends React.Component<{}> {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            {/* Maintenance */}
            {/*<Route path="/maintenance" component={ Maintenance }/>
            <Route path="/">
              <Redirect to="/maintenance" />
            </Route>*/}

            {/* Redirects */}
            <Route exact path="/">
              <Redirect to="/signup" />
            </Route>
            <Route exact path="/dashboard">
              <Redirect to="/wallet" />
            </Route>

            {/* Public Routes */}
            <Route path="/logout/:code?" component={ Logout }/>
            <Route path="/signup" component={ noAuth(SignUp) }/>
            <Route path="/login" component={ noAuth(Login) }/>
            <Route path="/confirm/:token" component={ noAuth(VerifyEmail) }/>
            <Route path="/forgot_password" component={ noAuth(ForgotPassword) }/>
            <Route path="/reset/:token" component={ noAuth(PasswordReset) }/>

            {/* Protected  Routes */}
            <Route path="/balances" component={ persistAuth(Wallet) }/>
            <Route path="/trade/:base?/:counter?" component={ persistAuth(Trade) }/>
            <Route path="/charts" component={ persistAuth(Charts) }/>
            <Route path="/security" component={ persistAuth(Security) }/>
            <Route path="/transactions" component={ persistAuth(Transactions) }/>
            <Route path="/convert" component={ persistAuth(Convert) }/>


            <Route component={ NotFound }/>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
