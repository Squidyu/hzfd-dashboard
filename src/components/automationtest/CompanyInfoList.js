import React, {Component, PropTypes} from 'react'
import {Button, InputNumber, Popconfirm, Modal, Form, Input, Select, message, Table, Col, Row, Icon, Card} from 'antd'
import {fetchPost} from '../../utils/request'
import Styles from './Index.less';

class CompanyInfoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      activeItem: null,
      activeCompanyId: null,
      time: null,
      testShow: false
    }
  }

  changeContent(e) {
    this.setState({
      content: e.target.value
    })
  }

  delete(companyId) {
    const params = {
      companyId: companyId
    };
    this.submit(params);
  }

  onCancelTest() {
    this.setState({
      testShow: false
    });
    this.stopTimeOut();
  }

  submit(params) {
    fetchPost("/shandianzhouzhuan_test/submit", params)
  }

  resetOrder(companyId) {
    fetchPost('/third_test/order_rest/' + companyId).then(json => {
    });
  }

  onOk(e) {
    const params = this.state.content;
    fetchPost("/admin/automationtest/shortmessage/" + params).then(json => {
      if (json.code == 0) {
        message.success("添加成功！");
        this.props.form.resetFields();
        this.setState({
          visible: false
        })
        this.getData();
      }
    })
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    fetchPost("/mock/mocklist", this.state.params).then(json => {
      console.log("json", json);
      this.setState({
        list: json.voList
      }, () => {
        if (this.state.list.length > 0) {
          this.setState({
            activeItem: this.state.list[0],
            activeCompanyId: this.state.list[0].companyId
          }, () => {
            this.props.changeActiveCompanyId(this.state.activeCompanyId)
          })
        }
      })
    })
  }

  handleClickRow(records) {
    this.setState({
      activeItem: records,
      activeCompanyId: records.companyId
    }, () => {
      this.props.changeActiveCompanyId(this.state.activeCompanyId)
    })
  }

  handleChosedRow(itemId) {
    if (itemId == this.state.companyId) {
      return Styles.active;
    } else {
      return "";
    }
  }

  render() {
    const columns = [
      {
        title: 'companyId',
        dataIndex: 'companyId',
        key: 'companyId',
        width: '85px'
      },
      {
        title: '公司名称',
        dataIndex: 'companyName',
        key: 'companyName',
        width: '170px'
      },
      {
        title: '产品名称',
        dataIndex: 'productName',
        key: 'productName',
        width: '130px'
      },
      {
        title: '操作', dataIndex: 'opt', key: 'opt', width: "200px", render: (text, record) => (
        <div>
          <a onClick={(e) => {
            this.resetOrder(record.companyId)
          }}>重置订单</a>
        </div>
      )
      }
    ];
    return (
      <div>
        <div>
          <Table size="middle" bordered pagination={false} key="companyId" rowKey="companyId" columns={columns}
                 dataSource={this.state.list}
                 onRowClick={(records) => this.handleClickRow(records)}
                 rowClassName={(records) => this.handleChosedRow(records.companyId)}
          />
        </div>
        <div>
          <Modal visible={this.state.testShow} title="测试数据"
                 width={900}
                 footer={[
                   <div className={Styles.box}>
                     <Input style={{width: 150, marginRight: 10}} placeholder="请输入验证码" value={this.state.content}
                            onChange={(e) => {
                              this.changeContent(e)
                            }}/>
                     <Button type="primary" onClick={(e) => {
                       this.onOk(e)
                     }}>请输入验证码</Button>
                   </div>,
                   <Button key="back" type="primary" size="large" onClick={(e) => {
                     this.onCancelTest(e)
                   }}>取消</Button>
                 ]}
                 style={{height: "800", overflows: scroll}}>
            <div dangerouslySetInnerHTML={{__html: this.state.testData}}>
            </div>
          </Modal>
        </div>
      </div>
    );
  }
}

export default CompanyInfoList

