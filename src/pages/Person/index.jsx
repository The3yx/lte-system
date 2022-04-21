/*
@author:zertow
@time:4.18 21:44
*/
import React, { useState, useEffect, Component } from 'react';
import { List, message, Avatar, Skeleton, Divider } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component'; import { Button } from 'antd';
import axios from 'axios';
import { connect } from "react-redux";
import { InputNumber } from 'antd';
const InfiniteListExample = () => {
    const [data, setData] = useState([]);
    axios.get(
        '/admin/user', {
        headers: {
            "authentication": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJidXB0IjoiemVydG93IiwiZXhwIjoxNjUwMzMwNDkzfQ.TgthETyGLjhGYGgCVwDtdP2WjUQ0FO62jjVix7-UkTM"
        }
    }
    ).then(body => {
        setData([...body.data]);
    });
    return (
        <div
            id="scrollableDiv"
            style={{
                height: 400,
                overflow: 'auto',
                padding: '0 16px',
                border: '1px solid rgba(140, 140, 140, 0.35)',
            }}
        >
            <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                            title={<div>{item.username}</div>}
                        />
                        <List.Item.Meta
                            title={<div>{"id:" + item.id}</div>}
                        />
                        <List.Item.Meta
                            title=
                            {<div>{"管理员:" + (item.is_admin == true ? "是" : "否")}</div>}
                        />
                        <List.Item.Meta
                            title=
                            {<div>{"已激活:" + (item.is_active == true ? "是" : "否")}</div>}
                        />
                    </List.Item>
                )}
            />,
        </div>
    );
};
class Person extends Component {
    active = 1;
    delete = 1;
    onChangeactive = (value) => {
        console.log(value)
        this.active = value;
    }
    onChangedelete = (value) => {
        console.log(value)
        this.delete = value;
    }
    act = () => {
        axios.post(
            `/admin/active/${this.active}`, {
            headers: {
                "authentication": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJidXB0IjoiemVydG93IiwiZXhwIjoxNjUwMzMwNDkzfQ.TgthETyGLjhGYGgCVwDtdP2WjUQ0FO62jjVix7-UkTM"
            }
        }
        ).then(res => {
            console.log(res.status);
        })
    }
    del = () => {
        axios.delete(
            `/admin/active/${this.delete}`, {
            headers: {
                "authentication": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJidXB0IjoiemVydG93IiwiZXhwIjoxNjUwMzMwNDkzfQ.TgthETyGLjhGYGgCVwDtdP2WjUQ0FO62jjVix7-UkTM"
            }
        }
        ).then(res => {
            console.log(res.status);
        })
    }
    render() {
        axios.get(
            '/admin/user', {
            headers: {
                "authentication": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJidXB0IjoiemVydG93IiwiZXhwIjoxNjUwMzMwNDkzfQ.TgthETyGLjhGYGgCVwDtdP2WjUQ0FO62jjVix7-UkTM"
            }
        }
        ).then((res) =>
            console.log(res.data[0]))
        return (
            <div>
                <InfiniteListExample />
                <InputNumber min={1} max={10} defaultValue={this.active} onChange={this.onChangeactive} />
                <Button onClick={this.act} type="primary">激活</Button>
                <InputNumber min={1} max={10} defaultValue={this.delete} onChange={this.onChangedelete} />
                <Button onClick={this.del} type="primary">删除</Button></div>
        )
    }
}
export default connect((state) => ({ user: state.user }))(Person);

