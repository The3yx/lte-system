import React from 'react';
import './App.css';
import { Layout, Menu, Breadcrumb } from 'antd';
import { Link, Route } from 'react-router-dom'
import { secroutes } from "./router"
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import Home from './components/Home'
class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Home>
        </Home>
      </div>
    );
  }
}
export default App;