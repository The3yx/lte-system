import React from 'react';
import './App.css';
import { Layout, Menu, Breadcrumb } from 'antd';
import { BrowserRouter as Router, Link, Route, Redirect, Switch } from 'react-router-dom'

import { createBrowserHistory } from "history";
//import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import Login from './pages/Login'
import Admin from './pages/Admin'
import Register from './pages/Register';

const history = createBrowserHistory();
class App extends React.Component {
  render() {
    return (
      <div>
        <Router history={history}>
          <Switch>
            <Route path='/admin' component={Admin}></Route>
            <Route path='/login' component={Login}></Route>
            <Route path='/register' component={Register}></Route>
            <Redirect to='/admin'/>
          </Switch>
        </Router>
      </div>
    )
  }
}
export default App;