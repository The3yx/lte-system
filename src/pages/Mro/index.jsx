import React, { Component } from 'react'
import { Upload, message, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios'

export default class Mro extends Component {
    params = {
        accept: ".zip",     //接受文件类型
        customRequest: (config) => {
            //console.log(config)
            const data = config.data;
            let formData = new FormData();
            formData.append('file', config.file);
            axios({
                method: "post",
                url: "/data/mro_parse",
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                data: formData,
                onUploadProgress: ({ total, loaded }) => {
                    config.onProgress({ percent: Math.round((loaded / total) * 100).toFixed(2) }, config.file);
                }
            })
            .then((res) => {
                console.log('res',res)
                if (res.status == 200) {
                    config.onSuccess();
                    alert("上传成功")
                }
            }
            )
            .catch((err) => {
                config.onError()
                console.log(err)
            });
        },
    };




    render() {
        return (
            <div>
                <div>Mro</div>
                <Upload {...this.params}>
                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
            </div>
        )
    }
}
