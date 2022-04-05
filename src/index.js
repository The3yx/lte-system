//引入react核心库
import React from 'react'
//引入ReactDOM
import ReactDOM from 'react-dom'

import { Provider } from "react-redux";
//
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
//引入App
import App from './App'
ReactDOM.render(
  <App />,
  document.getElementById('root')
)
