import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { Menu, Icon } from 'antd';
import { history } from '../../utils/config'
const SubMenu = Menu.SubMenu;

class SiderParent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      mode: 'inline',
      menus: [],
      defaultOpenKeys: [],
      activeModule: null,
      urlValue: '',
      defaultSelectedKeys: [],
      showIndex:false,
    };
  }

  componentWillReceiveProps(props) {
      if (this.state.activeModule != props.activeModule) {
        this.setState({
          activeModule: props.activeModule,
          menus:props.menus,
          defaultOpenKeys:[],
          defaultSelectedKeys:[]
        }, () => {
          this.clickSwitchPage();
        });
    }
  }

  clickSwitchPage() {
    let [self, activeModule, firstUrl, key] = [this, this.state.activeModule, '', null];
    if(this.state.menus) {
      this.state.menus.map(function (menu) {
        if (menu.name == activeModule) {
          firstUrl = self.getLinkUrl(menu.treeNode.children);
        }
      });
    }

    self.setState({
      urlValue: firstUrl
    }, () => {
    let saveUrl = sessionStorage.getItem('saveUrl');
    if(saveUrl){
      history.push("/" + saveUrl);
    }else {
      history.push("/" + firstUrl);
    }
    });
  }

  getLinkUrl(navs) {
    let url = "";
    let keys = this.state.defaultOpenKeys;
    let seleteKeys = this.state.defaultSelectedKeys;
    let setOpenKey = sessionStorage.getItem('setOpenKey');
    let setSelect = sessionStorage.getItem('setSelect');
    if (navs[0].url != null && navs[0].url != "") {
        url = navs[0].url;
        seleteKeys.push(navs[0].url);
        if(setOpenKey&&setSelect){
          let arr = setOpenKey.split(',');
          let getSelect = setSelect.split(',');
          this.setState({
            defaultOpenKeys: arr,
            defaultSelectedKeys:getSelect
          })
        } else if (setOpenKey) {
          let arr = setOpenKey.split(',');
          this.setState({
            defaultOpenKeys: arr,
            defaultSelectedKeys:seleteKeys
          })
        } else if (setSelect){
          let getSelect = setSelect.split(',');
          this.setState({
            defaultOpenKeys: keys,
            defaultSelectedKeys:getSelect
          })
        } else {
          this.setState({
            defaultOpenKeys: keys,
            defaultSelectedKeys:seleteKeys
          })
        }
      } else {
        url = this.getLinkUrl(navs[0].children);
         keys.push(navs[0].value);
        seleteKeys.push(navs[0].children[0].url);
        if(setOpenKey&&setSelect) {
          let arr = setOpenKey.split(',');
          let getSelect = setSelect.split(',');
          this.setState({
            defaultOpenKeys: arr,
            defaultSelectedKeys:getSelect
          })
        } else if (setOpenKey) {
          let arr = setOpenKey.split(',');
          this.setState({
            defaultOpenKeys: arr,
            defaultSelectedKeys:seleteKeys
          })
        } else if (setSelect) {
          let getSelect = setSelect.split(',');
          this.setState({
            defaultOpenKeys: keys,
            defaultSelectedKeys:getSelect
          })
        } else {
          this.setState({
            defaultOpenKeys: keys,
            defaultSelectedKeys:seleteKeys
          })
        }
      }
    return url;
  }

  getUrl(item){
    sessionStorage.setItem('saveUrl',item.key);
  }

  createSubMenuContent(parentName, subNavs, value) {
    //菜单名  下级菜单  跳转url
    const nav = [];
    if (subNavs == null) {
      nav.push(
        <Menu.Item key={value}>
          <Link  to={'/' + value}><Icon type="minus"/>{parentName}</Link>
        </Menu.Item>
      );
      return nav;

    } else {
      subNavs.map(function (subNav) {
        nav.push(
          <Menu.Item key={subNav.url}
          >
            <Link  to={'/' + subNav.url}>
              <Icon type="minus"/>
              {subNav.value}
            </Link>
          </Menu.Item>
        )
      });

      return (
        <SubMenu
          key={parentName} title={<span ><Icon type="bars"/><span>{parentName}</span></span>}>
          {nav}
        </SubMenu>
      )
    }
  }

  onOpenChange(openKeys) {
    sessionStorage.setItem('setOpenKey',openKeys);
      this.setState({
        defaultOpenKeys: openKeys
      })
  }


  onSelect(item) {
    sessionStorage.setItem('setSelect',item.key);
    let selectedKeys = [];
    selectedKeys.push(item.key);
    this.setState({
      defaultSelectedKeys: selectedKeys
    })
  }

  createSiderNav() {
    const nav = [];
    let self = this;
    let currentModule = [];
    let activeModule = self.state.activeModule;
    this.state.menus.map(function (menu) {
      if (menu.name == activeModule) {
        currentModule = menu.treeNode.children;
      }
    });
    currentModule.map(function (menu) {
      //菜单名  下级菜单  跳转url
      nav.push(self.createSubMenuContent(menu.value, menu.children, menu.url));
    });


    return (
      <Menu
        mode={this.state.mode}
        onOpenChange={(e) => this.onOpenChange(e)}
        onSelect={(item) => this.onSelect(item)}
        onClick={(item)=>this.getUrl(item)}
        openKeys={this.state.defaultOpenKeys}
        selectedKeys={this.state.defaultSelectedKeys}
      >
        {nav}
      </Menu>
    )
  }
  render() {
    return (
      <div>
        {this.createSiderNav()}
      </div>
    );
  };
}



export default SiderParent
