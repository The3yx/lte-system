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
    filePaths:[],
    tableName:"",
    tableList:["tbcell","tbkpi","tbprb","tbmrodata", "tbc2i", 'tbmrodataexternal','tbc2inew','tbc2i3']
  }
  //获取选择框输入
  getTable = (value)=>{
    this.setState({tableName:value})
    //this.tableName = value
    console.log(this.state.tableName)
    console.log(`selectd ${value}`)
  }

  

  downloadTable = ()=>{
    axios({
      method:'get',
      url:'/data/download',
      params:{
        table:this.state.tableName
      }
    })
    .then(
      (res) =>{
        
        console.log(res)
        this.setState({filePaths:res.data})
      }
    )
    .catch(
      (err)=>{
        console.log(err)
      }
    )
  }


  render() {
    const filePaths = this.state.filePaths
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
            this.state.tableList.map((item,index)=>{
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
        <div>
          点击下列链接
          下载csv文件
        </div>
        {filePaths.map((fileObj)=>{
          return (
            <div key={fileObj}>
              {/**a标签不使用proxy，所以必须正则表达式替换 */}
              <a href={fileObj.replace("/data/download/file","http://82.157.100.28:8000/data/download/file")} download="">{fileObj}</a>
            </div>
          )
        })}
      </div>
    )
  }
}
