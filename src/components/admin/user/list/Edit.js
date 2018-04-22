import React, { Component, PropTypes } from 'react'
import Styles from './Index.less';
import {Card,Form,Input,Button,message,Icon,Popconfirm,Select} from 'antd'
import {fetchPost} from '../../../../utils/request'
const Option = Select.Option;
const FormItem = Form.Item;

class Edit extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      params:{
        id:0,
        userName:"",
        tel:"",
        roleIds:[],
        email:""
      },
      roleList:[],
      defaultRoleIds:[]
    }
  }



  componentWillReceiveProps(props) {
    if(props.activeItem!=null){
      if(props.activeItem.id!=this.state.params.id){
        this.setState({
          params:{
            ...this.state.params,
            id:props.activeItem.id,
            userName:props.activeItem.userName,
            tel:props.activeItem.tel,
            roleIds:props.activeItem.roleIds,
            email:props.activeItem.email
          }
        },()=>{
            const defaultRoleIds=[];
            this.state.params.roleIds.map((id)=>{
              defaultRoleIds.push(id.toString())
            });
            this.setState({
            defaultRoleIds:defaultRoleIds
          })
        })
      }
    }
    if(JSON.stringify(this.state.roleList.length)!=JSON.stringify(props.roleList)){
      this.setState({
        roleList:props.roleList
      })
    }
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
           this.updateUser();
        })
      }
    });
  }

  updateUser(){
    fetchPost('/admin/user/save',this.state.params).then(json=>{
      if(json.code==0){
        message.success("更新用户成功!");
        this.props.updateList();
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


  deleteUser(e){
    let params={
      id:this.state.params.id
    };
    fetchPost('/admin/user/delete',params).then(json=>{
      if(json.code==0){
        message.success("删除用户成功!");
        this.props.updateList();
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

  updatePassword(){
    let params={
      id:this.state.params.id
    };
    fetchPost('/admin/user/resetpassword',params).then(json=>{
      if(json.code==0){
        message.success("重置密码成功!");
        this.props.updateList();
        this.props.form.resetFields();
      }else{
        message.error(json.msg);
      }
    })
  }

  render() {

    const { getFieldDecorator } = this.props.form;

    return (
      <div>
        <Card title="更新用户">
          <Form onSubmit={e=>this.handleSubmit(e)}>
            <FormItem label="用户名">
              {getFieldDecorator('userName',{
                rules: [{ required: true, message: '请输入用户名!' }],
                initialValue:this.state.params.userName
              })(
                <Input placeholder="请输入角色名称"/>
              )}
            </FormItem>
            <FormItem label="所属角色">
              {getFieldDecorator('roleIds',{
                rules: [{ required: true, message: '请选择所属角色!' }],
                initialValue:this.state.defaultRoleIds
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
            <FormItem label="电话号码">
              {getFieldDecorator('tel',{
                rules: [{ required: true, message: '请输入电话号码!' },
                  { validator: this.checkTel}],
                initialValue:this.state.params.tel
              })(
                <Input placeholder="请输入角色名称"/>
              )}
            </FormItem>
            <FormItem label="邮箱">
              {getFieldDecorator('email',{
                initialValue:this.state.params.email,
                rules: [{
                  type: 'email', message: '邮箱格式不正确！',
                }]
              })(
                <Input placeholder="请输入邮箱"/>
              )}
            </FormItem>
            <Button type="primary" htmlType="submit">更新用户</Button>
            &nbsp;
            <Button type="ghost"  onClick={(e) => this.updatePassword(e)}>重置密码</Button>
            &nbsp;
            <Button type="ghost" onClick={(e) => this.handleReset(e)}><Icon type="reload"/></Button>
            &nbsp;
            <Popconfirm title="确认删除？" okText="Yes" cancelText="No" onConfirm={ (e)=>{this.deleteUser(e)}}>
              <Button type="danger"><Icon type="delete"/></Button>
            </Popconfirm>
          </Form>
        </Card>
      </div>
    );
  }
}

Edit = Form.create()(Edit);

export default Edit


