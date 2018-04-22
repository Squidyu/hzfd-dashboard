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
        name:"",
        url:""
      }
    }
  }


  componentWillReceiveProps(props) {
    if(props.activeItem!=null){
      if(props.activeItem.key!=this.state.params.id) {
        this.setState({
          params:{
            ...this.state.params,
            id:props.activeItem.key,
            name:props.activeItem.value,
            url:props.activeItem.url
          }
        })
      }
    }
  }


  handleSubmit(e) {
    e.preventDefault();
    const self=this;
    const {name, url} =  this.props.form.getFieldsValue();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        self.setState({
          params:{
            ...this.state.params,
            name:name,
            url:url
          }
        },()=>{
          this.updateMenu();
        })
      }
    });
  }

  updateMenu(){
    fetchPost('/admin/menu/update',this.state.params).then(json=>{
      if(json.code==0){
        message.success("更新菜单成功!");
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


  deleteMenu(e){
    let params={
      id:this.state.params.id
    };
    fetchPost('/admin/menu/delete',params).then(json=>{
      if(json.code==0){
        message.success("删除菜单成功!");
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
          <Card title="更新菜单">
            <Form onSubmit={e=>this.handleSubmit(e)}>
              <FormItem label="菜单名称">
                {getFieldDecorator('name',{
                  rules: [{ required: true, message: '请输入菜单名称!' }],
                  initialValue:this.state.params.name
                })(
                  <Input placeholder="请输入菜单名称"/>
                )}
              </FormItem>
              <FormItem label="菜单url">
                {getFieldDecorator('url',{
                  initialValue:this.state.params.url?this.state.params.url:' '
                })(
                  <Input type="textarea"   placeholder="请输入菜单url"/>
                )}
              </FormItem>
              <Button type="primary" htmlType="submit">更新菜单</Button>
              &nbsp;
              <Button type="ghost" onClick={(e) => this.handleReset(e)}><Icon type="reload"/></Button>
              <Popconfirm  title="确认删除？" okText="Yes" cancelText="No" onConfirm={ (e)=>{this.deleteMenu(e)}}>
                &nbsp;
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


