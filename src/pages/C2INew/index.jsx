import axios from 'axios'
import React, { Component } from 'react'
import { InputNumber, Checkbox, Space } from 'antd';

export default class C2INew extends Component {
    state = {
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
                    console.log(res)
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
            </div>

        )
    }
}
