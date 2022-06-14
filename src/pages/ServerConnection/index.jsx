/*
@author:zertow
@time:5.18 21:44
*/
import React, { Component } from 'react'
import { Statistic, Row, Col, Button, InputNumber, Space } from 'antd';
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import { logout } from "../../redux/actions";

class SystemConnnection extends Component {

    state = {
        effect: 0,
        connect: 0,
        buffer: 0,
        time: 0,
        dataset: [],
        isLoading: false
    }

    logout = ()=>{
        this.props.logout()
        return <Redirect path = '/admin'/>
    }
    click_effect = () => {
        axios.post(
            `/admin/postgres/basic`, {
            effective_cache_size: this.state.effect
        }
        ).then(res => {
            console.log(res.status);

            let da = this.state.dataset
            da[0][1] = this.state.effect
            this.setState({ dataset: da })
        })
    }
    click_connect = () => {

        axios.post(
            `/admin/postgres/basic`, {
            max_connections: this.state.connect
        }
        ).then(res => {
            console.log(res.status);
            let da = this.state.dataset
            da[2][1] = this.state.connect
            this.setState({ dataset: da })
        })
    }
    click_buffer = () => {

        axios.post(
            `/admin/postgres/basic`, {
            shared_buffers: this.state.buffer
        }
        ).then(res => {
            console.log(res.status);
            let da = this.state.dataset
            da[3][1] = this.state.buffer
            this.setState({ dataset: da })
        })

    }
    click_time = () => {

        axios.post(
            `/admin/postgres/basic`, {
            tcp_keepalives_idle: this.state.time
        }
        ).then(res => {
            console.log(res.status);
            let da = this.state.dataset
            da[4][1] = this.state.time
            this.setState({ dataset: da })
        })
    }
    effect_change = (value) => {
        this.setState({ effect: value })
    }
    connect_change = (value) => {
        this.setState({ connect: value })
    }
    buffer_change = (value) => {
        this.setState({ buffer: value })
    }
    time_change = (value) => {
        this.setState({ time: value })
    }

    componentDidMount() {
        axios.get(
            '/admin/postgres/basic'
        ).then(body => {
            let da = []
            let now = {}
            for (var val in body.data) {
                da.push([])
                for (var j in body.data[val]) {
                    da[val].push(body.data[val][j])
                }
            }
            this.setState({ dataset: da, isLoading: true, effect: da[0][1], connnect: da[2][1], buffer: da[3][1], time: da[4][1] })
            console.log(this.state.dataset)

        });
    }
    render() {
        // console.log('About组件收到的props是',this.props);
        if (!this.state.isLoading) {
            return <div>Loading...</div>
        }
        return (
            <div>
                <Row gutter={16}>
                    <Col span={12}>
                        <Statistic title="有效缓存" value={this.state.dataset[0][1] + " 8kb"} />
                        <Space>
                            <InputNumber style={{ marginTop: 6, marginBottom: 16 }} min={10000} max={6000000} defaultValue={this.state.dataset[0][1]} onChange={this.effect_change} />
                            <Button style={{ marginTop: 6, marginBottom: 16 }} onClick={this.click_effect} type="primary">
                                change
              </Button></Space>
                    </Col>
                    <Col span={12}>
                        <Statistic title="最大连接数" value={this.state.dataset[2][1]} />
                        <Space>
                            <InputNumber style={{ marginTop: 6, marginBottom: 16 }} max={200} defaultValue={this.state.dataset[2][1]} onChange={this.connect_change} />
                            <Button style={{ marginTop: 6, marginBottom: 16 }} onClick={this.click_connect} type="primary">
                                change
              </Button></Space>
                    </Col>
                    <Col span={12}>
                        <Statistic title="缓冲区大小" value={this.state.dataset[3][1] + " kb"} />
                        <Space>
                            <InputNumber style={{ marginTop: 6, marginBottom: 16 }} max={20000} defaultValue={this.state.dataset[3][1]} onChange={this.buffer_change} />
                            <Button style={{ marginTop: 6, marginBottom: 16 }} onClick={this.click_buffer} type="primary">
                                change
              </Button></Space>
                    </Col>

                    <Col span={12}>
                        <Statistic title="数据库连接时长" value={this.state.dataset[4][1] + " s"} />
                        <Space>
                            <InputNumber style={{ marginTop: 6, marginBottom: 16 }} max={10000} defaultValue={this.state.dataset[4][1]} onChange={this.time_change} />
                            <Button style={{ marginTop: 6, marginBottom: 16 }} onClick={this.click_time} type="primary">
                                change
              </Button></Space>
                    </Col>
                </Row>
                <Button onClick={this.logout}>退出账号</Button></div>
        )
    }
}
export default connect((state) => ({ userData: state.userData }), {logout})(SystemConnnection);
