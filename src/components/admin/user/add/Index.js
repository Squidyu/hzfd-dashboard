import React, { Component, PropTypes } from 'react'
import Styles from './Index.less';
import {Card,Form,Input,Button,message,Icon,Popconfirm,Select} from 'antd'
import {fetchPost} from '../../../../utils/request'
const Option = Select.Option;
const FormItem = Form.Item;

class Index extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      params:{
        userName:"",
        tel:"",
        roleIds:[],
        email:""
      },
      roleList:[],
      defaultRoleIds:[]
    }
  }



  componentDidMount() {
    this.getRoleList();
  }

  getRoleList(){
    const params={
      pageSize:10000
    };
    fetchPost('/admin/role/list',params).then(json=>{
      const roleList=[];
      json.vo.records.map((list)=>{
        roleList.push({
          value:list.id,
          name:list.roleName
        })
      });
      this.setState({
        roleList:roleList
      },()=>{
        const defaultRoleIds=[];
        this.state.params.roleIds.map((id)=>{
          defaultRoleIds.push(id.toString())
        });
        this.setState({
          defaultRoleIds:defaultRoleIds
        })
      })
    })
  }


  handleSubmit(e) {
    e.preventDefault();
    const {userName, roleIds,tel,email} =  this.props.form.getFieldsValue();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({
          params:{
            ...this.state.params,
            userName:userName,
            roleIds:roleIds,
            tel:tel,
            email:email
          }
        },()=>{
          this.addUser();
        })
      }
    });
  }

  addUser(){
    fetchPost('/admin/user/save',this.state.params).then(json=>{
      if(json.code==0){
        message.success("添加用户成功!");
        this.props.form.resetFields();
      }else{
        message.error(json.msg);
      }
    })
  }


  checkTel =(rule, value, callback) =>{
    if (value && !(/^1[3|4|5|7|8][0-9]{9}$/.test(value)) ) {
      callback('请输入正确的手机号码！');
    } else {
      callback();
    }
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
        <Card title="新建用户">
          <Form horizontal onSubmit={e=>this.handleSubmit(e)}>
            <FormItem label="用户名" {...formItemLayout}>
              {getFieldDecorator('userName',{
                rules: [{ required: true, message: '请输入用户名!' }]
              })(
                <Input placeholder="请输入用户名"/>
              )}
            </FormItem>
            <FormItem label="所属角色" {...formItemLayout}>
              {getFieldDecorator('roleIds',{
                rules: [{ required: true, message: '请选择所属角色!' }]
              })(
                <Select
                  mode="multiple"
                  placeholder="请选择所属角色"

                >
                  {
                    this.state.roleList.map((role)=>{
                      return(<Option key={role.value}>{role.name}</Option>)
                    })
                  }
                </Select>
              )}
            </FormItem>
            <FormItem label="电话号码" {...formItemLayout}>
              {getFieldDecorator('tel',{
                rules: [{ required: true, message: '请输入电话号码!' },
                  { validator: this.checkTel}]

              })(
                <Input placeholder="请输入电话号码"/>
              )}
            </FormItem>
            <FormItem label="邮箱" {...formItemLayout}>
              {getFieldDecorator('email',{
                rules: [{
                  type: 'email', message: '邮箱格式不正确！',
                }]
              })(
                <Input placeholder="请输入邮箱"/>
              )}
            </FormItem>
            <FormItem  wrapperCol={{span: 12, offset: 8}}>
              <Button type="primary" htmlType="submit">添加用户</Button>
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


