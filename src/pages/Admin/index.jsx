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
import ServerConnection from '../ServerConnection'
import DataImport from "../DataImport"
import ExportData from "../ExportData"
import Community from "../Community"
import Enodeb from "../Enodeb"
import Kpi from "../Kpi"
import Prb from "../Prb"
import C2INew from '../C2INew';
import C2I3 from '../C2I3';


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
                                <Menu.Item key="/serverconnection"><Link to="/admin/serverconnection">数据库配置</Link></Menu.Item>
                                <Menu.Item key="/person" style={{ display: userData.is_admin == true ? 'block' : 'none' }} ><Link to="/person">用户管理</Link></Menu.Item>
                                <SubMenu key="sub3" icon={<NotificationOutlined />} title="数据管理">
                                    <Menu.Item key="/dataimport"><Link to="/admin/dataimport">数据导入</Link></Menu.Item>
                                    <Menu.Item key="/exportdata"><Link to="/admin/exportdata">数据导出</Link></Menu.Item>
                                </SubMenu>
                                <SubMenu key="sub4" icon={<NotificationOutlined />} title="业务查询">
                                    <Menu.Item key="/community"><Link to="/admin/community">小区配置信息查询</Link></Menu.Item>
                                    <Menu.Item key="/enodeb"><Link to="/admin/enodeb">基站eNodeB信息查询</Link></Menu.Item>
                                    <Menu.Item key="/kpi"><Link to="/admin/kpi">小区KPI指标信息查询</Link></Menu.Item>
                                    <Menu.Item key="/prb"><Link to="/admin/prb">PRB信息统计与查询</Link></Menu.Item>
                                </SubMenu>
                                <SubMenu key="sub5" icon={<NotificationOutlined />} title="业务分析">
                                    <Menu.Item key="/C2INew"><Link to="/admin/C2INew">主邻小区干扰分析</Link></Menu.Item>
                                    <Menu.Item key="/C2I3"><Link to="/admin/C2I3">重叠覆盖干扰小区三元组分析</Link></Menu.Item>
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
                                    <Route path="/admin/kpi" component={Kpi} />
                                    <Route path="/admin/enodeb" component={Enodeb} />
                                    <Route path="/admin/prb" component={Prb} />
                                    <Route path="/admin/C2INew" component={C2INew} />
                                    <Route path="/admin/C2I3" component={C2I3} />
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