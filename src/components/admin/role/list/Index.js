import React, { Component, PropTypes } from 'react'
import Styles from './Index.less';
import Search from '../../../common/components/Search'
import List from './List'
import {Row,Col,Card} from 'antd'
import Edit from './Edit'

class Index extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      searchParams: {
        list: [
          {
            name: '角色名称',
            type: 'text',
            key: ['roleName'],
            className: 'pl30',
            placeHolder: '请输入角色名称',
            values: []
          },
          {
            name: '',
            type: 'search',
            key: '',
            className: 'pl30'
          }
        ]
      },
      listParams:{
        roleName:""
      },
      activeItem:null
    }
  }

  changelistParams(params){
    this.setState({
      listParams:{
        roleName:params.roleName
      }
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
            <Search searchParams={this.state.searchParams} changeParams={(params)=>this.changelistParams(params)}/>
          </div>
          <div>
            <Row>
              <Col span={16}>
              <Card bordered={false} bodyStyle={{padding:"5px"}}>
                <List ref={(list)=>{this.list = list}} listParams={this.state.listParams} changeClickRow={(params)=>this.changeClickRow(params)}/>
              </Card>
            </Col>
              <Col span={8}>
                <Edit activeItem={this.state.activeItem} updateList={(params)=>this.updateList(params)}/>
              </Col>
            </Row>
          </div>
        </div>
    );
  }
}


export default Index


