import React, {Component, PropTypes} from 'react'
import Styles from './Index.less';
import {Row,Col,Form, Input, Button, Icon, Select} from 'antd'
const FormItem = Form.Item;
const Option = Select.Option;


class Search extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      roleList: [],
      params: {
        userName: "",
        tel: "",
        roleIds: []
      },
      initParams: {
        userName: "",
        tel: "",
        roleIds: [],
        onlineStatus: ''
      }
    }
  }


  handleSubmit(e) {
    e.preventDefault();
    const {userName, tel, roleIds, onlineStatus} = this.props.form.getFieldsValue();
    this.setState({
      params: {
        ...this.state.params,
        userName: userName || "",
        tel: tel || "",
        roleIds: roleIds || [],
        onlineStatus: onlineStatus || ''
      }
    }, () => {
      this.props.changelistParams(this.state.params)
    })
  }

  componentWillReceiveProps(props) {
    if (JSON.stringify(this.state.roleList.length) != JSON.stringify(props.roleList)) {
      this.setState({
        roleList: props.roleList
      })
    }
  }


  handleReset(e) {
    e.preventDefault();
    this.props.form.resetFields();
    this.setState({
      params: this.state.initParams
    }, () => {
      this.props.changelistParams(this.state.params)
    })
  }

  render() {

    const {getFieldDecorator} = this.props.form;
    const formItemLayout = {
      labelCol: {span: 8},
      wrapperCol: {span: 10},
    };
    return (
      <div>
        <Row>
          <Col span={22}>
            <Form inline onSubmit={e => this.handleSubmit(e)}>
              <FormItem label="用户姓名" className={Styles.itemWrapper} >
                {getFieldDecorator('userName')(
                  <Input placeholder="请输入用户姓名" style={{width: 180}}/>
                )}
              </FormItem>
              <FormItem label="手机号" className={Styles.itemWrapper} >
                {getFieldDecorator('tel')(
                  <Input placeholder="请输入手机号" style={{width: 180}}/>
                )}
              </FormItem>
              <FormItem label="所属角色" className={Styles.itemWrapper} >
                {getFieldDecorator('roleIds')(
                  <Select
                    mode="multiple"
                    placeholder="请选择所属角色"
                    style={{width: 180}}
                  >
                    {
                      this.state.roleList.map((role) => {
                        return (<Option key={role.value}>{role.name}</Option>)
                      })
                    }
                  </Select>
                )}
              </FormItem>


              <FormItem className={Styles.refreshBtn}>
                <Button type="primary" htmlType="submit">搜索</Button>
              </FormItem>
              <FormItem className={Styles.refreshBtn}>
                <Button type="ghost" onClick={(e) => this.handleReset(e)}><Icon type="reload"/></Button>
              </FormItem>
            </Form>
          </Col>
        </Row>
      </div>
    );
  }
}

Search = Form.create()(Search);
export default Search


