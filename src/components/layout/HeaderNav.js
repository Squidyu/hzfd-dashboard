import React, { Component, PropTypes } from 'react';
import { Menu, Icon ,Dropdown } from 'antd';
import auth from '../../services/auth'
import styles from './MainLayout.less';
import { Link } from 'react-router';
import {origin, history} from '../../utils/config'


class Header extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      menus: [],
      activeModule: ''
    };
  }


  componentWillReceiveProps(props) {
    if (this.state.menus.length == 0) {
    let clickActiveModule = sessionStorage.getItem('clickActiveModule');
      if(clickActiveModule){
        this.setState({
          menus: props.menus || [],
          activeModule:clickActiveModule
        })
      } else {
        this.setState({
          menus: props.menus || [],
          activeModule: props.menus[0].treeNode.value
        })
      }
    }
  }

  handleClick(e) {
    let saveUrl = sessionStorage.getItem('saveUrl');
    let setOpenKey = sessionStorage.getItem('setOpenKey');
    let setSelect = sessionStorage.getItem('setSelect');
    if(saveUrl){
      sessionStorage.removeItem('saveUrl');
    }
    if(setOpenKey){
      sessionStorage.removeItem('setOpenKey');
    }
    if(setSelect){
      sessionStorage.removeItem('setSelect');
    }
    this.setState({
      activeModule: e.key,
    });
    sessionStorage.setItem('clickActiveModule',e.key);
    this.props.setActiveModule(e.key);
  }

  getHeaderNavs() {
    const nav = [];
    let self = this;
    this.state.menus.map(function (menu) {
      if (menu.name == self.state.activeModule) {
        nav.push(<Menu.Item key={menu.name}
                            className={styles.headNavItem + " " + styles.headNavItemActive}>{menu.name}</Menu.Item>);
      } else {
        nav.push(<Menu.Item key={menu.name} className={styles.headNavItem }>{menu.name}</Menu.Item>);
      }

    });

    return nav;
  }

  updatePassword(){
    history.push('/user/updatepassword');
  }

  render() {

    const menu=(
      <Menu>
        <Menu.Item className={styles.dropdownMenu}>
          <Icon type="logout"/>
          <span onClick={e=> {  auth.logout(); }}> 登出</span>
        </Menu.Item>
        <Menu.Item className={styles.dropdownMenu}>
            <Icon type="key"/>
          <span onClick={e =>{ this.updatePassword(e) }}> 修改密码</span>
        </Menu.Item>
      </Menu>
    );

    return (
      <div className={styles.headerWrapper} >
        <div className={styles.logo}>
         </div>

        <div className={styles.tabs}>
          <Menu onClick={(e)=>this.handleClick(e)}
                mode="horizontal"
                className={styles.headNav}>
            {this.getHeaderNavs()}
          </Menu>
        </div>

        <div className={styles.user}>
          <Dropdown  overlay={menu}>
            <a className={styles.dropdownClass+ " " +"ant-dropdown-link"}>
              <Icon type="user"/>
              <span>
                <span>
                  欢迎您，
                  {
                    auth.getUserName()
                  }
                </span>
              </span>
            </a>
          </Dropdown>
        </div>
      </div>
    );
  }
}


export default Header
