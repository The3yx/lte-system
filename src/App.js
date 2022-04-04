import React from 'react';
import './App.css';
import { Layout, Menu, Breadcrumb } from 'antd';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'

import { createBrowserHistory } from "history";
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import Login from './pages/Login'
import Admin from './pages/Admin'
const history = createBrowserHistory();
class App extends React.Component {
  render() {
    return (
      <div>
        <Router history={history}>

          <Route path='/login' component={Login}></Route>
          <Route path='/' component={Admin}></Route>
        </Router></div>
    )
  }
}
export default App;