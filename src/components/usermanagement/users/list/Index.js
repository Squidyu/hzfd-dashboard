import React, {Component, PropTypes} from 'react'
import Styles from './Index.less';
import List from './List'
import Search from '../../../common/components/Search'
import {Row, Col, Card} from 'antd'
import UserList from './UserList'
import UserInfo from './UserInfo'
class Index extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      listParams: {
        mobile: "",
        channel: ""
      },
      activeId: null
    }
  }


  pageChange(params) {
    this.setState({
      activeId: params
    })
  }
  changeActiveItem(params) {
    this.setState({
      activeId: params
    })
  }
  render() {
    return (
      <div>
        <Row>
          <Col span={9}>
            <Card bordered={false} bodyStyle={{padding: "5px"}}>
              <List listParams={this.state.listParams} changeActiveItem={(params) => {
                this.changeActiveItem(params)
              }}     pageChange ={(params) => {this.pageChange(params)}} />
            </Card>
          </Col>
          <Col span={15}>
            <Card bordered={false} bodyStyle={{padding: "5px"}}>
              <div>
                <UserInfo activeId={this.state.activeId}/>
              </div>
            </Card>
            <Card bordered={false} bodyStyle={{padding: "5px"}}>
              <UserList activeId={this.state.activeId}/>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}


export default Index


