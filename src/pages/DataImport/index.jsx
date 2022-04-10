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

const instance = axios.create({
  baseURL:'http://82.157.100.28:8000/data',
  headers:{
    'content-type': 'application/x-www-form-urlencoded',
  },
  method:'post'
})



export default class DataImport extends Component {


    //TODO:表列表需要从服务端获取，应该写在willMount
    tableList = ["tbcell","lucy","tom"]
    tableName = ""
    params = {
        accept: ".csv,.xlsx",     //接受文件类型
        name: 'file',
        action: '/upload',     //上传地址
        data:{
          table:this.tableName
        },
        customRequest(config){
          const data = config.data;
          let formData = new FormData();
          if(data){
            Object.keys(data).forEach(key =>{
              formData.append(key,data[key])
            })
          } 
          
          formData.append('file',config.file);
          formData.append('table',this.tableName);
          axios({
            method:"post",
            url:"/data/upload",
            headers:{
              "Content-Type": "multipart/form-data",
            },
            data:formData,
          }).then(
            response=>{
              console.log(response)
            }
          )
        },
        onChange(info) {
          if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
          }
          if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
          } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
          }
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



function onChange(value) {
  console.log(`selected ${value}`);
}

function onSearch(val) {
  console.log('search:', val);
}

/*
ReactDOM.render(
  <Select
    showSearch
    placeholder="Select a person"
    optionFilterProp="children"
    onChange={onChange}
    onSearch={onSearch}
    filterOption={(input, option) =>
      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
    }
  >
    <Option value="jack">Jack</Option>
    <Option value="lucy">Lucy</Option>
    <Option value="tom">Tom</Option>
  </Select>,
  mountNode,
);

*/