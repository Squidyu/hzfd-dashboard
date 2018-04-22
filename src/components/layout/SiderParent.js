import React, { Component, PropTypes } from 'react';
import { Link } from 'dva/router';
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

  createThreeMenuContent(parentName, subNavs, value,key) {
    //菜单名  下级菜单  跳转url
    const nav = [];
    if (subNavs == null) {
      nav.push(
        <Menu.Item key={value}>
          <Link  to={'/' + value}>{parentName}</Link>
        </Menu.Item>
      );
      return nav;
    } else {
      subNavs.map(function (subNav,index) {
        nav.push(
          <Menu.Item key={subNav.url}
          >
            <Link  to={'/' + subNav.url}>
              {subNav.value}
            </Link>
          </Menu.Item>
        )
      });
      return (
        <SubMenu
          key={key} title={<span ><span>{parentName}</span></span>}>
          {nav}
        </SubMenu>
      )
    }
  }


  createSubMenuContent(parentName, subNavs, value,key) {
    const self = this;
    //菜单名  下级菜单  跳转url
    const nav = [];
    const subnav = [];
    if (subNavs == null) {
      nav.push(
        <Menu.Item key={value}>
          <Link  to={'/' + value}>{parentName}</Link>
        </Menu.Item>
      );
      return nav;
    } else {
      subNavs.map(function (subNav,index) {
        if(subNav.children == null || subNav.children==""){
          nav.push(
            <Menu.Item key={subNav.url}
            >
              <Link  to={'/' + subNav.url}>
                {subNav.value}
              </Link>
            </Menu.Item>
          )
        }else{
          nav.push(self.createThreeMenuContent(subNav.value, subNav.children, subNav.url,subNav.key));
        }
      });
      return (
        <SubMenu
          key={key} title={<span ><Icon type="bars"/><span>{parentName}</span></span>}>
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
    const subNav=[];
    let self = this;
    let currentModule = [];
    let subCurrentModule = [];
    let activeModule = self.state.activeModule;
    this.state.menus.map(function (menu) {
      if (menu.name == activeModule) {
        currentModule = menu.treeNode.children;
      }
    });

    currentModule.map(function (menu) {
      //菜单名  下级菜单  跳转url
      nav.push(self.createSubMenuContent(menu.value, menu.children, menu.url,menu.key));
    });



    return (
      <Menu style={{
        width: '100%',height: '100%'}}
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
      <div style={{position:'fixed',width:200,left:0,top:50,bottom:0,overflowY:'auto'}}>
        {this.createSiderNav()}
      </div>
    );
  };
}



export default SiderParent
