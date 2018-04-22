import React, { Component, PropTypes } from 'react';
import { Link } from 'dva/router';
import { Menu, Icon } from 'antd';
import { history } from '../../utils/config'
import Styles from './Item.less';

class Notice extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      show:true,
      num:"",
      url:"",
      stutas:""
    };
  }

  componentWillReceiveProps(props) {
    if (this.state.num != props.num || this.state.url != props.url || this.state.stutas != props.stutas) {
      this.setState({
        num:props.num,
        url:props.url,
        stutas:props.stutas
      });
    }
  }

  close(){
    this.setState({
      show:false
    })
  }
  check(){
    history.push({
      pathname: this.state.url,
      state:{
        stutas:this.state.stutas
      }
    })
  }

  render() {
    return (
      <div>
        {
          (this.state.show && this.state.num != 0)?
            <div  className={Styles.item}>{this.state.num}～<span style={{"cursor":"pointer"}} onClick={()=>{this.check()}}>立即审核</span><Icon style={{"cursor":"pointer"}} type="close-square" onClick={()=>{this.close()}}/></div>
            :
            ""
        }
      </div>
    );
  };
}

export default Notice
