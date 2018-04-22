import React, {Component, PropTypes} from 'react'
import {Table, Popconfirm, message, Modal, Form, Radio, Input, Button} from 'antd'

const FormItem = Form.Item;
import {fetchPost} from '../../utils/request'

class MethodList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      responseList: [],
      list: [],
      visible: null,
      chooseVisible: null,
      editVisible: null,
      response: null,
      id: null,
      info: null,
      shortmessageVisible: null,
      shortmessage: null,
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
        })
      }
    }
  }

  getData() {
    fetchPost("/third/methodList", this.state.params).then(json => {
      this.setState({
        list: json.voList
      })
    })
  }

  changeStatus(id, status) {
    const params = {
      id: id,
      status: status
    };
    fetchPost("/mock/changeStatus", params).then(json => {
      if (json.code == 0) {
        message.success("更改成功");
        this.getData();
      }
    })
  }

  retry(method, companyId) {
    const params = {
      method: method,
      companyId: companyId
    };
    fetchPost("/admin/third_test/retry", params).then(json => {
      message.warn(json.msg);
      this.getData();
    });
  }

  shortmessage(companyId) {
    this.setState({
      shortmessageVisible: true,
      companyId: companyId
    });
  }

  onshortMessageCancel() {
    this.setState({
      shortmessageVisible: false
    });
    this.props.form.resetFields();
  }
  
  onOk(e) {
    const {responseStr} = this.props.form.getFieldsValue();
    const params = {
      id: this.state.id,
      companyId: this.state.params.companyId,
      method: this.state.params.method,
      info: this.state.info,
      response: responseStr
    };
    fetchPost("/mock/saveResponse", params).then(json => {
      if (json.code == 0) {
        message.success("新增成功！");
        this.props.form.resetFields();
        this.setState({
          visible: false
        });
        this.getData();
      }
    })
  }

  shortMessageOk(e) {
    const {shortmessage} = this.props.form.getFieldsValue();
    const params = {
      shortmessage: shortmessage,
      companyId: this.state.companyId
    }

    fetchPost("/admin/automationtest/shortmessage", params).then(json => {
      this.setState({
        shortmessageVisible: false
      });
      this.getData();
    })
  }

  startTest() {
    const params = {
      companyId: this.state.params.companyId
    };
    fetchPost("/shandianzhouzhuan_test/submit", params).then(json => {
      if (json.code == 0) {
        message.success("流程结束！");
        this.getData();
      }
    });
  }

  initialization() {
    const params = {
      companyId: this.state.params.companyId
    };
    fetchPost("/admin/third_test/initialization", params).then(json => {
      if (json.code == 0) {
        message.success("初始化成功！");
        this.getData();
      }
    });
  }

  render() {
    const {getFieldDecorator} = this.props.form;
    const columns = [
      {
        title: 'orderNo',
        dataIndex: 'orderNo',
        key: 'orderNo',
        width: '85px'
      },
      {
        title: 'method',
        dataIndex: 'method',
        key: 'method',
        width: '85px'
      },
      {
        title: 'info',
        dataIndex: 'info',
        key: 'info',
        width: '85px'
      },
      {
        title: 'response',
        dataIndex: 'response',
        key: 'response',
        width: '85px'
      },
      {
        title: '是否通过',
        width: '85px',
        render: (text, record) => {
          if (record.status == 0) {
            return "未通过"
          } else {
            return '通过'
          }
        }
      }, {
        title: '操作',
        width: '100px',
        render: (text, record) => {
          if (record.status == 0) {
            return <a onClick={(e) => {
              this.retry(record.method, record.companyId)
            }}>重试</a>
          } else {
            return ''
          }
        }
      }, {
        title: '验证码',
        width: '100px',
        render: (text, record) => {
          if (record.method == "authcode_bindcard") {
            return <a onClick={(e) => {
              this.shortmessage(record.companyId)
            }}>输入验证码</a>
          } else {
            return ''
          }
        }
      }
    ];
    return (
      <div>
        <div>
          <Button type="primary" onClick={(e) => {
            this.initialization(e)
          }}>初始化</Button>
          &nbsp;
          <Button type="primary" onClick={(e) => {
            this.startTest()
          }}>开始全流程</Button>

        </div>
        <div>
          <Table size="middle" bordered pagination={false} key="id" rowKey="id" columns={columns}
                 dataSource={this.state.list}
          />
        </div>
        <div>
          <Modal onOk={(e) => {
            this.shortMessageOk(e)
          }} onCancel={(e) => {
            this.onshortMessageCancel(e)
          }} okText="保存" cancelText="取消" visible={this.state.shortmessageVisible} title="验证码">
            <div>
              <Form>
                <FormItem label="验证码">
                  {getFieldDecorator('shortmessage', {
                    rules: [{required: true, message: '请输入验证码!'}],
                    initialValue: this.state.shortmessage
                  })(
                    <Input placeholder="请输入验证码"/>
                  )}
                </FormItem>
              </Form>
            </div>
          </Modal>
        </div>
      </div>
    );
  }
}

MethodList = Form.create()(MethodList);
export default MethodList


