import React, { Component, PropTypes } from 'react'
import Styles from './Index.less';
import {Card,Form,Input,Button,message,Icon,Cascader} from 'antd'
import {fetchPost} from '../../../../utils/request'
const FormItem = Form.Item;

class Index extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      params:{
        levelOne:"",
        levelTwo:"",
        levelThree:"",
        name:"",
        url:"",
      },
      levelOptions:[]
    }
  }

  componentDidMount() {
    this.getLevelOptions();
  }


  getLevelOptions(){
    const options=[];
    fetchPost('/admin/menu/list',{}).then(json => {
      if(json.code==0){
        const menuList=json.voList;
        menuList.map((list)=>{
          const children=[];
          if(list.treeNode.children!=null){
            list.treeNode.children.map((chl)=>{
              if(chl.children!=null){
                const subChildren=[];
                chl.children.map((item)=>{
                  subChildren.push({
                    value: item.key,
                    label: item.value,
                  })
                })
                children.push({
                  value: chl.key,
                  label: chl.value,
                  children:subChildren
                })
              }else{
                children.push({
                  value: chl.key,
                  label: chl.value,
                })
              }
            })
          }
          options.push({
            value: list.treeNode.key,
            label: list.treeNode.value,
            children:children
          })
        });

        this.setState({
          levelOptions:options
        },()=>{
          console.log("levelOptions",this.state.levelOptions);
        })
      }
    });

  }

  handleSubmit(e) {
    e.preventDefault();
    const {level,name, url} =  this.props.form.getFieldsValue();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if(typeof level!="undefined"){
          if(level.length==1){
            this.setState({
              params:{
                ...this.state.params,
                levelOne:level[0]
              }
            },()=>{
              this.changeParams(name, url);
            })
          }else{
            if(level.length==2){
              this.setState({
                params:{
                  ...this.state.params,
                  levelOne:level[0],
                  levelTwo:level[1]
                }
              },()=>{
                this.changeParams(name, url);
              })
            }else{
              /*if(level.length==3){}else{}*/
              this.setState({
                params:{
                  ...this.state.params,
                  levelOne:level[0],
                  levelTwo:level[1],
                  levelThree:level[2],
                }
              },()=>{
                this.changeParams(name, url);
              })
            }
          }
        }else{
          this.changeParams(name, url);
        }

      }
    });
  }



  changeParams(name, url){
    this.setState({
      params:{
        ...this.state.params,
        name:name,
        url:url
      }
    },()=>{
      this.addMenu();
    })
  }


  addMenu(){
    fetchPost('/admin/menu/add',this.state.params).then(json=>{
      if(json.code==0){
        message.success("新增菜单成功!");
        this.getLevelOptions();
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
        <Card title="新增菜单">
          <Form layout="horizontal" onSubmit={e=>this.handleSubmit(e)}>
            <FormItem label="所属位置" {...formItemLayout}>
              {getFieldDecorator('level')(
                <Cascader options={this.state.levelOptions} changeOnSelect placeholder="请选择菜单所属位置"/>
              )}
            </FormItem>
            <FormItem label="菜单名称" {...formItemLayout}>
              {getFieldDecorator('name',{
                rules: [{ required: true, message: '请输入菜单名称!' }],
              })(
                <Input placeholder="请输入菜单名称"/>
              )}
            </FormItem>
            <FormItem label="菜单url" {...formItemLayout}>
              {getFieldDecorator('url')(
                <Input type="textarea" placeholder="请输入菜单url"/>
              )}
            </FormItem>
            <FormItem  wrapperCol={{span: 12, offset: 8}}>
              <Button type="primary" htmlType="submit">新建菜单</Button>
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


