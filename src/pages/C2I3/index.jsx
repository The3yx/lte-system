import axios from 'axios'
import React, { Component } from 'react'
import { InputNumber, Checkbox, Space } from 'antd';
import { Table, Tag} from 'antd';
import Papa from "papaparse"
import {v4 as uuidv4} from 'uuid'


function concat(arrays) {
    // sum of individual array lengths
    let totalLength = arrays.reduce((acc, value) => acc + value.length, 0);
    
    if (!arrays.length) return null;
    
        let result = new Uint8Array(totalLength);
    
        // for each array - copy it over result
        // next array is copied right after the previous one
        let length = 0;
        for(let array of arrays) {
                result.set(array, length);
                length += array.length;
        }
    
        return result;
    }

export default class C2INew extends Component {
    state = {
        data:[],
        keyboard: true,
        value: 0,
        isLoading:false
    }

    limitDecimals = (value) => {
        return value.replace(/^(0+)|[^\d]+/g, '');
    }


    read = (reader, data) => {
        const decoder = new TextDecoder('utf-8');
        reader.read()
        .then(
            (result) => {
                const done = result.done
                if(done){
                    const concatArray = concat(data)
                    data = decoder.decode(concatArray)
                    data = Papa.parse(data, {header:true}).data
                    data = data.map((item,index)=>{
                        return {key:uuidv4(),...item}
                    })
                    this.setState({ data: data,isLoading:false })
                    return
                }
                data.push(result.value)
                this.read(reader, data)
            });
    }

    confirm = () => {
        this.setState({isLoading:true})
        const value = this.state.value
        axios({
            method: 'post',
            url: '/data/generate_tbC2I3',
            params: {
                x: value
            }
        })
            .then(
                (res) => {
                    axios({
                        method:'get',
                        url:'/data/download',
                        params:{
                            table:"tbc2i3",
                        }
                    })
                        .then(
                            async (res) => {
                                
                                fetch(res.data[0])
                                    .then(
                                        (response) => {
                                            const reader = response.body.getReader();
                                            
                                            this.read(reader, [])
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
            if(j === 'key')
                continue
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
                        placeholder="请输入阈值参数x"
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
                <div>
                    {this.state.isLoading?"isLoading...":""}
                </div>
                <Table
                    style={{display: this.state.data === [] ? 'none' : 'block' }}
                    columns={columns}
                    dataSource={this.state.data}/>

            </div>

        )
    }
}
