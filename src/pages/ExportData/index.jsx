/*
@author:shanmu
@time:3.28 19:38
*/

import React, { Component } from 'react'
import { Select } from 'antd'
import axios from 'axios'

const { Option } = Select;


export default class ExportData extends Component {


  state = {
    filePath:""
  }
  //获取选择框输入
  getTable = (value)=>{
    this.tableName = value
    console.log(`selectd ${value}`)
  }

  tableName = "";
  tableList = ["tbcell","lucy","tom"]

  downloadTable = ()=>{
    axios({
      method:'get',
      url:'/data/download',
      params:{
        table:"tbcell"
      }
    })
    .then(
      (res) =>{
        console.log(res.data)
        this.setState({filePath:"http://82.157.100.28:8000"+res.data[0]})
      }
    )
    .catch(
      (err)=>{
        console.log(err)
      }
    )
  }


  render() {
    return (
      <div>
        <Select
          allowClear                  //支持清除
          showSearch
          placeholder = '选择表名'    //选择器默认显示
          optionFilterProp="children"
          onChange={this.getTable}
          >
          {
            this.tableList.map((item,index)=>{
              return(
                <Option key={index} value={item}>
                  {item}
                </Option>
              )
            })
          }
        </Select>
        <button onClick={this.downloadTable}>downloadTable</button>
        <hr />
        <a href={this.state.filePath} download="">点击下载文件</a>
      </div>
    )
  }
}
