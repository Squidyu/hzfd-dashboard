import React, { Component, PropTypes } from 'react'
import { Upload, Icon, message } from 'antd'
import Styles from './ImgUpload.less'
import {origin,history} from '../../utils/config'


class ImgUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      imgParam:{
        imageUrl:"",
        fileList:[]
      },
      selfNo:"",
    }
  }
  componentWillReceiveProps(props) {
    if(props.imgUrl!= this.state.imgParam.imageUrl){
      this.setState({
        imgParam:{
          ...this.state.params,
          imageUrl:props.imgUrl
        },
        selfNo:props.selfNo
      })
    }
  }

  getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  handleChange(info,id){
    let self = this;
    if (info.file.status === 'done') {
      const fileList=info.fileList;
      self.getBase64(info.file.originFileObj,
        imageUrl =>{
          self.setState({
            imgParam:{
              ...self.state.imgParam,
              imageUrl:imageUrl,
              fileList:fileList
            }
          })
        });
    }
  }

  render() {
    return (
      <div>
        <Upload
          className={Styles.avatar_uploader}
          listType="picture"
          name="picture"
          showUploadList={false}
          action={`${origin}/admin/uploadfile/uploadjkzjpicture`}
          onChange={(e)=>this.handleChange(e,"1")}
        >
          {
            this.state.imgParam.imageUrl?
              <img src={this.state.imgParam.imageUrl} alt="" className={Styles.avatar} /> :
              <Icon type="plus" className={Styles.avatar_uploader_trigger} />
          }
        </Upload>
      </div>
    );
  }
}

export default ImgUpload



