import axios from 'axios'
import React, { Component } from 'react'
import { InputNumber, Checkbox, Space } from 'antd';
import { Table, Tag} from 'antd';
import Papa from "papaparse"


//TODO:添加一点后端返回后，界面的样式
export default class C2INew extends Component {
    state = {
        data:[],
        keyboard: true,
        value: 0
    }

    limitDecimals = (value) => {
        return value.replace(/^(0+)|[^\d]+/g, '');
    }

    confirm = () => {
        const value = this.state.value
        axios({
            method: 'post',
            url: '/data/generate_tbC2Inew',
            params: {
                n: value
            }
        })
            .then(
                (res) => {
                    console.log(1111,res)
                    axios({
                        method:'get',
                        url:'/data/download',
                        params:{
                            table:"tbc2inew",
                        }
                    })
                        .then(
                            async (res) => {
                                
                                fetch(res.data[0])
                                    .then(
                                        (response) => {
                                            console.log(response)
                                            let reader = response.body.getReader();
                                            let decoder = new TextDecoder('utf-8');
                            
                                            reader.read()
                                                .then(
                                                    (result) => {
                                                        //console.log(decoder.decode(result.value));
                                                        const csv = decoder.decode(result.value)
                                                        const parsedCsv = Papa.parse(csv, {header:true})
                                                        this.setState({data:parsedCsv.data})
                                                        //console.log(parsedCsv.meta)   ->表头

                                                });
                                    });

                            }
                        )
                        .catch(
                            (err) => {
                                console.log(err)
                            }
                        )
                }
            )
            .catch(
                (err) => {
                    console.log(err)
                }
            )
        
    }
    render() {
        const keyboard = this.state.keyboard
        var columns = []
        for (var j in this.state.data[0]) {
            columns.push({ title: j, dataIndex: j, key: j })
        }
        return (
            <div>
                <Space>
                    <InputNumber style={{ width: 150 }}
                        min={0}
                        defaultValue={0}
                        keyboard={keyboard}
                        formatter={this.limitDecimals}
                        parser={this.limitDecimals}
                        placeholder="请输入测量值对阈值"
                        onChange={(value) => {
                            this.setState({ value: value })
                        }}
                    />
                    <Checkbox
                        onChange={() => {
                            this.setState({ keyboard: !keyboard })
                        }}
                        checked={keyboard}
                    >
                        Toggle keyboard
                    </Checkbox>
                </Space>
                <button onClick={this.confirm}>
                    确认
                </button>
                <Table
                    style={{display: this.state.data === [] ? 'none' : 'block' }}
                    columns={columns}
                    dataSource={this.state.data}/>

            </div>

        )
    }
}
