import React, { Component, PropTypes } from 'react'
import Styles from './Index.less';
import {Table} from 'antd'

class LastMenuList extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      data:[],
      list:[],
      activeId:null,
      activeItem:null
    }
  }


  componentWillReceiveProps(props) {
    if(props.list!=null) {
      if (JSON.stringify(props.list)!=JSON.stringify(this.state.data)) {
        this.setState({
          data: props.list
        }, () => {
          let list = [];
          this.state.data.map((data, index) => {
            if(data.type != 3){
              list.push({
                index: index,
                key: data.key,
                value: data.value,
                url: data.url
              })
            }
          });
          if(list.length > 0){
            this.setState({
              list: list,
              activeId: list[0].key,
              activeItem: list[0]
            })
          }
        })
      }
    }else {
      this.setState({
        data:[],
        list:[],
        activeId:null,
        activeItem:null
      })
    }
  }


  handleClickRow(record) {
    this.setState({
      activeId: record.key,
      activeItem:record,
    },()=>{
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


  render() {
    const columns = [{
      title: 'ID',
      dataIndex: 'key',
      key: 'key',
      width:"80px"
    }, {
      title: '名称',
      dataIndex: 'value',
      key: 'value'
    }];
    return (
      <div>
        <Table
          pagination={false}
          bordered
          title={() => '三级菜单'}
          size="small"
          columns={columns}
          dataSource={this.state.list}
          key="key"
          rowKey="key"
          onRowClick={(record) => this.handleClickRow(record)}
          rowClassName={(record) => this.handleChosedRow(record.key)}
        />
      </div>
    );
  }
}


export default LastMenuList


