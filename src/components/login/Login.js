import React from 'react'

import { Form, Input, Button, Card,message } from 'antd';
import auth from '../../services/auth';
import { history,origin } from '../../utils/config';
import Styles from './Index.less';

const FormItem = Form.Item;

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      imgCodeId:"",
      imgSrc:""
    }
  }
  componentDidMount() {
    this.getData();
  }
  getData(){
    this.fetchPost('/admin/user/imgVerifyCode',{}).then(json=>{
      if(json.code==0){
        let temp = "data:image/jpeg;base64,"+json.vo.imgBase64Encoder;
        this.setState({
          imgSrc:temp,
          imgCodeId:json.vo.imgCodeId
        })
      }else{
        message.error(json.msg)
      }
    })
  }
  fetchPost(url, body, header) {
    return new Promise((resolve, reject) => {
      fetch(`${origin}${url}`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          ...header
        },
        timeout: 3,
        mode: 'cors',
        body: JSON.stringify(body)
      }).then(function (response) {
        return response.json();
      }).then(function (json) {
        if (json.code == 0) {
          return resolve(json);
        } else if (json.code == 700) {
          message.error(json.msg);
          auth.logout();
        } else if (json.code == 204) {
          message.error(json.msg);
        } else if (json.code >= 90000) {
          message.error(json.msg);
        } else if (json.code == 201) {
          message.error(json.msg);
        }
        else {
          return reject(json);
        }
      }).catch(function (err) {
        console.error(err);
        return reject(err);
      });
    })
  }

  handleSubmit(e) {
    e.preventDefault();

    const {tel, password} =  this.props.form.getFieldsValue();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        auth.login(tel, password, (loggedIn)=> {
          if (loggedIn) {
            history.push('/')
          }else{
            this.getData();
          }
        })
      }
    });

  }

  checkTel =(rule, value, callback) =>{
    if (value && !(/^1[3|4|5|7|8][0-9]{9}$/.test(value)) ) {
      callback('请输入正确的手机号码！');
    } else {
      callback();
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
        <div className={Styles.loginWrapper}>
          <Card title="管理员登录">
            <Form
              style={{width: 300,margin:'auto'}}
              onSubmit={e=>this.handleSubmit(e)}
            >
              <FormItem label="手机号">
                {getFieldDecorator('tel',{
                  rules: [
                    { required: true, message: '请输入手机号!' },
                    { validator: this.checkTel}
                    ],
                })(
                  <Input placeholder="请输入手机号"/>
                )}
              </FormItem>
              <FormItem
                label="密码"
              >
                {getFieldDecorator('password',{
                  rules: [
                    { required: true, message: '请输入密码!' },
                    { min:6,message:"密码为6-20位字符"},
                    {max:20,message:"密码为6-20位字符"}
                    ],
                })(
                  <Input type="password" placeholder="请输入密码"/>
                )}
              </FormItem>
             {/* <div style={{"position":"relative"}}>
                <FormItem label="验证码" style={{"width":200}}>
                  {getFieldDecorator('imgVerifyCode',{
                    rules: [
                      { required: true, message: '请输入验证码!' }
                    ],
                  })(
                    <Input placeholder="请输入验证码"/>
                  )}
                </FormItem>
                <img onClick={(e)=>{this.getData()}} style={{"display":"block","position":"absolute","top":32,"right":0,"width":100,"height":32}} src={this.state.imgSrc}/>
              </div>*/}
              <Button type="primary" htmlType="submit">登录</Button>
            </Form>
          </Card>
        </div>
    );
  }
}

Login = Form.create()(Login);

export default Login


