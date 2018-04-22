import React, { Component, PropTypes } from 'react'
import Styles from './Index.less';
import {Card,Form,Input,Button,message,Icon,Popconfirm} from 'antd'
import {fetchPost} from '../../../../utils/request'

const FormItem = Form.Item;

class Edit extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      params:{
        id:0,
        roleName:"",
        remark:""
      }
    }
  }



  componentWillReceiveProps(props) {
    if(props.activeItem!=null){
      if(props.activeItem.id!=this.state.params.id){
        this.setState({
          params:{
            ...this.state.params,
            id:props.activeItem.id,
            roleName:props.activeItem.roleName,
            remark:props.activeItem.remark
          }
        })

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
            ...this.state.params,
            roleName:roleName,
            remark:remark
          }
        },()=>{
          this.updateRole();
        })
      }
    });
  }

  updateRole(){
    fetchPost('/admin/role/save',this.state.params).then(json=>{
      if(json.code==0){
        message.success("更新角色成功!");
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


  deleteRole(e){
    let params={
      id:this.state.params.id
    };
    fetchPost('/admin/role/delete',params).then(json=>{
      if(json.code==0){
        message.success("删除角色成功!");
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
        <Card title="更新角色">
          <Form onSubmit={e=>this.handleSubmit(e)}>
            <FormItem label="角色名称">
              {getFieldDecorator('roleName',{
                rules: [{ required: true, message: '请输入角色名称!' }],
                initialValue:this.state.params.roleName
              })(
                <Input placeholder="请输入角色名称"/>
              )}
            </FormItem>
            <FormItem label="角色描述">
              {getFieldDecorator('remark',{
                initialValue:this.state.params.remark
              })(
                <Input type="textarea" placeholder="请输入角色描述"/>
              )}
            </FormItem>
            <Button type="primary" htmlType="submit">更新角色</Button>
            &nbsp;
            <Button type="ghost" onClick={(e) => this.handleReset(e)}><Icon type="reload"/></Button>
            &nbsp;
            <Popconfirm title="确认删除？" okText="Yes" cancelText="No" onConfirm={ (e)=>{this.deleteRole(e)}}>
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


