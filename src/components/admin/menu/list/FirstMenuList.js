import React, { Component, PropTypes } from 'react'
import Styles from './Index.less';
import {Table} from 'antd'

class FirstMenuList extends React.Component {

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
    if(props.list!=null){
      if(JSON.stringify(props.list)!=JSON.stringify(this.state.data)){
        this.setState({
          data:props.list
        },()=>{
          let list=[];
          this.state.data.map((data,index)=>{
            list.push({
              index:index,
              source:data.source,
              key:data.treeNode.key,
              value:data.treeNode.value,
              url:data.treeNode.url
            })
          });
          this.setState({
            list:list,
            activeId:list[0].key,
            activeItem:list[0]
          })
        })
      }
    }else{
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
      title: '子系统编号',
      dataIndex: 'source',
      key: 'source',
      width:"90px"
    },{
      title: '名称',
      dataIndex: 'value',
      key: 'value'
    }];
    return (
        <div>
          <Table
            pagination={false}
            bordered
            title={() => '子系统'}
            size="small"
            columns={columns}
            dataSource={this.state.list}
            key="key"
            rowkey="key"
            onRowClick={(record) => this.handleClickRow(record)}
            rowClassName={(record) => this.handleChosedRow(record.key)}
          />
        </div>
    );
  }
}


export default FirstMenuList


