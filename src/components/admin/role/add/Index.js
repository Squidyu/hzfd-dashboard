import React, { Component, PropTypes } from 'react'
import Styles from './Index.less';
import {Card,Form,Input,Button,message,Icon} from 'antd'
import {fetchPost} from '../../../../utils/request'
const FormItem = Form.Item;

class Index extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      params:{
        roleName:"",
        remark:""
      }
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    const {roleName, remark} =  this.props.form.getFieldsValue();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({
          params:{
            roleName:roleName,
            remark:remark
          }
        },()=>{
          this.addRole();
        })
      }
    });
  }

  addRole(){
    fetchPost('/admin/role/save',this.state.params).then(json=>{
      if(json.code==0){
        message.success("新增角色成功!");
        this.props.form.resetFields();
      }else{
        message.error(json.msg);
      }
    })
  }

  handleReset(e) {
    e.preventDefault();
    this.props.form.resetFields();
  }


  render() {

    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {span: 8},
      wrapperCol: {span: 8},
    };

    return (
        <div>
          <Card title="新增角色">
            <Form layout="horizontal" onSubmit={e=>this.handleSubmit(e)}>
              <FormItem label="角色名称" {...formItemLayout}>
              {getFieldDecorator('roleName',{
                rules: [{ required: true, message: '请输入角色名称!' }],
              })(
                <Input placeholder="请输入角色名称"/>
              )}
              </FormItem>
              <FormItem label="角色描述" {...formItemLayout}>
                {getFieldDecorator('remark')(
                  <Input type="textarea" placeholder="请输入角色描述"/>
                )}
              </FormItem>
              <FormItem  wrapperCol={{span: 12, offset: 8}}>
                <Button type="primary" htmlType="submit">新建角色</Button>
                  &nbsp;
                <Button type="ghost" onClick={(e) => this.handleReset(e)}><Icon type="reload"/></Button>
              </FormItem>
            </Form>
          </Card>
        </div>
    );
  }
}

Index = Form.create()(Index);

export default Index


