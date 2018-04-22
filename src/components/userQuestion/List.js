import React from 'react'
import Search from '../common/components/Search'
import {
  Button,
  InputNumber,
  Popconfirm,
  Modal,
  Form,
  Input,
  Select,
  message,
  Table,
  Col,
  Row,
  Icon,
  DatePicker,
  Card
} from 'antd'
import moment from 'moment';
import {fetchPost} from '../../utils/request'
import {history, origin} from '../../utils/config'
const {TextArea} = Input;
const FormItem = Form.Item;
const Option = Select.Option;
import Styles from './Index.less'
import auth from '../../services/auth'

const {MonthPicker, RangePicker} = DatePicker;

class List extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      themeList: [],
      list: [],
      questionList: [],
      searchParams: {
        title: "",
        channel: "",
        status: "",
        pageNo: 1,
      },
      params: {
        title: "",
        channel: "",
        status: "",
        pageNo: 1,
      },
      page: {
        totalCash: null,
        totalPages: 1,
        totalRecords: 10
      },
      visible: false,
      isEdit: false,
      activeId: null,
    }
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    let params = {};
    params.pageNo = this.state.params.pageNo;
    fetchPost("/admin/activity/userinfo/category/list", params).then(json=>{
      this.setState({
        list: json.vo.records,
        page:{
          ...this.state.page,
          totalCash:json.vo.totalRecords,
          totalRecords:json.vo.totalRecords,
          totalPages:json.vo.totalPages
        }
      })
    });

    fetchPost("/admin/activity/userinfo/question/list", params).then(json=>{
      this.setState({
        questionList: json.voList
      })
    });
  }

  getSearchData() {

  }


  addClassifySelect() {
    history.push({
      pathname: "youjieoperation/userQuestion/addClassify",
      state: {
        questionList: this.state.questionList
      }
    })
  }
  addFiledSelect() {
    history.push({
      pathname: "youjieoperation/userQuestion/addFiled"
    })
  }

  nextPage(current) {
    this.setState(
      {
        params: {
          ...this.state.params,
          pageNo: current
        }
      }, () => {
        this.getData();
      })
  }

  groupSearch(e) {
    e.preventDefault();
    const { title1 } = this.props.form.getFieldsValue();
    let params = {};
    params.pageNo = 1;
    params.id = title1;
    fetchPost("/admin/activity/userinfo/category/list", params).then(json=>{
      let list = null;
      if (json.vo != null) {
        list = json.vo.records;
        this.setState({
          list: list,
          page:{
            ...this.state.page,
            totalCash:json.vo.totalRecords,
            totalRecords:json.vo.totalRecords,
            totalPages:json.vo.totalPages
          }
        })
      } else {
        list = [];
        this.setState({
          list: list,
          page:{
            ...this.state.page,
            totalCash:0,
            totalRecords:0,
            totalPages:1
          }
        })
      }
    });
  }

  render() {

    const self = this;

    const {getFieldDecorator} = self.props.form;

    const formItemLayout = {
      labelCol: {span: 6},
      wrapperCol: {span: 16},
    };

    const pagination = {
      current: this.state.params.pageNo,
      total: this.state.page.totalRecords,
      pageSize: 10,
      showSizeChanger: false,
      showQuickJumper: true,
      showTotal(total) {
        return `总共 ${total} 条`;
      },
      onChange(current) {
        self.nextPage(current)
      }
    };

    const columns = [
      {
        title: '分类ID',
        dataIndex: 'id',
        key: 'id'
      },
      {
        title: '资料组名称',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: '包含字段',
        dataIndex: '',
        key: '',
        render: (text, record) => (
          record.questionNameList.map(function (t) {
            return(
              <p><span>{t}</span></p>
            )
          })
        )
      }
    ];

    const columnsFiled = [
      {
        title: 'key',
        dataIndex: 'questionKey',
        key: 'questionKey'
      }, {
        title: '字段名称',
        dataIndex: 'question',
        key: 'question'
      }
    ];

    return (
      <div>
         <Card title="分类配置">
        <Row>
          <Col span={22}>
            <Form layout="inline">
              <FormItem label="分类ID" className={Styles.item}>
                {getFieldDecorator('title1')(
                  <Input style={{width: 160}}/>
                )}
              </FormItem>
              <FormItem className={Styles.item}>
                <Button type='primary' icon='search' onClick={(e) => {
                  this.groupSearch(e)
                }} style={{"marginRight": 20}}>筛选</Button>
              </FormItem>
            </Form>
          </Col>
        </Row>
        <div>
          <div style={{marginBottom: "30px", marginTop: "10px"}}>
            <Button style={{marginRight: "30px"}} type="primary" size="large" onClick={() => {
              this.addClassifySelect()
            }}>新增</Button>
          </div>
          <Table size="middle" bordered pagination={pagination} key="name" rowKey="name" columns={columns}
                 dataSource={this.state.list}
          />
        </div>
         </Card>
        <br/>
        <Card title="字段配置">
          <div>
            <div style={{marginBottom: "30px", marginTop: "10px"}}>
              <Button style={{marginRight: "30px"}} type="primary" size="large" onClick={() => {
                this.addFiledSelect()
              }}>新增</Button>
            </div>
            <Table size="middle" bordered pagination={false} key="id" rowKey="id" columns={columnsFiled}
                   dataSource={this.state.questionList}
            />
          </div>
        </Card>
      </div>
    );
  }
}

List = Form.create()(List);

export default List


