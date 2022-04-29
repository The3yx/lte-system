/**
 * @author:shanmu
 * @time:2022.04.29
 */
 import React, { Component } from "react";
 //import logo from "../../assets/image/head.jpg";
 import { Form, Input, Button, message } from "antd";
 import { UserOutlined, LockOutlined } from "@ant-design/icons";
 import { NavLink,Redirect } from "react-router-dom";
 import "./index.less";
 import { connect } from "react-redux";
 import { register } from "../../redux/actions";
 
 class Register extends Component {
   onFinish = async (values) => {
     console.log('call onFinish')
     const { username, password, confirmPassword} = values;
     if(password!==confirmPassword){
      return alert("密码不一致")
     }
     try {
       //调用异步请求，
       this.props.register(username, password);
       //TODO:没有注册成功后跳转回Login
     } catch (error) {
       console.log("请求出错", error);
     }
   };
   onFinishFailed = (values, errorFields, outOfDate) => {
     values.errorFields.map((x) => {
       return console.log(x.errors);
     });
   };
   validatePwd = (rule, value) => {
 
     if (!value) {
       return Promise.reject("密码必须输入");
     } else if (value.length < 4) {
       return Promise.reject("密码不能小于4");
     } else if (value.length > 12) {
       return Promise.reject("密码不能大于12");
     } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
       return Promise.reject("密码必须由大小写字母或者数字组成");
     } else {
       return Promise.resolve(); //验证通过
     }
   };
   render() {
     //如果用户已经登陆,自动跳转到管理页面
     const userData = this.props.userData;
     if (userData.access_token) {
       return <Redirect to="/admin" />;
     }
     const errorMsg = this.props.userData.errorMsg;
     return (
       <div>
         <div className="loginWrapper"></div>
         <div className="login">
           <header className="login-header">
             {/*<img src={logo} alt="logo" />*/}
             <h1>LTE-SYSTEM数据库管理系统</h1>
           </header>
           <section className="login-content">
             <div className={errorMsg ? "error-msg show" : "error-msg"}>
               {errorMsg}
             </div>
             <h2>用户注册</h2>
 
             <Form
               name="normal_login"
               className="login-form"
               initialValues={{
                 remember: true,
               }}
               onFinish={this.onFinish}
               onFinishFailed={this.onFinishFailed}
             >
               <Form.Item
                 name="username"
                 initialValue="admin"
                 rules={[
                   {
                     required: true,
                     message: "请输入用户名!",
                   },
                   {
                     min: 3,
                     message: "最小5位",
                   },
                   {
                     max: 15,
                     message: "最大10位",
                   },
                   {
                     pattern: /^[a-zA-Z0-9_]+$/,
                     message: "必须是英文,数字或下划线组成",
                   },
                 ]}
               >
                 <Input
                   prefix={<UserOutlined className="site-form-item-icon" />}
                   style={{ borderRadius: "5px" }}
                   placeholder="用户名:wxy"
                 />
               </Form.Item>
               <Form.Item
                 name="password"
                 initialValue="12345678"
                 rules={[
                   {
                     required: true,
                     message: "请输入密码!",
                   },
                   {
                     validator: this.validatePwd,
                   },
                 ]}
               >
                 <Input
                   prefix={<LockOutlined className="site-form-item-icon" />}
                   type="password"
                   placeholder="密码:helishou"
                   style={{ borderRadius: "5px" }}
                 />
               </Form.Item>
               <Form.Item
                 name="confirmPassword"
                 initialValue="wxy"
                 rules={[
                   {
                     required: true,
                     message: "请确认密码!",
                   },
                   {
                     validator: this.validatePwd,
                   },
                 ]}
               >
                 <Input
                   prefix={<LockOutlined className="site-form-item-icon" />}
                   type="password"
                   placeholder="密码:helishou"
                   style={{ borderRadius: "5px" }}
                 />
               </Form.Item>
               {/* <Form.Item>
           <Form.Item name="remember" valuePropName="checked" noStyle>
             <Checkbox>Remember me</Checkbox>
           </Form.Item>
 
           <a className="login-form-forgot" href="">
             Forgot password
           </a>
         </Form.Item> */}
 
               <Form.Item>
                 <Button
                   type="primary"
                   htmlType="submit"
                   className="login-form-button"
                   style={{ borderRadius: "5px" }}
                 >
                   确认
                 </Button>
                 <NavLink to="/login">
                   取消
                 </NavLink>
               </Form.Item>
             </Form>
           </section>
         </div>
       </div>
     );
   }
 }
 export default connect((state) => ({userData:state.userData}), {register})(Register);
 