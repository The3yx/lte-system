import React, { Component } from 'react'

export default class Register extends Component {

    state = {
        username:'',
        newpassword:'',
        confirmNewPassword:'',
        admin:false,
    }

    adminCheck = ()=>{
        
    }
  render() {
    return (
      <div>
          用户名<input type="text" />
          新密码<input type="password" />
          确认新密码<input type="password" />
          是否申请管理员权限<input type="checkbox" defaultChecked={false} onChange={this.adminCheck} />
      </div>
    )
  }
}
