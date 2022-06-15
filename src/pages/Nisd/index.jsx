/*
@author:zertow
@time:4.29 19:38
*/
import React, { Component } from 'react'
import { Button } from 'antd';
import axios from 'axios'
import { Select } from 'antd';
import { InputNumber, Checkbox, Space } from 'antd';
import ReactEcharts from 'echarts-for-react';
import Image from 'antd';
import { helper } from 'echarts';
const { Option } = Select;


export default class Nisd extends Component {

    //TODO:表列表需要从服务端获取，应该写在willMount
    state = {
        threshold:-1,
        imgSrc:"",
        isLoading:false
    }


    confirm = () =>{
        this.setState({isLoading:true})
        axios({
            url:'/data/diagram',
            method:'get',
            responseType: 'blob',
            params:{
                threshold:this.state.threshold
            }
            
        })
        .then((res)=>{

            this.setState({imgSrc:window.URL.createObjectURL(res.data), isLoading:false})
        })
        .catch((err)=>{
            console.log(err)
            alert("error!")
        })
    }
    limitDecimals = (value) => {
        return value.replace(/^(0+)|[^\d]+/g, '');
    }



    render() {
        return (
            <div>
                <Space>
                    <InputNumber style={{ width: 150 }}
                        min={0}
                        defaultValue={0}
                        max={100}
                        formatter={this.limitDecimals}
                        parser={this.limitDecimals}
                        placeholder="请输入阈值"
                        onChange={(value) => {
                            this.setState({ threshold: value })
                        }}
                    />
                </Space>
                <button onClick={this.confirm}>
                    确认
                </button>
                <div>
                    {this.state.isLoading?"isLoading...":''}
                </div>
                <div>
                    <img src={this.state.imgSrc} style={{width:900,height:900}}/>
                </div>
                
            </div>
        )
    }
}
