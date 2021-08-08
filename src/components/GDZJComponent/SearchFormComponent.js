import React,{Component} from 'react';

import {Card, Form, Row, Col, Button, Select, DatePicker, Radio, Tooltip } from 'antd';
import moment from 'moment';

import charts_options from '../DBHComponent/charts_options';

import styles from './SearchFormComponent.less';

class SearchFormComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }
  componentWillUnmount() {
  }
  componentDidMount() {
  }

  handleSearch = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log('Received values of form: ', JSON.stringify(values));
      if(!err) {
        const {fault_happen_time, test_type, only_obey, fault_city_name, vendor_name} = values;
        let rtn_event_time = [];

        if(fault_happen_time) fault_happen_time.forEach( fault_happen_time_item => {
          rtn_event_time.push(fault_happen_time_item);
        });

        const search_props = {
          start_happen_time: rtn_event_time[0].format('YYYY-MM-DD 00:00:00'),
          end_happen_time: rtn_event_time[1].format('YYYY-MM-DD 23:59:59'),
          test_type: test_type,
          only_obey: only_obey,
          fault_city_name: fault_city_name,
          vendor_name: vendor_name,
        };
        
        console.log(search_props)

        this.props.onSearchClick(search_props);
      }
    });
  };
  handleReset = () => this.props.form.resetFields();

  render() {
    const { getFieldDecorator } = this.props.form;
    const {onSearchClick, search_data, search_loading, Cookies_auth, Cookies_user} = this.props;
    const city_name_list = [];
    const plainOptions = [{ label: '问题工单', value: "1" }, { label: '疑似制造工单', value: "2" }];
    const plainOptions2 = [{ label: '是', value: "yes" }, { label: '否', value: "no" }];

    let init_city = { rules: [],};
    let disable_city = false;
    if(Cookies_auth) {
      const auth = JSON.parse(Cookies_auth);
      const {user_type, city_name} = auth;
      if(user_type !== "all") {
        disable_city = true;
        for(let city_name_key in charts_options.createGdGeoCoordMap()) {
          if(city_name_key.indexOf(city_name) >  -1) {
            init_city["initialValue"] = [city_name_key];
            city_name_list.push(<Select.Option key={city_name_key}>{city_name_key}</Select.Option>);
          }
        }
      } else {
        for(let city_name_key in charts_options.createGdGeoCoordMap()) {
          city_name_list.push(<Select.Option key={city_name_key}>{city_name_key}</Select.Option>);
        }
      }
    }

    return (
      <div className={styles.search_body}>
        <Card title="请填写搜索条件：" bordered={false} >
          <Form  className="ant-advanced-search-form" onSubmit={this.handleSearch}>
            <Row gutter={24}>
              <Col span={8} >
                <Form.Item label={`工单告警发生时间`}>
                  {getFieldDecorator(`fault_happen_time`, {rules: [{ required: true, message: '请选择告警发生的时间段!' }],})(<DatePicker.RangePicker disabled={search_loading}
                    placeholder={['开始时间', '结束时间']}
                  />)}
                </Form.Item>
              </Col>
              <Col span={8} >
                <Form.Item label={`选择质检类型`}>
                  {getFieldDecorator(`test_type`, {rules: [{ required: true, message: '请选择质检类型!' }],})(<Radio.Group options={plainOptions} disabled={search_loading} />)}
                </Form.Item>
              </Col>
              <Col span={8} >
                <Form.Item label={`只输出符合规则的工单`}>
                  <Tooltip title="若选择是：对于问题工单，只输出操作时间和告警消除时间相差15分钟以内的工单；对于疑似制造工单，只输出操作时间和告警发生时间相差5分钟以内的工单">
                  {getFieldDecorator(`only_obey`, {rules: [{ required: true, message: '请选择是否只输出符合规则的工单!' }],})(<Radio.Group options={plainOptions2} disabled={search_loading} />)}
                  </Tooltip>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={8} >
                <Form.Item  label={`地市`} style={{width:'100%'}}>
                  {getFieldDecorator(`fault_city_name`, init_city)(<Select disabled={(disable_city) ? disable_city : search_loading}
                    mode="multiple"
                    style={{ width: '100%' }}
                    placeholder="请输入地市名称">
                    {city_name_list}
                  </Select>)}
                </Form.Item>
              </Col>
              <Col span={8} >
                <Form.Item label={`厂家`} style={{width:'100%'}}>
                  {getFieldDecorator(`vendor_name`, {rules: [],})(
                  <Select disabled={search_loading}>
                  <Select.Option value="hw">华为</Select.Option>
                  <Select.Option value="zte">中兴</Select.Option>
                  <Select.Option value="fh">烽火</Select.Option>
                  </Select>)}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24} style={{ textAlign: 'right' }}>
                <Button type="primary" htmlType="submit" loading={search_loading}>
                  开始搜索
                </Button>
                <Button style={{ marginLeft: 8 }} disabled={search_loading} onClick={this.handleReset}>
                  重置条件
                </Button>
              </Col>
            </Row>
          </Form>
        </Card>
      </div>
    )
  }
}

const WrappedAdvancedSearchForm = Form.create({ name: 'advanced_search' })(SearchFormComponent);
export default WrappedAdvancedSearchForm;
