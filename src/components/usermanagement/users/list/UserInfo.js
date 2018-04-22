import React, {Component, PropTypes} from 'react'
import Styles from './Index.less';
import {fetchPost} from '../../../../utils/request'
import {Table, Popconfirm, Modal, message,Tabs} from 'antd'
const TabPane = Tabs.TabPane;


class UserInfo extends React.Component {

  constructor(props) {
    super(props);
    const panes = [];
    this.state = {
      list: [],
      activeKey: '0',
      panes,
      panesContentList: [],
      page: {
        totalCash: null,
        totalPages: 1,
        totalRecords: 10
      },
      listParams: {
        userId: null,
      },
      baseInfoStatus: null,
      zmxyStatus: null,
      customInfoStatus: null,
      mobileStatus: null,
      identityStatus: null,
      creditCardStatus: null,
      socialStatus: null,
      accumulationStatus: null,
      weCharStatus: null,
      bankRecord:null,
      loanBlack:null,
    }
  }

  identityInfo(userId) {
    this.setState({
      userId: userId,
      dialogTitle: "身份证信息",
      visible: true,
    }, () => {
      this.identityInfoFind(userId)
    })
  }

  creditCardStatusInfo(userId) {
    this.setState({
      userId: userId,
      dialogTitle: "信用卡认证信息",
      visible: true,
    }, () => {
      this.creditCardStatusInfoFind(userId)
    })
  }

  identityInfoFind(userId) {
    fetchPost('/admin/userlist/find/identifyinfo', {userId: userId}).then(json => {
      this.setState({
        frontUrl: json.vo == null ? '' : json.vo.frontUrl,
        backUrl: json.vo == null ? '' : json.vo.backUrl,
        certificateUrl: json.vo == null ? '' : json.vo.certificateUrl,
        faceBestUrl: json.vo == null ? '' : json.vo.faceBestUrl,
      })
    })
  }

  creditCardStatusInfoFind(userId) {
    fetchPost('/admin/userlist/find/creditcard', {userId: userId}).then(json => {
      this.setState({
        panesContentList: json.voList
      }, () => {
        this.panesAndContentGroup()
      })
    })
  }

  panesAndContentGroup() {
    // this.state.panesContentList.map(
    //   (index,data) => {
    //     var gg={ title: ' ', content: 'Content of Tab Pane 1', key: '1' }
    //
    //   }
    // )
    var ggzhi = this.state.panesContentList;
    var ggList = this.state.panes;
    for (var i = 0; i < ggzhi.length; i++) {
var ggContent=" <table>\n" +
  "              <tr>\n" +
  "                <td> 公司名称:</td>\n" +
  "                <td>"+ggzhi[i].companyName+"</td>\n" +
  "              </tr>\n" +
  "              <tr>\n" +
  "                <td> 公司地址:</td>\n" +
  "                <td>"+ggzhi[i].companyAddress+"</td>\n" +
  "              </tr>\n" +
  "              <tr>\n" +
  "                <td> 邮箱:</td>\n" +
  "                <td>"+ggzhi[i].email+"</td>\n" +
  "              </tr>\n" +
  "              <tr>\n" +
  "                <td>组织:</td>\n" +
  "                <td>"+ggzhi[i].homeAddress+"</td>\n" +
  "              </tr>\n" +
  "              <tr>\n" +
  "                <td> 手机号:</td>\n" +
  "                <td>"+ggzhi[i].phone+"</td>\n" +
  "              </tr>\n" +
  "              <tr>\n" +
  "                <td> 银行卡名称:</td>\n" +
  "                <td>"+ggzhi[i].bankName+"</td>\n" +
  "              </tr>\n" +
  "              <tr>\n" +
  "                <td> 银行卡号:</td>\n" +
  "                <td>"+ggzhi[i].cardNo+"</td>\n" +
  "              </tr>\n" +
  "              <tr>\n" +
  "                <td> 信用卡额度:</td>\n" +
  "                <td>"+ggzhi[i].creditLimit+"</td>\n" +
  "              </tr>\n" +
  "            </table>"
      var gg = {title: ggzhi[i].bankName, content: ggContent, key: i}
      ggList.push(gg);
    }
    this.setState({
      panes: ggList,
    })
  }

  mobileInfo(userId) {
    this.setState({
      userId: userId,
      dialogTitle: "运营商信息",
      visible: true,
    }, () => {
      this.mobileInfoFind(userId)
    })
  }

  mobileInfoFind(userId) {
    fetchPost('/admin/userlist/find/carrierinfo', {userId: userId}).then(json => {
      this.setState({
        carrierName: json.vo == null ? "" : json.vo.carrierName,
        tel: json.vo == null ? "" : json.vo.tel,
      })
    })
  }

  baseInfo(userId) {
    this.setState({
      userId: userId,
      dialogTitle: "基本信息",
      visible: true,
    }, () => {
      this.baseInfoFind(userId)
    })
  }

  customInfo(userId) {
    this.setState({
      userId: userId,
      dialogTitle: "补充资料信息",
      visible: true,
    }, () => {
      this.customInfoFind(userId)
    })
  }

  customInfoFind(userId) {
    fetchPost('/admin/userlist/find/otherInfo', {userId: userId}).then(json => {
      this.setState({
        marriageInfo: json.vo.marriageInfoString,
        residenceType: json.vo.residenceTypeString,
        personProvince: json.vo.personProvince,
        personCity: json.vo.personCity,
        personDistrict: json.vo.personDistrict,
        personAddress: json.vo.personAddress,
        liveDuration: json.vo.liveDurationString,
        incomeType: json.vo.incomeTypeString,
        moneyUse: json.vo.moneyUseString,
        liveStyle: json.vo.liveStyleString,
        qq: json.vo.qq,
        email: json.vo.email,
        companyName: json.vo.companyName,
        companyProvince: json.vo.companyProvince,
        companyCity: json.vo.companyCity,
        companyDistrict: json.vo.companyDistrict,
        companyAddress: json.vo.companyAddress,
        industry: json.vo.industryString,
        creditInfo: json.vo.creditInfoString,
        connectNameA: json.vo.connectNameA,
        connectMobileA: json.vo.connectMobileA,
        connectRelationA: json.vo.connectRelationAString,
        companyTel: json.vo.companyTel,
      })
    })
  }

  zmxyInfo(userId) {
    this.setState({
      userId: userId,
      dialogTitle: "芝麻信息",
      visible: true,
    }, () => {
      this.zmxyInfoFind(userId)
    })
  }

  zmxyInfoFind(userId) {
    fetchPost('/admin/userlist/find/zmxyinfo', {userId: userId}).then(json => {
      this.setState({
        zmScore: json.vo == null ? "" : json.vo.zmScore,
        openId: json.vo.openId,
      })
    })
  }

  baseInfoFind(userId) {
    fetchPost('/admin/userlist/find/baseinfo', {userId: userId}).then(json => {
      this.setState({
        userName: json.vo.userName,
        userIdCard: json.vo.userIdCard,
        acceptLimittedRepayment: json.vo.acceptLimittedRepayment,
        educationalStatus: json.vo.educationalStatusString,
        socialInfo: json.vo.socialInfo,
        carStatus: json.vo.carStatusString,
        isOpType: json.vo.isOpTypeString,
        employedLatelyLength: json.vo.employedLatelyLengthString,
        incomeMonth: json.vo.incomeMonth,
      })
    })
  }

  /*弹框事件*/
  handleOk = () => {
    this.setState({
      visible: false,
    });
  }
  handleCancel = (e) => {
    this.setState({
      userName: "",
      panesContentList:[],
      panes:[],
      activeKey:'0',
      visible: false,
    })
  }

  componentWillReceiveProps(props) {
    if (props.activeId == null) {
      this.setState({
        baseInfoStatus: "",
        zmxyStatus: "",
        customInfoStatus: "",
        mobileStatus: "",
        identityStatus: "",
        creditCardStatus: null,
        socialStatus: null,
        accumulationStatus: null,
        weCharStatus: null,
        loanBlack:null,
        bankRecord:null,
        listParams: {
          userId: "",
          mobile: ""
        }
      })
    }
    if (props.activeId != null) {
      if (props.activeId.userId != this.state.listParams.userId) {
        this.setState({
          listParams: props.activeId,
        }, () => {
          if (this.state.listParams.userId != null) {
            this.getData();
          }
        })
      }
    }
  }
  onChange = (activeKey) => {
    this.setState({ activeKey });
  }
  getData() {
    fetchPost('/admin/userlist/find/authstatus', {userId: this.state.listParams.userId}).then(json => {
      this.setState({
        baseInfoStatus: json.vo == null ? "" : json.vo.baseInfoStatus,
        zmxyStatus: json.vo == null ? "" : json.vo.zmxyStatus,
        customInfoStatus: json.vo == null ? "" : json.vo.customInfoStatus,
        mobileStatus: json.vo == null ? "" : json.vo.mobileStatus,
        identityStatus: json.vo == null ? "" : json.vo.identityStatus,
        creditCardStatus: json.vo == null ? "" : json.vo.creditCardStatus,
        socialStatus: json.vo == null ? "" : json.vo.socialStatus,
        accumulationStatus: json.vo == null ? "" : json.vo.accumulationStatus,
        weCharStatus: json.vo == null ? "" : json.vo.weCharStatus,
        bankRecord: json.vo == null ? "" : json.vo.bankRecord,
        loanBlack: json.vo == null ? "" : json.vo.loanBlack,

      })
    })
  }

  render() {
    const self = this;
    return (
      <div>
        <table>
          <tr>
            <td>用户ID:</td>
            <td>{this.state.listParams.userId}</td>
          </tr>
          <tr>
            <td>电话:</td>
            <td>{this.state.listParams.mobile}</td>
          </tr>
          <tr>
            <td> 基本信息认证:</td>
            <td>{this.state.baseInfoStatus == 1 ?
              <span style={{color: "green"}}>&nbsp;&nbsp;&nbsp;&nbsp;已认证&nbsp;&nbsp;&nbsp;&nbsp;<a onClick={(e) => {
                this.baseInfo(this.state.listParams.userId)
              }} style={{marginRight: "10px"}}>
                查看
              </a></span> : <span style={{color: "red"}}>&nbsp;&nbsp;&nbsp;&nbsp; 未认证</span>}</td>
            <td> &nbsp;&nbsp;&nbsp;&nbsp; 芝麻分认证:</td>
            <td>{this.state.zmxyStatus == 1 ?
              <span style={{color: "green"}}>&nbsp;&nbsp;&nbsp;&nbsp;已认证&nbsp;&nbsp;&nbsp;&nbsp;<a onClick={(e) => {
                this.zmxyInfo(this.state.listParams.userId)
              }} style={{marginRight: "10px"}}>
                查看
              </a></span> : <span style={{color: "red"}}>&nbsp;&nbsp;&nbsp;&nbsp; 未认证</span>}</td>
            <td> &nbsp;&nbsp;&nbsp;&nbsp;补充资料认证:</td>
            <td>{this.state.customInfoStatus == 1 ?
              <span style={{color: "green"}}>&nbsp;&nbsp;&nbsp;&nbsp;已认证&nbsp;&nbsp;&nbsp;&nbsp;<a onClick={(e) => {
                this.customInfo(this.state.listParams.userId)
              }} style={{marginRight: "10px"}}>
                查看
              </a></span> : <span style={{color: "red"}}>&nbsp;&nbsp;&nbsp;&nbsp; 未认证</span>}</td>
          </tr>
          <tr>
            <td>运营商认证:</td>
            <td>{this.state.mobileStatus == 1 ?
              <span style={{color: "green"}}>&nbsp;&nbsp;&nbsp;&nbsp;已认证&nbsp;&nbsp;&nbsp;&nbsp;<a onClick={(e) => {
                this.mobileInfo(this.state.listParams.userId)
              }} style={{marginRight: "10px"}}>
                查看
              </a></span> : <span style={{color: "red"}}>&nbsp;&nbsp;&nbsp;&nbsp; 未认证</span>}</td>
            <td> &nbsp;&nbsp;&nbsp;&nbsp;身份信息认证:</td>
            <td>{this.state.identityStatus == 1 ?
              <span style={{color: "green"}}> &nbsp;&nbsp;&nbsp;&nbsp;已认证&nbsp;&nbsp;&nbsp;&nbsp;<a onClick={(e) => {
                this.identityInfo(this.state.listParams.userId)
              }} style={{marginRight: "10px"}}>
                查看
              </a></span> : <span style={{color: "red"}}>&nbsp;&nbsp;&nbsp;&nbsp; 未认证</span>}</td>
            <td> &nbsp;&nbsp;&nbsp;&nbsp;信用卡账单认证:</td>
            <td>{this.state.creditCardStatus == 1 ?
              <span style={{color: "green"}}> &nbsp;&nbsp;&nbsp;&nbsp;已认证&nbsp;&nbsp;&nbsp;&nbsp;<a onClick={(e) => {
                this.creditCardStatusInfo(this.state.listParams.userId)
              }} style={{marginRight: "10px"}}>
                查看
              </a></span> : <span style={{color: "red"}}>&nbsp;&nbsp;&nbsp;&nbsp; 未认证</span>}</td>
          </tr>
          <tr>
            <td>社保认证:</td>
            <td>{this.state.socialStatus == 1 ?
              <span style={{color: "green"}}>&nbsp;&nbsp;&nbsp;&nbsp;已认证&nbsp;&nbsp;&nbsp;&nbsp;</span> :
              <span style={{color: "red"}}>&nbsp;&nbsp;&nbsp;&nbsp; 未认证</span>}</td>
            <td> &nbsp;&nbsp;&nbsp;&nbsp;公积金认证:</td>
            <td>{this.state.accumulationStatus == 1 ?
              <span style={{color: "green"}}> &nbsp;&nbsp;&nbsp;&nbsp;已认证&nbsp;&nbsp;&nbsp;&nbsp;</span> :
              <span style={{color: "red"}}>&nbsp;&nbsp;&nbsp;&nbsp; 未认证</span>}</td>
            <td> &nbsp;&nbsp;&nbsp;&nbsp;微信认证:</td>
            <td>{this.state.weCharStatus == 1 ?
              <span style={{color: "green"}}> &nbsp;&nbsp;&nbsp;&nbsp;已认证&nbsp;&nbsp;&nbsp;&nbsp;</span> :
              <span style={{color: "red"}}>&nbsp;&nbsp;&nbsp;&nbsp; 未认证</span>}</td>
          </tr>
          <tr>
            <td>网贷黑名单认证:</td>
            <td>{this.state.loanBlack == 1 ?
              <span style={{color: "green"}}>&nbsp;&nbsp;&nbsp;&nbsp;已认证&nbsp;&nbsp;&nbsp;&nbsp;</span> :
              <span style={{color: "red"}}>&nbsp;&nbsp;&nbsp;&nbsp; 未认证</span>}</td>
            <td> &nbsp;&nbsp;&nbsp;&nbsp;网银流水认证:</td>
            <td>{this.state.bankRecord == 1 ?
              <span style={{color: "green"}}> &nbsp;&nbsp;&nbsp;&nbsp;已认证&nbsp;&nbsp;&nbsp;&nbsp;</span> :
              <span style={{color: "red"}}>&nbsp;&nbsp;&nbsp;&nbsp; 未认证</span>}</td>
          </tr>
        </table>
        {/*弹框*/}
        <Modal
          title={this.state.dialogTitle}
          visible={this.state.visible}
          onOk={this.handleOk}
          footer={null}
          onCancel={this.handleCancel}
          key={this.state.defaultKey}
        >
          <div>
            {this.state.dialogTitle == "基本信息" ? <table>
              <tr>
                <td> 姓名:</td>
                <td>{this.state.userName}</td>
              </tr>
              <tr>
                <td> 本人身份证号:</td>
                <td>{this.state.userIdCard}</td>
              </tr>
              <tr>
                <td> 最高可承受还款金额:</td>
                <td>{this.state.acceptLimittedRepayment}</td>
              </tr>
              <tr>
                <td>教育程度:</td>
                <td>{this.state.educationalStatus}</td>
              </tr>
              <tr>
                <td> 现单位是否交社保:</td>
                <td>{this.state.socialInfo == 1 ? '缴纳' : '不缴纳'}</td>
              </tr>
              <tr>
                <td> 车辆情况:</td>
                <td>{this.state.carStatus}</td>
              </tr>
              <tr>
                <td> 职业:</td>
                <td>{this.state.isOpType}</td>
              </tr>
              <tr>
                <td> 现单位工作年限:</td>
                <td>{this.state.employedLatelyLength}</td>
              </tr>
              <tr>
                <td> 月工资收入(元):</td>
                <td>{this.state.incomeMonth}</td>
              </tr>
            </table> : this.state.dialogTitle == "芝麻信息" ? <table>
              <tr>
                <td> 账号:</td>
                <td>{this.state.openId}</td>
              </tr>
              <tr>
                <td> 芝麻分:</td>
                <td>{this.state.zmScore}</td>
              </tr>
            </table> : this.state.dialogTitle == "运营商信息" ? <table>
              <tr>
                <td> 运营商类型:</td>
                <td>{this.state.carrierName}</td>
              </tr>
              <tr>
                <td> 号码:</td>
                <td>{this.state.tel}</td>
              </tr>
            </table> : this.state.dialogTitle == "身份证信息" ? <table>
              <tr>
                <td> 正面:</td>
                <td><img src={this.state.frontUrl} style={{"width": "100%", "height": "100%", "border": "none"}}/></td>
              </tr>
              <tr>
                <td> 反面:</td>
                <td><img src={this.state.backUrl} style={{"width": "100%", "height": "100%", "border": "none"}}/></td>
              </tr>
              <tr>
                <td> 人脸识别:</td>
                <td><img src={this.state.faceBestUrl} style={{"width": "100%", "height": "100%", "border": "none"}}/>
                </td>
              </tr>
              <tr>
                <td> 手持:</td>
                <td><img src={this.state.certificateUrl} style={{"width": "100%", "height": "100%", "border": "none"}}/>
                </td>
              </tr>
            </table> : this.state.dialogTitle == "补充资料信息" ? <table>
              <tr>
                <td> 户口类型:</td>
                <td>{this.state.residenceType}</td>
              </tr>
              <tr>
                <td> 婚姻情况:</td>
                <td>{this.state.marriageInfo}</td>
              </tr>
              <tr>
                <td> 居住地址:</td>
                <td>{this.state.personProvince}{this.state.personCity}{this.state.personDistrict}{this.state.personAddress}</td>
              </tr>
              <tr>
                <td> 个体名称:</td>
                <td>{this.state.companyName}</td>
              </tr>
              <tr>
                <td> 个体地址:</td>
                <td>{this.state.companyProvince}{this.state.personCity}{this.state.companyDistrict}{this.state.companyAddress}</td>
              </tr>
              <tr>
                <td> 个体联系电话:</td>
                <td>{this.state.companyTel}</td>
              </tr>
              <tr>
                <td> 收入类型:</td>
                <td>{this.state.incomeType}</td>
              </tr>
              <tr>
                <td> 居住方式:</td>
                <td>{this.state.liveStyle}</td>
              </tr>
              <tr>
                <td> 居住时长:</td>
                <td>{this.state.liveDuration}</td>
              </tr>
              <tr>
                <td> 贷款用途:</td>
                <td>{this.state.moneyUse}</td>
              </tr>
              <tr>
                <td> 电子邮箱:</td>
                <td>{this.state.email}</td>
              </tr>
              <tr>
                <td> qq号码:</td>
                <td>{this.state.qq}</td>
              </tr>
              <tr>
                <td> 信用信用情况:</td>
                <td>{this.state.creditInfo}</td>
              </tr>
              <tr>
                <td> 紧急联系人姓名:</td>
                <td>{this.state.connectNameA}</td>
              </tr>
              <tr>
                <td> 紧急联系人关系:</td>
                <td>{this.state.connectRelationA}</td>
              </tr>
              <tr>
                <td> 紧急联系人电话号码:</td>
                <td>{this.state.connectMobileA}</td>
              </tr>
              <tr>
                <td> 所在行业:</td>
                <td>{this.state.industry}</td>
              </tr>
            </table>: this.state.dialogTitle == "信用卡认证信息" ?<div>
                <Tabs
                  hideAdd
                  onChange={this.onChange}
                  activeKey={this.state.activeKey}
                >
                  {this.state.panes.map(pane => <TabPane tab={pane.title} key={pane.key+""}>{
                    <div dangerouslySetInnerHTML={{__html:pane.content}}></div>}
                  </TabPane>)}
                </Tabs>
              </div>
              :""}
          </div>
        </Modal>
      </div>
    );
  }
}

export default UserInfo
