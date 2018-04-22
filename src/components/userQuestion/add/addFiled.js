import React, { Component, PropTypes } from 'react'
import Styles from './Index.less';
import {Card,Form,Input,Button,message,InputNumber,Select,Icon,DatePicker, Popconfirm, Row, Col} from 'antd'
import {fetchPost} from '../../../utils/request'
import {history, origin} from '../../../utils/config'
const FormItem = Form.Item;
const Option = Select.Option;
class Index extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      length: 0,
      optionData: [],
      params: {
        questionValue: null,
        answersList: []
      }
    }
  }

  returnBack() {
    history.push({
      pathname: "youjieoperation/userQuestion/list"
    })
  }



  handleSubmit() {
    let params = this.state.params;
    let answersList = [];
    this.state.optionData.map(function (t) {
      answersList.push(t.data);
    })
    params.answersList = answersList;
    fetchPost("/admin/activity/userinfo/question/add", params).then(json=>{
      if (json.code == 0) {
        history.push({
          pathname: "youjieoperation/userQuestion/list"
        })
      } else {
        message.error(json.msg);
      }
    });
  }
  nameValue(e) {

    let array = this.state.optionData;
    let tip = Number(e.target.id);
    array.map(function (t) {
      if (t.index == tip) {
        t.data = e.target.value;
      }
    })
    this.setState({
      optionData: array
    })
  }

  deleteOption(e) {
    let array = this.state.optionData;
    let tip = Number(e.target.id);
    let i = 0;
    for (i = 0; i < this.state.optionData.length; i ++) {
      if (this.state.optionData[i].index == tip) {
        break;
      }
    }
    tip = i;
    array.splice(tip, 1);
    this.setState({
      optionData: array
    })
  }

  addLength() {

    let aa = this.state.optionData;
    let option = {};
    let length = this.state.length;
    option.index = length;
    option.data = "";
    length ++;
    aa.push(option);
    this.setState({
      optionData: aa,
      length: length
    })
  }

  handleReset(e) {
    e.preventDefault();
    this.props.form.resetFields();
  }

  nameModel() {
    const {getFieldDecorator} = this.props.form
    const formItemLayout = {
      labelCol: {span: 3},
      wrapperCol: {span: 18},
    };
    let optionData = this.state.optionData;
    return(
      <Form>
        {
          optionData && optionData.map((x) => {
            return(
              <FormItem {...formItemLayout} label={'名称'} style={{fontWeight: 'bold'}}>
              {getFieldDecorator(`${x.index}`, {
                initialValue: x.data,
                })(
                <Input onBlur={(e) => this.nameValue(e)}/>

              )}
              <div style={{position: 'absolute', top: 1, right: '-40px'}}>
                <Button id={`${x.index}`} size={'small'} style={{marginLeft: 6}} onClick={(e) => this.deleteOption(e)}><Icon type="minus"/></Button>
              </div>
              </FormItem>
            )
          })
        }
      </Form>
    )
  }

  addQuestionValue(e) {
    this.setState({
      params: {
        ...this.state.params,
        questionValue: e.target.value
      }
    })
  }

  render() {

    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {span: 8},
      wrapperCol: {span: 8},
    };
    // let content = [];
    // content.push(
    //     <Row>
    //       <Col span={3}><span>名称:</span></Col>
    //       <Col span={16}><Input/></Col>
    //       <Col span={5}><Button id={`${t.index}`} size={'small'} style={{marginLeft: 6}} onClick={(e) => this.deleteOption(e)}><Icon type="minus"/></Button></Col>
    //     </Row>
    // )

    return (
      <div>
        <Card title="新增字段">
          <Form horizontal onSubmit={e=>this.handleSubmit(e)}>
            <FormItem label="字段名称" {...formItemLayout}>
              {getFieldDecorator('questionValue',{
                rules: [{ required: true, message: '请输入字段名称!' }]
              })(
                <Input placeholder="请输入字段名称" onBlur={(e) => {
                  this.addQuestionValue(e)
                }}/>
              )}
            </FormItem>
            <FormItem  label="包含内容" {...formItemLayout}>
              {getFieldDecorator('version',{
                rules: [
                  { required: true, message: '请输入包含内容!' }
                ]
              })(
                <div>
                  {this.nameModel()}
                  <Button type="primary" onClick={() => {
                    this.addLength()
                  }}>添加</Button>
                </div>
              )}
            </FormItem>

            <FormItem  wrapperCol={{span: 12, offset: 8}}>
              <Popconfirm title="确定要取消吗？" onConfirm={() => {this.returnBack()}} >
              <Button type="ghost">取消</Button>
              </Popconfirm>
              &nbsp;
              <Popconfirm title="确定要保存吗？" onConfirm={() => {this.handleSubmit()}} >
                <Button type="primary">保存</Button>
              </Popconfirm>
            </FormItem>
          </Form>
        </Card>
      </div>
    );
  }
}

Index = Form.create()(Index);

export default Index


