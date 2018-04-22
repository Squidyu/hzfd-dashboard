import React from 'react'
import Search from '../../../common/components/Search'
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
  DatePicker
} from 'antd'
import {fetchPost} from '../../../../utils/request'

const FormItem = Form.Item;
const Option = Select.Option;
const {MonthPicker, RangePicker} = DatePicker;
import Styles from './Index.less'
import {history} from '../../../../utils/config'

class Index extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      themeList: [],
      params: {
        companyId: "",
        start: "",
        end: "",
        pageNo: 1
      },
      page: {
        totalCash: null,
        totalPages: 1,
        totalRecords: 10
      },
      visible: false,
      isEdit: false,
      activeId: null,
      list: [],
    }
  }

  getThemeList() {
    fetchPost("/admin/companylinkrecord/companylist").then(json => {
      this.setState({
        themeList: json.voList
      })
    })
  }

  componentDidMount() {
    this.getThemeList();
    this.getData();
  }

  getData() {
    fetchPost("/admin/companylinkrecord/list", this.state.params).then(json => {
      this.setState({
        list: json.vo.records,
        page: {
          totalCash: json.vo.totalCash,
          totalPages: json.vo.totalPages,
          totalRecords: json.vo.totalRecords
        }
      })
    })
  }

  nextPage(current) {
    this.setState({
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
    const {name1} = this.props.form.getFieldsValue();
    this.setState({
      params: {
        companyId: name1 || null,
        start: this.state.params.start || null,
        end: this.state.params.end || null,
        pageNo: 1
      }
    }, () => {
      this.getData();
    })
  }

  changeTime(time) {
    if (typeof(time) != 'undefined') {
      var startDate = time[0].format("YYYY-MM-DD");
      var endDate = time[1].format("YYYY-MM-DD");
      this.setState({
        params: {
          ...this.state.params,
          start: startDate + " 00:00:00",
          end: endDate + " 24:00:00"
        }
      });
    }
  }

  findAll(e) {
    e.preventDefault();
    this.props.form.resetFields();
    this.setState({
      params: {
        companyId: "" || null,
        start: "" || null,
        end: "" || null,
        pageNo: 1
      },
    }, () => {
      this.getData();
    })
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
        title: '机构名称',
        dataIndex: 'cName',
        key: 'cName',
        width: "80px"
      }, {
        title: '当前用户名称',
        dataIndex: 'aName',
        key: 'aName',
        width: "100px"
      }, {
        title: '老记录',
        dataIndex: 'oldRecoreTable',
        key: 'oldRecoreTable',
        render: (text, record) => {
          if (record.oldRecoreTable == "") {
            return "";
          } else {
            let themeName1=record.oldRecoreTable;
            return <div dangerouslySetInnerHTML={{__html:themeName1}}></div>  ;
          }
        }
      },
      {
        title: '新记录',
        dataIndex: 'newRecordTable',
        key: 'newRecordTable',
        render: (text, record) => {
          if (record.newRecordTable == "") {
            return "";
          } else {
            let themeName2=record.newRecordTable;
            return <div dangerouslySetInnerHTML={{__html:themeName2}}></div>  ;
          }
        }
      }, {
        title: '创建日期',
        dataIndex: 'gmtCreateString',
        key: 'gmtCreateString',
        width: "140px"
      }
    ];

    return (
      <div>
        <Row>
          <Col span={22}>
            <Form layout="inline">
              <FormItem className={Styles.item} label="机构">
                {getFieldDecorator("name1")(
                  <Select placeholder="请选择签名" style={{width: 160}}>
                    {
                      this.state.themeList.map((data) => {
                        return (<Option key={data.companyId}>{data.companyName}</Option>)
                      })
                    }
                  </Select>
                )}
              </FormItem>
              <FormItem label="注册时间" className={Styles.item}>
                {getFieldDecorator('date')(
                  <RangePicker
                    style={{width: 260}}
                    onChange={(e) => this.changeTime(e)}
                  />
                )}
              </FormItem>
              <FormItem className={Styles.item}>
                <Button type='primary' icon='search' onClick={(e) => {
                  this.groupSearch(e)
                }} style={{"marginRight": 20}}>筛选</Button>
                <Button type='primary' onClick={(e) => {
                  this.findAll(e)
                }} style={{"marginRight": 20}}><Icon type="reload"/></Button>
              </FormItem>
            </Form>
          </Col>
        </Row>
        <div>
          <Table size="middle" bordered pagination={pagination} key="clrId" rowKey="clrId" columns={columns}
                 dataSource={this.state.list}
          />
        </div>
        <div>
        </div>
      </div>
    );
  }
}

Index = Form.create()(Index);

export default Index


