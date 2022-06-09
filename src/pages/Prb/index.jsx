/*
@author:zertow
@time:4.29 19:38
*/
import React, { Component } from 'react'
import { Button } from 'antd';
import axios from 'axios'
import { Select } from 'antd';
import { Descriptions, DatePicker, InputNumber, SpaceInputNumber } from 'antd';
import ReactEcharts from 'echarts-for-react';
const { Option } = Select;

const { RangePicker } = DatePicker;
class SearchInput extends React.Component {
    state = {
        data: [],
        value: undefined,
        isLoading: 0,
        datestring: [],
        type: "15min",
        x: [],
        y: [],
        num: 0
    };

    handleChange = value => {
        this.setState({ value });
    };
    click = () => {

        axios.get(
            '/data/prb/detail', {
            params: {
                "name": this.state.value,
                "prbindex": this.state.num,
                "granularity": this.state.type,
                "start_time": this.state.datestring[0],
                "end_time": this.state.datestring[1]
            }
        }
        ).then(body => {
            this.setState({ tablename: body.data })
            console.log(this.state.tablename)
            var new_x = []
            var new_y = []

            console.log(this.state.type)
            var now = 0
            var sum = 0
            for (var i in this.state.tablename) {
                if (i == 0) {
                    new_x.push(this.state.tablename[i]["StartTime"])
                    sum += this.state.tablename[i]["AvgNoise"]
                    now += 1
                }
                else {
                    if (new_x[new_x.length - 1] != this.state.tablename[i]["StartTime"]) {
                        new_y.push(sum / now)
                        new_x.push(this.state.tablename[i]["StartTime"])
                        sum = this.state.tablename[i]["AvgNoise"]
                        now = 1
                    }
                    else {
                        sum += this.state.tablename[i]["AvgNoise"]
                        now += 1
                    }
                }
            }
            this.setState({ x: new_x, y: new_y })

            console.log(this.state.x)

            console.log(this.state.y)
        });
        console.log(1)
        this.setState({ isLoading: true })
        console.log(this.state)
    }
    onChange = (date, dateString) => {
        console.log(dateString)
        this.setState({ datestring: dateString })
    }
    gettype = (val) => {
        console.log(val)
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
                    name: "prb",
                    min: Math.min.apply(null, this.state.y),
                    max: Math.max.apply(null, this.state.y),
                    interval: 5,
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
    num_change = (val) => {
        this.setState({ num: val })
    }
    render() {

        const isLoading = this.state.isLoading
        const options = this.props.table.map(d => <Option value={d}>{d}</Option>);
        return (
            <div>
                <Select
                    style={{ width: 150 }}
                    defaultValue="15min"    //选择器默认显示
                    onChange={this.gettype}
                >
                    <Option key='15min' value='15min'>15min</Option>
                    <Option key='hour' value='hour'>hour</Option>
                </Select>
                <InputNumber min={0} max={99} onChange={this.num_change} placeholder={"pcb"} />
                <Select
                    showSearch
                    optionFilterProp="children"
                    style={{ width: 200 }}
                    onChange={this.handleChange}
                >
                    {options}
                </Select><RangePicker showTime onChange={this.onChange} />
                <Button onClick={this.click}>查询</Button>
                <ReactEcharts style={{ display: this.state.x.length == 0 ? 'none' : 'block' }} option={this.getOption()} /></div>
        );
    }
}

export default class Prb extends Component {

    //TODO:表列表需要从服务端获取，应该写在willMount
    state = {
        tableName: "id",
        tableid: [],
        tablename: [],
    }
    componentDidMount() {
        axios.get(
            '/data/enodeb', {
            params: {
                "choice": "name"
            }
        }
        ).then(body => {
            var s = body.data.map(d => d["ENODEB_NAME"])
            s = new Set(s)
            s = [...s]
            this.setState({ tablename: s })
            console.log(this.state.tablename)
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
