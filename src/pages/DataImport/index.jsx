/*
@author:shanmu
@time:3.28 19:38
*/

import React, { Component } from 'react'
import { Upload, message, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Select } from 'antd';

const { Option } = Select;

export default class DataImport extends Component {


    //TODO:表列表需要从服务端获取，应该写在willMount
    tableList = ["jack","lucy","tom"]
    params = {
        name: 'file',
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',     //上传地址
        headers: {
          authorization: 'authorization-text',
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