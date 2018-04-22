import React, { Component, PropTypes } from 'react';
import { Link } from 'dva/router';
import { Menu, Icon } from 'antd';
import { history } from '../../utils/config'
import Item from './Item';
import {fetchPostSub} from '../../utils/request'

class Notice extends React.Component {

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     record:{},
  //     appMediaUrl:"flow/app/list",
  //     socialMediaUrl:"flow/socialContact/list",
  //     orderUrl:"flow/account/list",
  //     bankCardUrl:"flow/user/list",
  //
  //   };
  // }
  // componentWillMount () {
  //   fetchPostSub('/platformadmin/inform/getinformation',{}).then(json=>{
  //     if(json.code == 0){
  //       this.setState({
  //         record:json.vo
  //       })
  //     }else {
  //       message.error(json.msg)
  //     }
  //   })
  // }

  render() {
    return false;
    // return (
    //   <div>
    //     {
    //       this.state.record.bankCardNum==0?"":
    //         <Item num = {`您有${this.state.record.bankCardNum}条实名认证申请待审核`} url = {this.state.bankCardUrl} stutas="0"></Item>
    //     }
    //     {
    //       this.state.record.orderNum==0?"":
    //         <Item num = {`您有${this.state.record.orderNum}条结算订单待结算`} url = {this.state.orderUrl} stutas="0"></Item>
    //     }
    //     {
    //       this.state.record.appMediaNum==0?"":
    //         <Item num = {`您有${this.state.record.appMediaNum}条App媒介申请待审核`} url = {this.state.appMediaUrl} stutas="0"></Item>
    //     }
    //     {
    //       this.state.record.socialMediaNum==0?"":
    //         <Item num = {`您有${this.state.record.socialMediaNum}条社交媒介申请待审核`} url = {this.state.socialMediaUrl} stutas="0"></Item>
    //     }
    //   </div>
    // );
  };
}



export default Notice
