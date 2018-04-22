import React, {Component, PropTypes} from 'react'
import Styles from './Index.less';
import {fetchPost} from '../../../../utils/request'
import {Table, Popconfirm, message} from 'antd'


class UserList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      list: [],
      page: {
        totalCash: null,
        totalPages: 1,
        totalRecords: 10
      },
      listParams: {
        userId: null,
        pageNo: 1
      }
    }
  }


  componentWillReceiveProps(props) {
    if (props.activeId == null) {
      this.setState({
        list: [],
        page: {
          totalPages:  null ,
          totalRecords: null
        }
      });
    }
    if (props.activeId != null) {
      if (props.activeId != this.state.listParams.userId) {
        this.setState({
          listParams: {
            userId: props.activeId.userId,
            pageNo: 1
          }
        }, () => {
          if (props.activeId.userId != null) {
            this.getData();
          }
        })
      }
    }
  }


  getData() {
    fetchPost('/admin/userlist/find/orderinfo', this.state.listParams).then(json => {
      this.setState({
        list: json.vo == null ? [] : json.vo.records,
        page: {
          totalPages: json.vo == null ? "" : json.vo.totalPages,
          totalRecords: json.vo == null ? "" : json.vo.totalRecords
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
  }


  render() {


    const self = this;

    const pagination = {
      current: this.state.listParams.pageNo,
      total: this.state.page.totalRecords,
      pageSize: this.state.listParams.pageSize,
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
        title: '生成时间',
        dataIndex: 'orderTimeString',
        key: 'orderTimeString',
        width: 130,
      },
      {
        title: '订单号',
        dataIndex: 'orderNo',
        key: 'orderNo',
        width: 130,
      },
      {
        title: '贷款金额',
        dataIndex: 'amount',
        key: 'amount',
        width: 100,
      }, {
        title: '分期次数',
        dataIndex: 'numberStagesString',
        key: 'numberStagesString',
        width: 100,
      }, {
        title: '渠道来源',
        dataIndex: 'channel',
        key: 'channel',
        width: "100px"
      }, {
        title: '借款机构',
        dataIndex: 'bank',
        key: 'bank',
        width: 100,
      }, {
        title: '绑定贷款银行卡',
        dataIndex: 'bankCard',
        key: 'bankCard',
        width: 100,
      }, {
        title: '银行',
        dataIndex: 'openBank',
        key: 'openBank',
        width: 100,
      }, {
        title: '绑卡状态',
        dataIndex: 'bindStatus',
        key: 'bindStatus',
        width: 100,
        render: (text, record) => (
          <div>
            <span>{record.bindStatus!=null?record.bindStatus!=0?record.bindStatus>1?record.bindStatus>2?'绑卡中':'失败':'成功':'':''}</span>
          </div>
        )
      }, {
        title: '绑卡原因',
        dataIndex: 'failReason',
        key: 'failReason',
        width: 100,
      }, {
        title: '状态',
        dataIndex: 'statue',
        key: 'statue',
        width: 100,
        render: (text, record) => (
          <div>
            <span>{record.statusShow}</span>
          </div>
        )
      },
      {
        title: '紧急联系人/号码',
        dataIndex: 'connectNameAndMobile',
        key: 'connectNameAndMobile',
        width: 300,
      }
    ];

    return (
      <div>
        <Table bordered pagination={pagination} key="id" rowKey="id" columns={columns} dataSource={this.state.list}
               title={() => '贷款订单列表'}
               size="middle"
               scroll={{x: '130%', y: 480}}
        />
      </div>
    );
  }
}

export default UserList
