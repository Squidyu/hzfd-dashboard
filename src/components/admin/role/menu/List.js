import React, { Component, PropTypes } from 'react'
import Styles from './Index.less';
import {Table} from 'antd'
import {fetchPost} from '../../../../utils/request'


class List extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      list:[],
      page:{
        totalCash:null,
        totalPages:1,
        totalRecords:10
      },
      listParams:{
        roleName:"",
        pageNo:1
      },
      activeId:null,
      activeItem:null
    }
  }

  componentDidMount(){
    this.getData();
  }

  getData(){
    fetchPost('/admin/role/list',this.state.listParams).then(json=>{
      this.setState({
        list:json.vo.records,
        page:{
          totalCash:json.vo.totalCash,
          totalPages:json.vo.totalPages,
          totalRecords:json.vo.totalRecords
        }
      },()=>{
        if(this.state.list.length>0){
          this.setState({
            activeId:json.vo.records[0].id,
            activeItem:json.vo.records[0]
          },()=>{
            this.props.changeClickRow(this.state.activeItem);
          })
        }else{
          this.setState({
            activeId:null,
            activeItem:null
          },()=>{
            this.props.changeClickRow(this.state.activeItem);
          })
        }
      })
    })
  }


  componentWillReceiveProps(props) {
    if(this.state.listParams.roleName!=props.listParams.roleName){
      this.setState({
        listParams:{
          ...this.state.listParams,
          roleName:props.listParams.roleName,
          pageNo:1
        }
      },()=>{
        this.getData();
      })
    }
  }

  nextPage(current){
    this.setState({
      listParams:{
        ...this.state.listParams,
        pageNo:current
      }
    },()=>{
      this.getData();
    })
  }

  handleClickRow(records){
    this.setState({
      activeId:records.id,
      activeItem:records
    },()=>{
      this.props.changeClickRow(this.state.activeItem)
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

    const self=this;

    const pagination = {
      current:this.state.listParams.pageNo,
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

    const columns=[
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        width:'60px'
      },
      {
        title: '名称',
        dataIndex: 'roleName',
        key: 'roleName',
        width:"250px"
      },
      {
        title: '描述',
        dataIndex: 'remark',
        key: 'remark'
      }
    ];

    return (
        <div>
          <Table size="middle" bordered pagination={pagination} key="id" rowKey="id" columns={columns} dataSource={this.state.list}
                 onRowClick={(records) => this.handleClickRow(records)}
                 rowClassName={(records) => this.handleChosedRow(records.id)}
          />
        </div>
    );
  }
}


export default List


