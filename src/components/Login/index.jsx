import React,{Component} from 'react'
import axios from 'axios'
import { NavLink } from 'react-router-dom'


export default class Login extends Component{

	//初始化状态
	state = {
		username:'',	//用户名
		password:''		//密码
	}

	//获取用户名输入
	getUsername = (event)=>{
		console.log(event.target.value)
		this.setState({username:event.target.value})
	}

	//获取密码输入
	getPassword = (event)=>{
		console.log(event.target.value)
		this.setState({password:event.target.value})
	}

	checkUser = ()=>{
		//获取用户输入
		const {username,password} = this.state
		

		//发送网络请求
		//TODO:暂时不确定这个请求是否正确
		axios.post(`http://82.157.100.28:8000/login`,{
			params:{
				username:username,
				password:password
			}
		}).then(
			response =>{
				//请求成功
				console.log(response.data)
				
				//TODO:页面刷新跳转到管理系统内部
				this.props.history.replace('/datasystem')
			},
			error =>{
				//请求失败
				console.log(error)

				//TODO:弹窗提示用户名或密码输入错误，(option:并清空原先输入)
			}
		)

	}

	render(){
		return(
            <div>
				<div>用户名<input type="text" onChange={this.getUsername}/></div>
				<div>密码<input type="password" onChange={this.getPassword}/></div>
				<div>
					<button onClick={this.checkUser}>登录</button>
					<NavLink to="/LostPw">忘记密码</NavLink>
					<NavLink to="/Register">注册</NavLink>
				</div>
			</div>
        )
	}
}