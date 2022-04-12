/*
@author:shanmu
@time:3.28 19:38
*/

import React, { Component } from 'react'
import { Upload, message, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios'
import { Select } from 'antd';

const { Option } = Select;


export default class DataImport extends Component {

    //TODO:表列表需要从服务端获取，应该写在willMount
    tableList = ["tbcell","lucy","tom"]
    componentWillUnmount(){

    }
    
    tableName = "";
    params = {
        accept: ".csv,.xlsx",     //接受文件类型
        customRequest:(config)=>{
          const data = config.data;
          let formData = new FormData();
          formData.append('file',config.file);
          axios({
            method:"post",
            url:"/data/upload",
            headers:{
              "Content-Type": "multipart/form-data",
            },
            params:{
              name:this.tableName
            },
            data:formData,
            onUploadProgress:({total, loaded})=>{
              config.onProgress({ percent: Math.round((loaded / total) * 100).toFixed(2) }, config.file);
            }
          })
          .then(
            ({data: response}) => {
              config.onSuccess(response, config.file);
            }
          )
          .catch(config.onError);
        },
      };
    

    //获取选择框输入
    getTable = (value)=>{
      this.tableName = value
      console.log(`selectd ${value}`)
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
              <Upload {...this.params}>
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </div>
        )
    }
}
