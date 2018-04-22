import React, {Component, PropTypes} from 'react'
import MethodList from './MethodList'
import CompanyInfoList from './CompanyInfoList'
import CallBackList from './CallBackList'
import {Row, Col, Card, Select, Radio, Button} from 'antd'
import Styles from './Index.less';

const Option = Select.Option;
const RadioGroup = Radio.Group

class Index extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      activeCompanyId: null,
    }
  }

  changeActiveCompanyId(companyId) {
    this.setState({
      activeCompanyId: companyId
    })
  }

  render() {
    return (
      <div>
        {/*<Button type="primary" size="small" onClick={(e)=>{this.change(e)}}>dianji</Button>*/}
        <Row>
          <Col span={10}>
            <Card bordered={false} bodyStyle={{padding: "5px"}}>
              <CompanyInfoList changeActiveCompanyId={(companyId) => {
                this.changeActiveCompanyId(companyId)
              }}/>
            </Card>
          </Col>
          <Col span={14}>
            <Row>
              <Card bordered={false} bodyStyle={{padding: "5px"}}>
                <MethodList activeCompanyId={this.state.activeCompanyId}/>
              </Card>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Index


