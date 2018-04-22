import {Form} from 'antd'
const FormItem = Form.Item;
import React from 'react'


class AppItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initialObj: {}
    }
  }

  render() {
    const {getFieldDecorator} = this.props.form;
    var formItemLayout = {};
    if (this.props.singleRow) {
      formItemLayout = {
        label: this.props.label,
        labelCol: {span: 5},
        wrapperCol: {span: 16},
      };
    } else {
      formItemLayout = {
        label: this.props.label,
        labelCol: this.props.labelCol,
        wrapperCol: this.props.wrapperCol,
        style: this.props.style
      };
    }
    const fieldDecorator = this.fieldDecorator();

    return (
      <FormItem {...formItemLayout}>
        {
          getFieldDecorator(this.props.valueKey, fieldDecorator)(
            this.props.children
          )
        }
      </FormItem>
    );
  }

  //生成规则
  fieldDecorator() {
    let fieldDecorator = {};
    fieldDecorator.rules = [];
    if (this.props.valuePropName) {
      fieldDecorator.valuePropName = this.props.valuePropName;
    }

    if (this.props.initialObj && (this.props.initialObj[this.props.valueKey] || this.props.initialValueType == 'boolean')) {
      if (this.props.initialValueType == 'string') {
        fieldDecorator.initialValue = this.props.initialObj[this.props.valueKey].toString();
      } else {
        fieldDecorator.initialValue = this.props.initialObj[this.props.valueKey];
      }
    } else {
      if (this.props.initialValueType == 'object' || this.props.initialValueType == 'array'
        || this.props.initialValueType == 'boolean') {
        fieldDecorator.initialValue = null;
      } else if (this.props.initialValueType == 'number') {
        fieldDecorator.initialValue = 0;
      } else {
        fieldDecorator.initialValue = '';
      }
    }

    let ruleOne = {}
    if (this.props.required) {
      ruleOne.required = this.props.required;
      ruleOne.message = this.props.message;
    }
    if (this.props.type) {
      ruleOne.type = this.props.type;
    }

    if (this.props.required || this.props.type) {
      fieldDecorator.rules.push(ruleOne);
    }

    if (this.props.handleValidate) {
      fieldDecorator.rules.push({
        validator: this.checkConfirm.bind(this)
      });
    }
    return fieldDecorator;
  }

  checkConfirm(rule, value, callback) {
    const form = this.props.form;
    const message = this.props.handleValidate(value);
    if (message) {
      callback(message);
    } else {
      callback();
    }
  }
}

AppItem.propTypes = {
  //标签文本
  label: React.PropTypes.string,
  //标签布局
  labelCol: React.PropTypes.any,
  //输入控件布局
  wrapperCol: React.PropTypes.any,
  //唯一标示
  key: React.PropTypes.string,
  //验证规则
  handleValidate: React.PropTypes.func,
  //验证规则的类型
  type: React.PropTypes.string,
  //初始值类型
  initialValueType: React.PropTypes.string,
  style: React.PropTypes.object,
  //必填项未填信息
  message: React.PropTypes.string
};

AppItem.defaultProps = {
  labelCol: {span: 7},
  wrapperCol: {span: 17},
  type: 'string',
  initialValueType: 'string',
  message: "此项必填"
};

export default AppItem;
