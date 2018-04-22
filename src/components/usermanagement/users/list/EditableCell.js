import React, { Component, PropTypes } from 'react'
import {fetchPost} from '../../../../utils/request'
import {Icon,Select,message} from 'antd'
const Option = Select.Option;
import Style from './EditableCell.less'

class EditableCell extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      companyId:this.props.companyId,
      interfaceType:this.props.interfaceType.toString(),
      editable:false
    }
  }


  componentWillReceiveProps(props) {

  }

  handleChange(value) {
    this.setState({
      interfaceType:value
    })
  }

  check(e){
    const params={
      companyId:this.state.companyId,
      interfaceType:this.state.interfaceType
    };
    fetchPost("/admin/borrow/product/change",params).then(json=>{
      this.setState({
        editable:false
      })
      message.success("修改成功！");
    })
  }


  edit(e){
    this.setState({
      editable:true
    })
  }

  render() {

    return (
      <div>
        {
          this.state.editable ?
            (
              <div className={Style.editable_wrapper}>
                <Select defaultValue={this.state.interfaceType} style={{width:"100px"}} size="small" onChange={(e)=>{this.handleChange(e)}}>
                  <Option value="0">普通</Option>
                  <Option value="1">深度对接</Option>
                </Select>
                <Icon
                  className={Style.editable_icon}
                  type="check"
                  onClick={(e)=>{this.check(e)}}
                />
              </div>
            )
            :


            (
              <div className={Style.editable_wrapper}>
                {
                  this.state.interfaceType =="1" ?
                    '深度对接'
                    :
                    '普通'
                }
                <Icon
                  className={Style.editable_icon}
                  type="edit"
                  onClick={(e)=>{this.edit(e)}}
                />
              </div>
            )

        }
      </div>
    );
  }
}

export default EditableCell
