/*
@author:zertow
@time:4.29 19:38
*/
import React, { Component } from 'react'
import { Button } from 'antd';
import axios from 'axios'
import { Select } from 'antd';
import { Descriptions, DatePicker, Space } from 'antd';
import ReactEcharts from 'echarts-for-react';
const { Option } = Select;

const { RangePicker } = DatePicker;
class SearchInput extends React.Component {
    state = {
        data: [],
        value: undefined,
        isLoading: 0,
        datestring: [],
        type: "RCCConnSUCC",
        x: [],
        y: [],
    };

    handleChange = value => {
        this.setState({ value });
    };
    click = () => {

        axios.get(
            '/data/kpi/detail', {
            params: {
                "name": this.state.value,
                "choice": this.state.type,
                "start_time": this.state.datestring[0].slice(0, 10),
                "end_time": this.state.datestring[1].slice(0, 10)
            }
        }
        ).then(body => {
            this.setState({ tablename: body.data })
            //console.log(this.state.tablename)
            var new_x = []
            var new_y = []

            //console.log(this.state.type)
            for (var i in this.state.tablename) {
                new_x.push(this.state.tablename[i]["StartTime"])
                if (this.state.type != "RCCConnRATE")
                    new_y.push(this.state.tablename[i]["Data"] / 10000)
                else {
                    new_y.push(this.state.tablename[i]["Data"] * 100)
                }
            }
            this.setState({ x: new_x, y: new_y })

            //console.log(this.state.x)

            //console.log(this.state.y)
        });
        //console.log(1)
        this.setState({ isLoading: true })
        //console.log(this.state)
    }
    onChange = (date, dateString) => {
        this.setState({ datestring: dateString })
    }
    gettype = (val) => {

        this.setState({ type: val })
    }
    getOption = () => {
        let option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    crossStyle: {
                        color: '#999'
                    }
                }
            },
            toolbox: {
                feature: {
                    dataView: { show: true, readOnly: false },
                    magicType: { show: true, type: ['line', 'bar'] },
                    restore: { show: true },
                    saveAsImage: { show: true }
                }
            },
            legend: {
                data: ["RCCConnRATE", "RCCConnATT", "RCCConnSUC"]
            },
            xAxis: [
                {
                    type: 'category',
                    data: this.state.x,
                    axisPointer: {
                        type: 'shadow'
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    name: this.state.type != "RCCConnRATE" ? (this.state.type + " 万") : ("RCCConnRATE %"),
                    min: 0,
                    max: this.state.type != "RCCConnRATE" ? 20 : 100,
                    interval: this.state.type != "RCCConnRATE" ? 2 : 10,
                    axisLabel: {
                        formatter: '{value}'
                    }
                },
            ],
            series: [
                {
                    name: '蒸发量',
                    type: 'line',
                    data: this.state.y
                },
            ]
        };
        return option
    }
    render() {

        const isLoading = this.state.isLoading
        const options = this.props.table.map(d => <Option value={d["SECTOR_NAME"]}>{d["SECTOR_NAME"]}</Option>);
        //console.log(isLoading)
        return (
            <div>
                <Select
                    style={{ width: 150 }}
                    defaultValue="RCCConnSUCC"    //选择器默认显示
                    onChange={this.gettype}
                >
                    <Option key='RCCConnSUCC' value='RCCConnSUCC'>RCCConnSUCC</Option>
                    <Option key='RCCConnATT' value='RCCConnATT'>RCCConnATT</Option>
                    <Option key='RCCConnRATE' value='RCCConnRATE'>RCCConnRATE</Option>
                </Select>
                <Select
                    showSearch
                    optionFilterProp="children"
                    style={{ width: 200 }}
                    onChange={this.handleChange}
                >
                    {options}
                </Select><RangePicker showTime onChange={this.onChange} />
                <Button onClick={this.click}>查询</Button>
                <ReactEcharts style={{ display: this.state.isLoading == 0 ? 'none' : 'block',  width: '500px' }} option={this.getOption()} /></div>
        );
    }
}

export default class Kpi extends Component {

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
                "choice": "name"
            }
        }
        ).then(body => {
            this.setState({ tablename: body.data })
            //console.log(this.state.tablename)
        });
    }

    render() {
        return (
            <div>
                <SearchInput table={this.state.tablename} placeholder="input search text" style={{ width: 200 }} />
            </div>
        )
    }
}
