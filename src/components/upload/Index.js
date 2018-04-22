import React from 'react'
import {Upload, Icon, message} from 'antd'
import Style from './Index.less'
import auth from '../../services/auth'

class Default extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      imageUrl:"",
      fileList:[]
    }
  }

  getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  beforeUpload(file) {
    const isJPG = file.type === 'image/jpeg';
    if (!isJPG) {
      message.error('You can only upload JPG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJPG && isLt2M;
  }

  handleChange = (info) => {
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      this.getBase64(info.file.originFileObj, imageUrl => this.setState({ imageUrl }));
    }
  }

  beforeUpload(file){
    this.setState({
      fileList:file
    },()=>{
      // let formData = new FormData();
      // formData.append("type", "picture");
      // formData.append("picture", file);
      // formData.append('token', auth.getToken());
      // let xhr = new XMLHttpRequest();
      // xhr.open("POST", "http://114.215.241.69:7090/admin/uploadfile/uploadjkzjpicture");
      // xhr.onload = function (data) {
      // };
      // xhr.onreadystatechange = function () {
      //   if (xhr.readyState == 4) {
      //     if (xhr.status === 200) {
      //       let data = JSON.parse(xhr.responseText);
      //       if (data.code == 0) {
      //         console.log(data);
      //         message.success('上传成功');
      //         // self.setState({
      //         //   logoImg:data.vo
      //         // })
      //       } else {
      //         message.error(data.msg)
      //       }
      //     }
      //   }
      // };
      // xhr.send(formData);
    })
  }

  render() {
    const imageUrl = this.state.imageUrl;
    return (
        <div>
          <Upload
            className={Style.avatar_uploader}
            listType="picture"
            name="picture"
            showUploadList={false}
            action="http://114.215.241.69:7090/admin/uploadfile/uploadjkzjpicture"
            onChange={this.handleChange}
            beforeUpload={(e)=>this.beforeUpload(e)}
          >
            {
              imageUrl ?
                <img src={imageUrl} alt="" className="avatar" /> :
                <Icon type="plus" className={Style.avatar_uploader_trigger} />
            }
          </Upload>
        </div>
    );
  }
}


export default Default


