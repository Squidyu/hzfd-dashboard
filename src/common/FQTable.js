import React, {Component, PropTypes} from 'react'
import assign from 'object.assign'

import {Row, Col, Form, message, Table} from 'antd'
import {fetchCall} from '../utils/request'
/**
 * 封装antd table 让上层写更少的代码
 * searchParams：查询条件
 * pagination：是否分页 true，false ，默认分页
 * 其他原生 antd参数可直接传入使用
 */

class   FQTable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      list: [],
      page: {
        totalCash: null,
        totalPages: 1,
        totalRecords: 10,
      },
      isPage: true,
      listParams: {
        pageNo: 1,
      }
    }
  }

  componentWillMount() {

  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    let params = {
      pageNo: this.state.listParams.pageNo
    }
    if (this.props.searchParams) {
      params = assign({}, this.props.searchParams)
    }
    if (typeof(this.props.pagination) != 'undefined' && !this.props.pagination) {
      this.setState({
        isPage: false
      })
    }
    fetchCall(this.props.url, params).then(json => {
      if (json.code == 0) {
        if (this.state.isPage) {
          this.setState({
            list: json.vo.records,
            page: {
              ...this.state.page,
              totalCash: json.vo.totalRecords,
              totalRecords: json.vo.totalRecords,
              totalPages: json.vo.totalPages
            }
          })
        } else {
          this.setState({
            list: json.voList
          })
        }

      } else {
        message.error(json)
      }
    })

    return this.state.list;
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

  /**
   * 刷新
   */
  fresh() {
    this.getData()
  }

  render() {
    const self = this;
    const pagination = {
      current: this.state.listParams.pageNo,
      total: this.state.page.totalRecords,
      pageSize: this.state.listParams.pageSize,
      showSizeChanger: false,
      showQuickJumper: true,
      showTotal(total){
        return `总共 ${total} 条`;
      },
      onChange(current) {
        self.nextPage(current)
      }
    };
    return (
      <div>
        <Table bordered pagination={this.state.isPage ? pagination : false} key="table"
               rowKey={this.props.rowKey ? this.props.rowKey : "id"}
               columns={this.props.columns}
               dataSource={this.state.list}
               size="middle"
               {...this.props}/>
      </div>
    );
  }
}
export default FQTable


