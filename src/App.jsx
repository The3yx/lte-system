import React,{Component} from 'react'
import {Route,Switch,Redirect} from 'react-router-dom'

import Login from './components/Login'
import Register from './components/Register'
import DataSystem from './components/DataSystem'
import LostPw from './components/LostPw'

//创建并暴露App组件
export default class App extends Component{
	render(){
		return (
			<div>
				{/* 注册一级路由 */}
				<Switch>
					<Route path="/login" component={Login}/>
					<Route path="/register" component={Register}/>
					<Route path="/datasystem" component={DataSystem}/>
					<Route path="/lostpw" component={LostPw}/>
					<Redirect to="/login"/>
				</Switch>
			</div>
		)
	}
}
