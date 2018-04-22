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
        userName:"",
        tel:"",
        roleIds:[],
        pageNo:1,
        onlineStatus:''
      },
      activeId:null,
      activeItem:null,
      roleList:[]
    }
  }

  componentDidMount(){
    this.getData();
  }

  getData(){
    fetchPost('/admin/user/list',this.state.listParams).then(json=>{
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
    if(props.listParams.userName!=this.state.listParams.userName||
      props.listParams.tel!=this.state.listParams.tel||
      props.listParams.roleIds.toString()!=this.state.listParams.roleIds.toString()||
      props.listParams.onlineStatus!=this.state.listParams.onlineStatus){
      this.setState({
        listParams:{
          ...this.state.listParams,
          userName:props.listParams.userName,
          tel:props.listParams.tel,
          roleIds:props.listParams.roleIds,
          pageNo:1,
          onlineStatus:(props.listParams.onlineStatus?parseInt(props.listParams.onlineStatus):'')
        }
      },()=>{
        this.getData();
      })
    }
    if(JSON.stringify(this.state.roleList)!=JSON.stringify(props.roleList)){
      this.setState({
        roleList:props.roleList
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
        title: '用户',
        dataIndex: 'userName',
        key: 'userName',
        width:"100px"
      },
      {
        title: '所属角色',
        dataIndex: 'roleIds',
        key: 'roleIds',
        render:(text,record)=>{
          const roleName=[];
          record.roleIds.map((ids)=>{
            this.state.roleList.map((rol)=>{
              if(ids==rol.value){
                roleName.push( rol.name)
              }
            })
          });
          return(
            <div>
              {
                roleName.join()
              }
            </div>
          )
        }
      },
      {
        title: '手机号',
        dataIndex: 'tel',
        key: 'tel',
        width:"150px"
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


