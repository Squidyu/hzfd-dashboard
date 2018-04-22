import React from 'react'
import { Form, Input, Button, Card } from 'antd';
import auth from '../../../services/auth';
import { history } from '../../../utils/config';
import Styles from './Index.less';

const FormItem = Form.Item;

class Index extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      confirmDirty:''
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    const {password, newPassword, reqNewPassword} =  this.props.form.getFieldsValue();

    this.props.form.validateFields((err, values) => {
      if (!err) {
        auth.updatePassword(password,newPassword);
      }
    });
  }

  handleGoBack(){
    history.goBack();
  }

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }

  checkConfirm = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['reqNewPassword'], { force: true });
    }
    callback();
  }

  checkPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('newPassword')) {
      callback('2次密码不一致');
    } else {
      callback();
    }
  }



  render() {
    const { getFieldDecorator } = this.props.form;

    return (
        <div className={Styles.loginWrapper}>
          <Card title="修改密码">
            <Form
              style={{width: 300,margin:'auto'}}
              onSubmit={e=>this.handleSubmit(e)}
            >
              <FormItem label="原密码">
                {getFieldDecorator('password',{
                  rules: [{ required: true, message: '请输入原密码!' }],
                })(
                  <Input type="password" placeholder="请输入原密码"/>
                )}
              </FormItem>
              <FormItem
                label="新密码"
              >
                {getFieldDecorator('newPassword',{
                  rules: [
                    {required: true, message: '请输入新密码!'},
                    { min:6,message:"密码为6-20位字符"},
                    { max:20,message:"密码为6-20位字符"},
                    {validator: this.checkConfirm}
                  ],
                })(
                  <Input type="password" placeholder="请输入新密码"/>
                )}
              </FormItem>
              <FormItem
                label="确认新密码"
              >
                {getFieldDecorator('reqNewPassword',{
                  rules: [
                    {required: true, message: '请再次输入新密码!'},
                    {validator: this.checkPassword}
                  ],
                })(
                  <Input type="password" placeholder="请再次输入新密码" onBlur={this.handleConfirmBlur}/>
                )}
              </FormItem>
              <Button type="primary" htmlType="submit">更新</Button>
              <Button onClick={this.handleGoBack} className={Styles.backButton}>返回</Button>
            </Form>
          </Card>
        </div>
    );
  }
}

Index = Form.create()(Index);

export default Index


