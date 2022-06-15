/*
@author:zertow
@time:4.30 19:38
*/
import React, { Component } from 'react'
import { Button } from 'antd';
import axios from 'axios'
import { Select } from 'antd';
import { Descriptions } from 'antd';
import { Table, Tag, Space } from 'antd';
import {v4 as uuidv4} from 'uuid'
const { Option } = Select;
class SearchInput extends React.Component {

    state = {
        data: [],
        value: undefined,
        isLoading: false
    };

    handleChange = value => {
        this.setState({ value });
    };
    click = () => {
        this.setState({ isLoading: true })
        console.log(this.state)
        console.log(this.props.type)
        axios.get(
            '/data/enodeb/detail', {
            params: {
                "choice": this.props.type === 'ENODEBID' ? "id" : "name",
                "name_or_id": this.state.value
            }
        }
        ).then(body => {
            var data = []
            data = body.data.map((item,index)=>{
                return {key:uuidv4(), ...item}
            })
            this.setState({ isLoading: false ,data:data})

        })
            .catch((err) => {
                console.log(err)
            });
        console.log(this.state)
    }

    render() {
        var columns = []
        for (var j in this.state.data[0]) {
            if(j === 'key')
                continue
            columns.push({ title: j, dataIndex: j, key: j })
        }
        const isLoading = this.state.isLoading
        var s = this.props.table.map(d => d[this.props.type])
        s = new Set(s)
        s = [...s]
        const options = s.map(d => <Option value={d}>{d}</Option>);
        return (
            <div>
                <Select
                    showSearch
                    optionFilterProp="children"
                    style={{ width: 200 }}
                    onChange={this.handleChange}
                >
                    {options}
                </Select>
                <Button onClick={this.click}>查询</Button>
                <div>{isLoading ? "loading..." : ""}</div>
                <Table style={{ display: this.state.data === [] ? 'none' : 'block' }} columns={columns} dataSource={this.state.data} size="small"
                    scroll={{ x: 1300 }} />
            </div>
        );
    }
}

export default class Enodeb extends Component {

    //TODO:表列表需要从服务端获取，应该写在willMount
    state = {
        tableName: "id",
        tableid: [],
        tablename: [],
    }
    componentWillMount() {
        axios.get(
            '/data/enodeb', {
            params: {
                "choice": "id"
            }
        }
        ).then(body => {
            this.setState({ tableid: body.data })
        });
        axios.get(
            '/data/enodeb', {
            params: {
                "choice": "name"
            }
        }
        ).then(body => {
            this.setState({ tablename: body.data })
        });
    }

    //获取选择框输入
    getTable = (value = "id") => {
        this.setState({ tableName: value })
        axios.get(
            '/data/enodeb', {
            params: {
                "choice": "id"
            }
        }
        ).then(body => {
            this.setState({ tableid: body.data })
        });
        axios.get(
            '/data/enodeb', {
            params: {
                "choice": "name"
            }
        }
        ).then(body => {
            this.setState({ tablename: body.data })
        });
    }

    render() {
        return (
            <div>
                <Select
                    style={{ width: 80 }}
                    defaultValue="id"    //选择器默认显示
                    onChange={this.getTable}
                >
                    <Option key='id' value='id'>id</Option>
                    <Option key='name' value='name'>name</Option>
                </Select>
                <SearchInput table={this.state.tableName === "id" ? this.state.tableid : this.state.tablename} type={this.state.tableName === "id" ? 'ENODEBID' : 'ENODEB_NAME'} placeholder="input search text" style={{ width: 200 }} />

            </div>
        )
    }
}
