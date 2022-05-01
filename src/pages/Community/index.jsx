/*
@author:zertow
@time:4.29 19:38
*/
import React, { Component } from 'react'
import { Button } from 'antd';
import axios from 'axios'
import { Select } from 'antd';
import { Descriptions } from 'antd';
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
            '/data/sector/detail', {
            params: {
                "choice": this.props.type === 'SECTOR_ID' ? "id" : "name",
                "name_or_id": this.state.value
            }
        }
        ).then(body => {
            this.setState({ isLoading: false })
            console.log(body)
            var da = []
            for (var val in body.data) {
                da.push(<Descriptions.Item label={val}>{body.data[val]}</Descriptions.Item>)
            }
            this.setState({ data: da })
        })
            .catch((err) => {
                console.log(err)
            });
        console.log(this.state)
    }

    render() {
        const isLoading = this.state.isLoading
        const options = this.props.table.map(d => <Option value={d[this.props.type]}>{d[this.props.type]}</Option>);
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
                <Descriptions style={{ display: this.state.data === [] ? 'none' : 'block' }} title="小区信息">
                    {this.state.data}
                </Descriptions></div>
        );
    }
}

export default class Community extends Component {

    //TODO:表列表需要从服务端获取，应该写在willMount
    state = {
        tableName: "id",
        tableid: [],
        tablename: [],
    }
    componentDidMount() {
        axios.get(
            '/data/sector', {
            params: {
                "choice": "id"
            }
        }
        ).then(body => {
            this.setState({ tableid: body.data })
        });
        axios.get(
            '/data/sector', {
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
            '/data/sector', {
            params: {
                "choice": "id"
            }
        }
        ).then(body => {
            this.setState({ tableid: body.data })
        });
        axios.get(
            '/data/sector', {
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
                <SearchInput table={this.state.tableName === "id" ? this.state.tableid : this.state.tablename} type={this.state.tableName === "id" ? 'SECTOR_ID' : 'SECTOR_NAME'} placeholder="input search text" style={{ width: 200 }} />

            </div>
        )
    }
}
