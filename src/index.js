//引入react核心库
import React from 'react'
//引入ReactDOM
import ReactDOM from 'react-dom'
//
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
//引入App
import App from './App'
ReactDOM.render(
  <Router>
    <App />
  </Router >,
  document.getElementById('root')
)
