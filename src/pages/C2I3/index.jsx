import axios from 'axios'
import React, { Component } from 'react'
import { InputNumber, Checkbox, Space } from 'antd';

//注：C2I3需要C2INew的数据导入数据库
export default class C2I3 extends Component {
    state = {
        keyboard:true,
        setKeyboard:true,
        value:0
    }

    limitDecimals = (value) => {
        return value.replace(/^(0+)|[^\d]+/g, '');
    }

    confirm = () =>{
        const value = this.state.value
        axios({
            method:'post',
            url:'/data/generate_tbC2I3',
            params:{
                x:value
            }
        })
        .then(
            (res)=>{
                console.log(res)
            }
        )
        .catch(
            (err)=>{
                console.log(err)
            }
        )
    }
    render() {
        const keyboard = this.state.keyboard
        return (
            <div>
                <Space>
                    <InputNumber 
                        min={0}
                        defaultValue={0}
                        keyboard={keyboard} 
                        formatter={this.limitDecimals}
                        parser={this.limitDecimals}
                        placeholder="请输入阈值x"
                        onChange={(value)=>{
                            this.setState({value:value})
                        }}
                    />
                    <Checkbox
                        onChange={() => {
                            this.setState({keyboard:!keyboard})
                        }}
                    checked={keyboard}
                    >
                        Toggle keyboard
                    </Checkbox>
                </Space>
                <button onClick={this.confirm}>
                    确认
                </button>
            </div>

        )
    }
}
