import React, { Component, PropTypes } from 'react'
import Styles from './Index.less';
import {Card,Tree,Button,message} from 'antd'
import {fetchPost} from '../../../../utils/request'
const TreeNode = Tree.TreeNode;

class Edit extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      params:{
        id:0,
        menuIds:[]
      },
      menuList:[],
      activeItem:null,
      expandMenuIds: [],
      checkedKeys: []
    }
  }

  componentDidMount(){
    this.getData();
  }




  componentWillReceiveProps(props) {
    if(props.activeItem!=null){
      this.setState({
        params:{
          ...this.state.params,
          id:props.activeItem.id
        },
        activeItem:props.activeItem
      },()=>{
        const  menuIds=[];
        this.state.activeItem.menuIds.map((mid)=>{
          menuIds.push(mid.toString());
        });
        this.setState({
          expandMenuIds: menuIds,
          checkedKeys: menuIds
        })
      })

    }
  }


  getData(){
    fetchPost('/admin/menu/list',{}).then(json=>{
      this.setState({
        menuList:json.voList
      })
    })
  }

  onCheck(checkIds) {
    checkIds=checkIds.checked;
    this.setState({
      checkedKeys: checkIds,
      expandMenuIds: checkIds,
      params: {
        ...this.state.params,
        menuIds: checkIds
      }
    })
  }

  onExpand(checkIds) {
    this.setState({
      expandMenuIds: checkIds
    })
  }

  createFirstClassTreeNode(){
    let self = this;
    let menus = this.state.menuList;
    let treeNodes = [];
    menus.map((menu)=>{
      treeNodes.push(
        <TreeNode title={menu.name} key={menu.id}>
          {
            self.createTreeNode(menu.treeNode.children)
          }
        </TreeNode>
      )
    });
    return treeNodes;
  }


  createTreeNode(menus) {
    let self = this;
    if (menus != null && menus.length != 0) {
      let treeNodes = [];
      menus.map(function (menu) {
        treeNodes.push(
          <TreeNode title={menu.value} key={menu.key}>
            {self.createTreeNode(menu.children)}
          </TreeNode>
        )
      });

      return treeNodes;
    }
  }

  updateRole(){
    fetchPost('/admin/role/rolemenu/add',this.state.params).then(json=>{
      if(json.code==0){
        message.success("更新权限成功！")
      }else{
        message.error(json.msg)
      }
    })
  }

  render() {
    return (
      <div>
        <Card title="更改权限">
          <Tree
            checkable
            checkStrictly
            onCheck={(e) => this.onCheck(e)}
            onExpand={(e) => this.onExpand(e)}
            defaultExpandAll={true}
            autoExpandParent={true}
            defaultExpandedKeys={this.state.expandMenuIds}
            expandedKeys={this.state.expandMenuIds}
            checkedKeys={this.state.checkedKeys}
          >
            {this.createFirstClassTreeNode()}
          </Tree>
          <Button type="primary" onClick={(e)=>{this.updateRole()}}>更改权限</Button>
        </Card>
      </div>
    );
  }
}


export default Edit


