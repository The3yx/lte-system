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

    //tableList写死
    tableList = ["tbcell","tbkpi","tbprb","tbmrodata", "tbc2i", 'tbmrodataexternal','tbc2inew','tbc2i3']
    id=""
    tableName = "";
    
    params = {
        accept: ".csv,.xlsx",     //接受文件类型
        customRequest:(config)=>{
          //console.log(config)
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
            (res) => {
              console.log("first",res)
              this.id = res.data.id
              axios({
                method:"get",
                url:"/data/upload/status",
                params:{
                  id:this.id
                }
              })
              .then((res)=>{
                console.log("second",res)
                if(res.data.failed === true){
                  console.log(res.data)
                  config.onError()
                  alert("上传失败\n"+res.data.msg)
                }else{
                  config.onSuccess();
                  alert("上传成功")
                }
                
              })
              .catch((err)=>{
                config.onError()
                console.log(err)
              })
              
            }
          )
          .catch((err)=>{
            console.log(err)
          });
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
