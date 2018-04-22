import React, { Component, PropTypes } from 'react'
import List from './List'
import {Row,Col,Card} from 'antd'
import Edit from './Edit'
import {fetchPost} from '../../../../utils/request'
import Search from "./Search";

class Index extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      listParams:{
        userName:"",
        tel:"",
        roleIds:[],
        onlineStatus:''
      },
      activeItem:null,
      roleList:[]
    }
  }

  componentDidMount() {
    this.getRoleList();
  }

  getRoleList(){
    const params={
      pageSize:10000
    };
    fetchPost('/admin/role/list',params).then(json=>{
      const roleList=[];
      json.vo.records.map((list)=>{
        roleList.push({
          value:list.id,
          name:list.roleName
        })
      });
      this.setState({
        roleList:roleList
      })
    })
  }



  changelistParams(params){
    this.setState({
      listParams:params
    })
  }

  changeClickRow(params){
    this.setState({
      activeItem:params
    })
  }

  updateList(params){
    this.list.getData();
  }

  render() {
    return (
        <div>
          <div>
            <Search roleList={this.state.roleList}  changelistParams={(params)=>this.changelistParams(params)} />
          </div>
          <div>
            <Row>
              <Col span={16}>
                <Card bordered={false} bodyStyle={{padding:"5px"}}>
                  <List ref={(list)=>{this.list = list}} listParams={this.state.listParams} roleList={this.state.roleList} changeClickRow={(params)=>this.changeClickRow(params)}/>
                </Card>
              </Col>
              <Col span={8}>
                <Edit activeItem={this.state.activeItem} roleList={this.state.roleList} updateList={(params)=>this.updateList(params)}/>
              </Col>
            </Row>
          </div>
        </div>
    );
  }
}


export default Index


