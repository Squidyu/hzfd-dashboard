import React, {Component, PropTypes} from 'react'
import Styles from './Index.less';
import {fetchPost} from '../../../../utils/request'
import {Table, message, Popconfirm, Row, Icon, Col, Form, Button, Input} from 'antd'

const FormItem = Form.Item;


class Index extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      list: [],
      page: {
        totalCash: null,
        totalPages: 1,
        totalRecords: 10
      },
      params: {
        mobile: "",
        channel: "",
        pageNo: 1,
      },
      activeId: null,
      activeItem: null,
      mobile1: "",
      channel1: "",
    }
  }

  componentDidMount() {
    //  this.getData();
  }

  getData() {
    //admin/borrow/product/promisemenulist
    fetchPost('/admin/userlist/list', this.state.params).then(json => {
      this.setState({
        list: json.vo == null ? [] : json.vo.records,
        page: {

          totalPages: json.vo.totalPages,
          totalRecords: json.vo.totalRecords
        }
      }, () => {
        if (this.state.list.length > 0) {
          this.setState({
            activeId: json.vo.records[0].userId,
            activeItem: json.vo.records[0]
          }, () => {
            this.props.changeActiveItem(this.state.activeId)
          })
        } else {
          this.setState({
            activeId: 0,
            activeItem: null
          }, () => {
            this.props.changeActiveItem(this.state.activeId)
          })
        }

      })
    })
  }

  nextPage(current) {
    this.setState({
      listParams: {
        ...this.state.listParams,
        pageNo: current
      }
    }, () => {
      this.getData();
    })
    this.props.pageChange(null);
  }

  handleClickRow(record) {
    this.setState({
      activeId: record.userId,
      activeItem: record,
    }, () => {
      this.props.changeActiveItem(record)
    })

  }

  handleChosedRow(itemId) {
    if (itemId == this.state.activeId) {
      return Styles.active;
    } else {
      return "";
    }
  }

  groupSearch(e) {
    e.preventDefault();
    const {mobile1} = this.props.form.getFieldsValue();
    if (mobile1 == "" || typeof(mobile1) == "undefined") {
      message.error("请输入搜索条件！");
    } else {
      this.setState({
        params: {
          mobile: mobile1,
          pageNo: 1
        }
      }, () => {
        this.getData();
      })
    }

  }

  findAll(e) {
    e.preventDefault();
    this.props.form.resetFields();
    this.setState({
      params: {
        mobile: "",
        pageNo: 1
      },
      list: []
    }),
      this.setState({
        activeId: null,
      }, () => {
        this.props.changeActiveItem(null)
      })
  }

  render() {

    const self = this;

    const {getFieldDecorator} = self.props.form;
    const formItemLayout = {
      labelCol: {span: 6},
      wrapperCol: {span: 16},
    };
    const pagination = {
      current: this.state.params.pageNo,
      total: this.state.page.totalRecords,
      pageSize: this.state.params.pageSize,
      showSizeChanger: false,
      showQuickJumper: true,
      showTotal(total) {
        return `总共 ${total} 条`;
      },
      onChange(current) {
        self.nextPage(current)
      }
    };

    const columns = [
      {
        title: '昵称',
        dataIndex: 'nickName',
        key: 'nickName',
      },
      {
        title: '手机',
        dataIndex: 'mobile',
        key: 'mobile',
      },
      {
        title: '注册时间',
        dataIndex: 'gmtCreateString',
        key: 'gmtCreateString',
      },
      {
        title: '渠道',
        dataIndex: 'channel',
        key: 'channel',
      },
      ,
    ];

    return (
      <div>
        <Row>
          <Col span={22}>
            <Form layout="inline">
              <FormItem label="电话" className={Styles.item}>
                {getFieldDecorator('mobile1')(
                  <Input style={{width: 130}}/>
                )}
              </FormItem>

              <FormItem className={Styles.item}>
                <Button type='primary' icon='search' onClick={(e) => {
                  this.groupSearch(e)
                }} style={{"marginRight": 20}}>筛选</Button>
                <Button type='primary' onClick={(e) => {
                  this.findAll(e)
                }} style={{"marginRight": 20}}><Icon type="reload"/></Button>
              </FormItem>
            </Form>
          </Col>
        </Row>
        <Table bordered pagination={pagination} key="userId" rowKey="userId" columns={columns}
               dataSource={this.state.list}
               onRowClick={(record) => this.handleClickRow(record)}
               rowClassName={(record) => this.handleChosedRow(record.userId)}
               title={() => '用户列表'}
               size="small"
        />
      </div>
    );
  }
}

Index = Form.create()(Index);
export default Index


