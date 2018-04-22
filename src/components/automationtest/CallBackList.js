import React, {Component, PropTypes} from 'react'
import {Table, Popconfirm, message, Modal, Form, Radio, Input, Button} from 'antd'
const FormItem = Form.Item;
import {fetchPost} from '../../utils/request'
import Styles from './Index.less';
class CallBackList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      callBackResultList: [],
      callBackResultVisible: null,
      requestList: [],
      list: [],
      visible: null,
      chooseVisible: null,
      editVisible: null,
      request: null,
      id: null,
      info: null,
      params: {
        companyId: null,
        method: null
      },
    }
  }

  componentWillReceiveProps(props) {
    if (props.activeCompanyId != null) {
      if (props.activeCompanyId != this.state.params.companyId) {
        this.setState({
          params: {
            ...this.state.params,
            companyId: props.activeCompanyId,
          },
        }, () => {
          this.getData();
        });
      }
    }
  }

  getData() {
    fetchPost("/mock/callBackList", this.state.params).then(json => {
      this.setState({
        list: json.voList
      })
    })
  }

  showModal(record) {
    this.setState({
      visible: true,
      request: record.request,
      id: record.id,
      info: record.info,
      // companyId:record.companyId,
    });
    this.state.params.method = record.method;
  }

  editRequest(record) {
    this.setState({
      editVisible: true,
      request: record.request,
      id: record.id,
    });
  }

  getRequestList() {
    fetchPost("/mock/requestList", this.state.params).then(json => {
      this.setState({
        requestList: json.voList
      })
    })
  }

  chooseRequest(record) {
    this.setState({
      info: record.info,
      // companyId:record.companyId,
    });
    this.state.params.method = record.method;
    this.getRequestList();
    this.setState({
      chooseVisible: true,
      request: record.request,
      id: record.id
    })
  }

  changeRequest(record) {
    const params = {
      id: this.state.id,
      request: record.request
    };
    fetchPost("/mock/chooseRequest", params).then(json => {
      if (json.code == 0) {
        message.success("更改成功！");
        this.setState({
          chooseVisible: false
        });
        this.getData();
      }
    })
  }

  onCancel() {
    this.setState({
      visible: false
    });
    this.props.form.resetFields();
  }

  onChooseCancel() {
    this.setState({
      chooseVisible: false
    });
    this.props.form.resetFields();
  }

  onResultCancel() {
    this.setState({
      callBackResultVisible: false
    });
    this.props.form.resetFields();
  }

  onOk(e) {
    const {requestStr} = this.props.form.getFieldsValue();
    const params = {
      id: this.state.id,
      companyId: this.state.params.companyId,
      method: this.state.params.method,
      info: this.state.info,
      request: requestStr
    }
    fetchPost("/mock/saveRequest", params).then(json => {
      if (json.code == 0) {
        message.success("新增成功！");
        this.props.form.resetFields();
        this.setState({
          visible: false
        })
        this.getData();
      }
    })
  }

  deleteRequest(id) {
    const params = {
      id: id
    }
    fetchPost("/mock/deleteRequest", params).then(json => {
      if (json.code == 0) {
        message.success("删除成功！");
        this.getRequestList();
      }
    })
  }

  callBack(record) {
    const params = {
      companyId: this.state.params.companyId,
      method: record.method,
      request: record.request
    }
    fetchPost("/mock/callBackTest", params).then(json => {
      if (json.code == 0) {
        this.setState({
          callBackResultList: json.voList,
          callBackResultVisible: true
        })
      }
    })
  }

  onEditCancel(e) {
    this.setState({
      editVisible: false
    });
    this.props.form.resetFields();
  }

  onEditOk() {
    const {requestEdit} = this.props.form.getFieldsValue();
    const params = {
      id: this.state.id,
      request: requestEdit
    };
    fetchPost("/mock/editRequest", params).then(json => {
      if (json.code == 0) {
        message.success("编辑成功！");
        this.props.form.resetFields();
        this.setState({
          editVisible: false
        });
        this.getData();
      }
    })
  }

  render() {
    const {getFieldDecorator} = this.props.form;
    const columns = [
      {
        title: 'id',
        dataIndex: 'id',
        key: 'id',
        width: '50px'
      },
      {
        title: 'method',
        dataIndex: 'method',
        key: 'method',
        width: '100px'
      },
      {
        title: 'info',
        dataIndex: 'info',
        key: 'info',
        width: '50px'
      },
      {
        title: 'request',
        dataIndex: 'request',
        key: 'request'
      },
      {
        title: '更改request',
        width: '100px',
        render: (text, record, index) => (
          <div>
            &nbsp;
            <a onClick={(e) => {
              this.showModal(record)
            }}>新增</a>
            &nbsp;
            <a onClick={(e) => {
              this.editRequest(record)
            }}>编辑</a>
            &nbsp;
            <a onClick={(e) => {
              this.chooseRequest(record)
            }}>选择</a>
          </div>
        )
      },
      {
        title: '回调测试',
        width: '90px',
        render: (text, record, index) => (
          <div>
            <Button type="primary" size="small" onClick={(e) => {
              this.callBack(record)
            }}>回调</Button>
          </div>
        )
      }
    ];

    const requestColumns = [
      {
        title: 'id',
        dataIndex: 'id',
        key: 'id',
        width: '50px'
      },
      {
        title: 'method',
        dataIndex: 'method',
        key: 'method',
        width: '100px'
      },
      {
        title: 'info',
        dataIndex: 'info',
        key: 'info',
        width: '50px'
      },
      {
        title: 'request',
        dataIndex: 'request',
        key: 'request',

      },
      {
        title: '选择request',
        dataIndex: 'requestChecked',
        key: 'requestChecked',
        width: '100px',
        render: (text, record, index) => (
          <div>
            <a style={{color: "blue"}} onClick={(e) => {
              this.changeRequest(record)
            }}>选择</a>
          </div>
        )
      },
      {
        title: '删除',
        width: '90px',
        render: (text, record, index) => (
          <div>
            <Popconfirm title="确认删除？" okText="Yes" cancelText="No" onConfirm={(e) => {
              this.deleteRequest(record.id)
            }}>
              <a style={{color: "red"}}>删除</a>
            </Popconfirm>
          </div>
        )
      }
    ];
    const resultColumns = [
      {
        dataIndex: 'result',

      }
    ]
    return (
      <div>
        <div>
          <Table size="middle" bordered pagination={false} key="id" rowKey="id" columns={columns}
                 dataSource={this.state.list}
          />
        </div>
        <div>
          <Modal onOk={(e) => {
            this.onOk(e)
          }} onCancel={(e) => {
            this.onCancel(e)
          }} okText="保存" cancelText="取消" visible={this.state.visible} title="新增request">
            <div>
              <Form>
                <FormItem>
                  {getFieldDecorator('requestStr', {
                    rules: [{required: true, message: 'request!'}],
                    initialValue: this.state.request
                  })(
                    <textarea type='text' className={Styles.textarea} id="textarea1"></textarea>
                  )}
                </FormItem>
              </Form>
            </div>
          </Modal>
        </div>
        <div>
          <Modal onOk={(e) => {
            this.onEditOk(e)
          }} onCancel={(e) => {
            this.onEditCancel(e)
          }} okText="确定" cancelText="取消" visible={this.state.editVisible} title="编辑request">
            <div>
              <Form>
                <FormItem>
                  {getFieldDecorator('requestEdit', {
                    rules: [{required: true, message: 'request!'}],
                    initialValue: this.state.request
                  })(
                    <textarea type='text' className={Styles.textarea} id="textarea2"></textarea>
                  )}
                </FormItem>
              </Form>
            </div>
          </Modal>
        </div>
        <div>
          <Modal onCancel={(e) => {
            this.onChooseCancel(e)
          }} visible={this.state.chooseVisible} title="选择request" footer={null} width='1000px'>
            <Table size="middle" bordered pagination={false} key="id" rowKey="id" columns={requestColumns}
                   dataSource={this.state.requestList}
            />
          </Modal>
        </div>
        <div>
          <Modal onCancel={(e) => {
            this.onResultCancel(e)
          }} visible={this.state.callBackResultVisible} title="回调结果" footer={null} width='500px'>
            <Table size="middle" bordered pagination={false} columns={resultColumns}
                   dataSource={this.state.callBackResultList}
            />
          </Modal>
        </div>
      </div>

    );
  }
}

CallBackList = Form.create()(CallBackList);
export default CallBackList


