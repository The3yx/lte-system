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

export default class Nisd extends Component {

    //TODO:表列表需要从服务端获取，应该写在willMount
    state = {
        tableName: "id",
        tableid: [],
        tablename: [],
    }
    componentDidMount() {
        axios.get(
            '/data/diagram'
        ).then(body => {
            console.log(body.data)
        });
    }

    render() {
        return (
            <div>
                1
            </div>
        )
    }
}
