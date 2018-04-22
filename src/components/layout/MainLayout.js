import React, {Component, PropTypes} from 'react';
import Header from './HeaderNav'
import SiderParent from './SiderParent'
import Notice from './Notice'
import {fetchPost} from '../../utils/request'
import styles from './MainLayout.less';

class MainLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: 'inline',
      menus: [],
      defaultOpenKeys: ['业务管理', '优惠券管理'],
      content: null,
      activeModule: ""
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    fetchPost('/admin/menu/promisemenulist', {}).then(json => {
      let clickActiveModule = sessionStorage.getItem('clickActiveModule');
      if (clickActiveModule) {
        this.setState({
          menus: json.voList,
          activeModule: clickActiveModule
        })
      } else {
        this.setState({
          menus: json.voList,
          activeModule: json.voList[0].name
        });
      }
    });
  }

  changeField(field, value) {
    this.setState({
      [field]: value,
    });
  }

  render() {
    return (
      <div className={styles.mainLayout}>
        <div className={styles.headerClass}>
          <Header menus={this.state.menus}
                  setActiveModule={(activeModule) => this.changeField("activeModule", activeModule)}/>
        </div>
        {(!!localStorage.accessToken)?
        <div className={styles.siderNav}>
          <SiderParent menus={this.state.menus} activeModule={this.state.activeModule}/>
        </div>:""
      }

        <div className={styles.childrenComponent}>
          <div className={styles.childrenWrapper}>
            <Notice></Notice>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}


export default MainLayout;
