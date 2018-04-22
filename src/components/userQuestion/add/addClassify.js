import React, { Component, PropTypes } from 'react'
import Styles from './Index.less';
import {Card,Form,Input,Button,message,InputNumber,Select,Icon,DatePicker, Tabs, Table, Checkbox, Popconfirm} from 'antd'
import {fetchPost} from '../../../utils/request'
import {history, origin} from '../../../utils/config'
const FormItem = Form.Item;
const Option = Select.Option;
const TabPane = Tabs.TabPane;
class Index extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      params: {
        categoryName: null,
        skipUrl: null,
        basicParams: [],
        advanceParams: []
      },
      param: {
        orderId: null,
        hasChosen: null,
        questionKey: null,
        questionValue: null
      },
      selectedRowKeys: [],
      selectedRowKeysUp: [],
      questionBase:[],
      questionUpdate:[]
    }
  }

  componentDidMount() {
    if(this.props.location.state!=null){
      this.setState({
        questionBase: this.props.location.state.questionList,
        questionUpdate: this.props.location.state.questionList
      })
      let basicParams = [];
      let advanceParams = [];
      this.props.location.state.questionList.map(function (t) {
        let param = {};
        let paramUp = {};
        param.hasChosen = 0;
        param.orderId = 0;
        param.questionKey = t.questionKey;
        param.questionValue = t.question;
        paramUp.hasChosen = 0;
        paramUp.orderId = 0;
        paramUp.questionKey = t.questionKey;
        paramUp.questionValue = t.question;
        basicParams.push(param);
        advanceParams.push(paramUp);
      })
      this.setState({
        params: {
          ...this.state.params,
          basicParams: basicParams,
          advanceParams: advanceParams
        }
      })
    }
  }
  state = {
    selectedRowKeys: [],
    selectedRowKeysUp: []
  };
  returnBack() {
    history.push({
      pathname: "youjieoperation/userQuestion/list"
    })
  }

  changeOrder(e, record) {
    this.state.params.basicParams.map(function (t) {
      if (t.questionKey === record.questionKey) {
        t.orderId = e.target.value;
      }
    })
  }
  changeOrderUp(e, record) {
    this.state.params.advanceParams.map(function (t) {
      if (t.questionKey === record.questionKey) {
        t.orderId = e.target.value;
      }
    })
  }

  addCategoryName(e) {
    this.setState({
      params: {
        ...this.state.params,
        categoryName: e.target.value
      }
    })
  }
  addSkipUrl(e) {
    this.setState({
      params: {
        ...this.state.params,
        skipUrl: e.target.value
      }
    })
  }

  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({selectedRowKeys});
  }
  onSelectChangeUp = (selectedRowKeysUp) => {
    console.log('selectedRowKeysUp changed: ', selectedRowKeysUp);
    this.setState({selectedRowKeysUp});
  }

  handleSubmit() {

    let params = this.state.params;
    let selectedRowKeys = this.state.selectedRowKeys;
    let selectedRowKeysUp = this.state.selectedRowKeysUp;
    params.basicParams.map(function (t) {
      selectedRowKeys.map(function (e) {
        if (t.questionKey === e) {
          t.hasChosen = 1;
        }
      })
    })
    params.advanceParams.map(function (t) {
      selectedRowKeysUp.map(function (e) {
        if (t.questionKey === e) {
          t.hasChosen = 1;
        }
      })
    })
    if (params.categoryName == null || params.skipUrl == null) {
      message.error("请输入所需参数");
      return;
    }
    fetchPost("/admin/activity/userinfo/category/add", params).then(json=>{
      if (json.code == 0) {
        history.push({
          pathname: "youjieoperation/userQuestion/list"
        })
      } else {
        message.error(json.msg);
      }
    });

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

    const {selectedRowKeys} = this.state;
    const {selectedRowKeysUp} = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      getCheckboxProps: record => ({
      }),
    };
    const rowSelectionUp = {
      selectedRowKeysUp,
      onChange: this.onSelectChangeUp,
      getCheckboxProps: record => ({
      }),
    };
    const columnsFiled = [
      {
        title: '排序',
        dataIndex: '',
        key: '',
        render: (text, record) => {
          return(
            <InputNumber min={0} defaultValue={0} onBlur={(e)=>{
              this.changeOrder(e, record)
            }}/>
          )
        }
      }, {
        title: '字段名称',
        dataIndex: 'question',
        key: 'question'
      }
    ];
    const columnsFiledUp = [
      {
        title: '排序',
        dataIndex: '',
        key: '',
        render: (text, record) => {
          return(
            <InputNumber min={0} defaultValue={0} onBlur={(e)=>{
              this.changeOrderUp(e, record)
            }}/>
          )
        }
      }, {
        title: '字段名称',
        dataIndex: 'question',
        key: 'question'
      }
    ];
    return (
      <div>
        <Card title="新增分类">
          <Form horizontal>
            <FormItem label="分类名称" {...formItemLayout}>
              {getFieldDecorator('modelName',{
                rules: [{ required: true, message: '请输入分类名称!' }]
              })(
                <Input placeholder="请输入分类名称" onBlur={(e) => {
                  this.addCategoryName(e)
                }}/>
              )}
            </FormItem>
            <FormItem  label="跳转地址" {...formItemLayout}>
              {getFieldDecorator('version',{
                rules: [
                  { required: true, message: '请输入跳转地址!' }
                ]
              })(
                <Input placeholder="请输入跳转地址" onBlur={(e) => {
                  this.addSkipUrl(e)
                }}/>

              )}
            </FormItem>
            <FormItem label="选择字段" {...formItemLayout}>
              {getFieldDecorator('remark')(
                <Tabs defaultActiveKey="1">
                  <TabPane tab="基本信息类" key="1">
                    <Table size="middle" bordered pagination={false} key="questionKey" rowKey="questionKey" rowSelection={rowSelection} columns={columnsFiled} dataSource={this.state.questionBase}/>
                  </TabPane>
                  <TabPane tab="提升信息类" key="2">
                    <Table size="middle" bordered pagination={false} key="questionKey" rowKey="questionKey" rowSelection={rowSelectionUp} columns={columnsFiledUp} dataSource={this.state.questionUpdate}/>
                  </TabPane>
                </Tabs>
              )}
            </FormItem>
            <FormItem  wrapperCol={{span: 12, offset: 8}}>
              <Popconfirm title="确定要取消吗？" onConfirm={() => {this.returnBack()}} >
              <Button type="ghost">取消</Button>
              </Popconfirm>
              &nbsp;
              <Popconfirm title="确定要保存吗？" onConfirm={() => {this.handleSubmit()}} >
                <Button type="primary">
                  保存
                </Button>
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


