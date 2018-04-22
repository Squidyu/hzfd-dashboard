import React, { Component, PropTypes } from 'react'
import Styles from './Index.less';
import {fetchPost} from '../../../../utils/request'
import {Row,Col,Card} from 'antd'
import Edit from './Edit'
import FirstMenuList from './FirstMenuList'
import SecondMenuList from './SecondMenuList'
import ThirdMenuList from './ThirdMenuList'
import LastMenuList from './LastMenuList'

class Index extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      menuList:[],
      firstMenuList:[],
      secondMenuList:[],
      thirdMenuList:[],
      lastMenuList:[],
      firstMenuActiveItem:null,
      secondMenuActiveItem:null,
      thirdMenuActiveItem:null,
      lastMenuActiveItem:null,
      data:[],
      list:[],
      activeId:null,
      activeItem:null
    }
  }

  componentDidMount() {
    this.getData();
  }

  getData(){
    fetchPost('/admin/menu/list',{}).then(json=>{
      this.setState({
        menuList:json.voList
      },()=>{
        this.getMenuList();
      })
    })
  }
  getMenuList(){
    if(this.state.menuList.length>0){
      this.setState({
        firstMenuList:this.state.menuList,
        activeItem:this.state.menuList[0].treeNode
      },()=>{
        if(this.state.firstMenuList.length>0){
          this.setState({
            secondMenuList:this.state.firstMenuList[0].treeNode.children
          },()=>{
            if(this.state.secondMenuList.length>0){
              this.setState({
                thirdMenuActiveItem:this.state.secondMenuList[0].children
              },()=>{
                if(this.state.thirdMenuActiveItem.length>0){
                  this.setState({
                    lastMenuList:this.state.thirdMenuActiveItem[0].children
                  })
                }
              })
            }
          })
        }
      })
    }
  }


  changeActiveItem(item){
    this.setState({
      activeItem:item
    });
  }
  changeFirstMenuActiveItem(item){
    this.changeActiveItem(item);
    if(this.state.firstMenuList.length>=(item.index+1)){
      this.setState({
        secondMenuList:this.state.firstMenuList[item.index].treeNode.children
      },()=>{
        if(this.state.secondMenuList!=null){
          this.setState({
            thirdMenuList:this.state.secondMenuList[0].children
          },()=>{
            if(this.state.thirdMenuList!=null){
              this.setState({
                lastMenuList:this.state.thirdMenuList[0].children
              })
            }else{
              this.setState({
                lastMenuList:null
              })
            }
          })
        }
      })
    }
  }
//lastMenuList:this.state.secondMenuList[item.index].children
  changeSecondMenuActiveItem(item){
    this.changeActiveItem(item);
    if(this.state.secondMenuList.length>=(item.index+1)){
      this.setState({
        thirdMenuList:this.state.secondMenuList[item.index].children
      },()=>{
        if(this.state.thirdMenuList!=null){
          this.setState({
            lastMenuList:this.state.thirdMenuList[0].children
          })
        }
      })
    }
  }
  /*changeThirdMenuActiveItem(item){
    this.changeActiveItem(item);
    if(this.state.thirdMenuList.length>=(item.index+1)){
      this.setState({
        lastMenuList:this.state.thirdMenuList[item.index].children
      })
    }
  }*/
  changeThirdMenuActiveItem(item){
    this.changeActiveItem(item);
    if(this.state.thirdMenuList.length>=(item.index+1)){
      this.setState({
        lastMenuList:this.state.thirdMenuList[item.index].children
      })
    }
  }

  changeLastMenuActiveItem(item){
    this.changeActiveItem(item);
  }


  updateList(params){
    this.getData();
  }

  render() {
    return (
        <div>
          <Row>
            <Col span={5}>
              <Card bordered={false} bodyStyle={{padding:"5px"}}>
                <FirstMenuList list={this.state.firstMenuList} changeActiveItem={(item)=>this.changeFirstMenuActiveItem(item)}/>
              </Card>
            </Col>
            <Col span={5}>
              <Card bordered={false} bodyStyle={{padding:"5px"}}>
                <SecondMenuList list={this.state.secondMenuList} changeActiveItem={(item)=>this.changeSecondMenuActiveItem(item)}/>
              </Card>
            </Col>
            <Col span={5}>
              <Card bordered={false} bodyStyle={{padding:"5px"}}>
                <ThirdMenuList list={this.state.thirdMenuList} changeActiveItem={(item)=>this.changeThirdMenuActiveItem(item)}/>
              </Card>
            </Col>
            <Col span={4}>
              <Card bordered={false} bodyStyle={{padding:"5px"}}>
                <LastMenuList list={this.state.lastMenuList} changeActiveItem={(item)=>this.changeLastMenuActiveItem(item)}/>
              </Card>
            </Col>
            <Col span={5}>
                <Edit activeItem={this.state.activeItem} updateList={(params)=>this.updateList(params)}/>
            </Col>
          </Row>
        </div>
    );
  }
}


export default Index


