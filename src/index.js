import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import store from './redux/store';
import {receiveUser} from './redux/actions'
import storageUtils from "./utils/storageUtils";
import App from './App'


receiveUser(storageUtils.getUser());
console.log(store.getState());

ReactDOM.render(
  //Provider组件保证所有组件均可使用store中的状态
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
