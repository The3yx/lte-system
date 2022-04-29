/*
@author:zertow
@time:4.18 21:44
*/
import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import { connect } from "react-redux";
import { Link, Route, Switch, Redirect } from 'react-router-dom'

import Person from "../Person"
import SystemConfig from "../SystemConfig"
import ServerConnection from '../ServerConnection'
import DataImport from "../DataImport"
import ExportData from "../ExportData"
import Community from "../Community"
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
class Admin extends Component {
    //TODO:不知道加这个是什么作用@hzt
    constructor(props) {
        super(props);
        //react定义数据
        this.state = {
        }
    }
    componentWillUnmount() {

    }
    render() {
        const userData = this.props.userData;
        console.log(userData)
        console.log(2)
        //如果内存没有存储user ==>当前没有登录  
        //TODO:有token还得发给邱桑鉴权，要不每次都能成功登录
        if (!userData.access_token) {
            //跳转至登录
            return <Redirect to='/login' />;
        }
        return (
            <div>
                <Layout>
                    <Header className="header">
                        <div className="logo" />
                        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                            <Menu.Item key="1">nav 1</Menu.Item>
                            <Menu.Item key="2">nav 2</Menu.Item>
                            <Menu.Item key="3">nav 3</Menu.Item>
                        </Menu>
                    </Header>
                    <Layout>
                        <Sider width={200} className="site-layout-background">
                            <Menu
                                mode="inline"
                                defaultSelectedKeys={['1']}
                                defaultOpenKeys={['sub1']}
                                style={{ height: '100%', borderRight: 0 }}
                            >
                                <SubMenu key="sub1" icon={<UserOutlined />} title="系统管理">
                                    <Menu.Item key="/serverconnection"><Link to="/admin/serverconnection">数据库连接</Link></Menu.Item>
                                    <Menu.Item key="/systemconfig"><Link to="/admin/systemconfig">数据库配置</Link></Menu.Item>
                                </SubMenu>
                                <Menu.Item key="/person" style={{ display: userData.is_admin == true ? 'block' : 'none' }} ><Link to="/person">用户管理</Link></Menu.Item>
                                <SubMenu key="sub3" icon={<NotificationOutlined />} title="数据管理">
                                    <Menu.Item key="/dataimport"><Link to="/admin/dataimport">数据导入</Link></Menu.Item>
                                    <Menu.Item key="/exportdata"><Link to="/admin/exportdata">数据导出</Link></Menu.Item>
                                </SubMenu>
                                <SubMenu key="sub4" icon={<NotificationOutlined />} title="业务查询">
                                    <Menu.Item key="/community"><Link to="/admin/community">小区</Link></Menu.Item>
                                </SubMenu>
                                <SubMenu key="sub5" icon={<NotificationOutlined />} title="业务分析">
                                    <Menu.Item key="9">option9</Menu.Item>
                                    <Menu.Item key="10">option10</Menu.Item>
                                    <Menu.Item key="11">option11</Menu.Item>
                                    <Menu.Item key="12">option12</Menu.Item>
                                </SubMenu>
                            </Menu>
                        </Sider>
                        <Layout style={{ padding: '0 24px 24px' }}>
                            <Content
                                className="site-layout-background"
                                style={{
                                    marginTop: 24,
                                    padding: 24,
                                    minHeight: 736
                                }}
                            >
                                <Switch>
                                    <Redirect exact={true} from="/admin" to="/admin/person" />

                                    <Route path="/admin/serverconnection" component={ServerConnection} />
                                    <Route path="/admin/person" component={Person} />
                                    <Route path="/admin/dataimport" component={DataImport} />
                                    <Route path="/admin/exportdata" component={ExportData} />
                                    <Route path="/admin/community" component={Community} />
                                    <Route path="/admin/systemconfig" component={SystemConfig} />
                                </Switch>
                            </Content>
                        </Layout>
                    </Layout>
                </Layout>
            </div >
        )
    }
}
export default connect((state) => ({ userData: state.userData }), {})(Admin);