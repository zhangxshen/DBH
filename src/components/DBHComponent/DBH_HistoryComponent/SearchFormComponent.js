import React,{Component} from 'react';

import {Card, Form, Row, Col, Button, Select, DatePicker,Input, Checkbox, Radio  } from 'antd';
import moment from 'moment';

import charts_options from '../charts_options';

import styles from './SearchFormComponent.less';

class SearchFormComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }
  componentWillUnmount() {
    // this.scene.destroy();
  }
  componentDidMount() {
    const end_time = moment();
    const start_time = moment().add(-1,'d');

    this.props.form.setFieldsValue({ event_time: [start_time, end_time],  severity_keycode: ["HuiJu","JieRu", "HuiJuLow"] ,},)
  }

  handleSearch = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log('Received values of form: ', JSON.stringify(values));
      // {"severity_keycode":["HuiJu","JieRu"],"event_time":["2020-10-18T02:39:26.440Z","2020-10-21T02:39:26.440Z"],"city_name":["云浮市","广州市"],"eqp_label":"网元名称","ne_label":"定位对象","title_text":"标题","subnet_name":"所属子网"}
      //参数标准化
      if(!err) {
        const {severity_keycode, event_time, city_name, eqp_label, ne_label, title_text, subnet_name} = values;
        let rtn_severity_keycode = 3, rtn_event_time = [], rtn_city_name = [], rtn_eqp_label = [], rtn_ne_label = [], rtn_title_text = [], rtn_subnet_name = [];
        if(severity_keycode){
          if(severity_keycode === "HuiJu") {
            rtn_severity_keycode = 1;
          } else if (severity_keycode === "JieRu") {
            rtn_severity_keycode = 2;
          } else if(severity_keycode === "HuiJuLow") {
            rtn_severity_keycode = 4;
          } else if(severity_keycode === "all") {
            rtn_severity_keycode = 3;
          }
        }
        // if(severity_keycode) severity_keycode.forEach(severity_keycode_item => {
          // if(severity_keycode_item === "HuiJu") {
          //   is_check_core = true;
          // } else if (severity_keycode_item === "JieRu") {
          //   is_check_wiless = true;
          // } else if(severity_keycode_item === "HuiJuLow") {
          //   is_check_corelow = true;
          // }
        // });
        // if(is_check_core && !is_check_wiless && !is_check_corelow) {
        //   rtn_severity_keycode = 1;
        // } else if (!is_check_core && is_check_wiless && !is_check_corelow){
        //   rtn_severity_keycode = 2;
        // } else if (!is_check_core && !is_check_wiless && is_check_corelow){
        //   rtn_severity_keycode = 3;
        // }

        if(event_time) event_time.forEach( event_time_item => {
          rtn_event_time.push(event_time_item.unix());
        });
        if(city_name) rtn_city_name = city_name;
        if(eqp_label) rtn_eqp_label.push(eqp_label);
        if(ne_label) rtn_ne_label.push(ne_label);
        if(title_text) rtn_title_text.push(title_text);
        if(subnet_name) rtn_subnet_name.push(subnet_name);

        const search_props = {
          severity_keycode: rtn_severity_keycode,
          event_time: rtn_event_time,
          city_name: rtn_city_name,
          eqp_label: rtn_eqp_label,
          ne_label: rtn_ne_label,
          title_text: rtn_title_text,
          subnet_name: rtn_subnet_name
        };

        this.props.onSearchClick(search_props);
      }
    });
  };
  handleReset = () => this.props.form.resetFields();

  render() {
    const { getFieldDecorator } = this.props.form;
    const {onSearchClick, search_data, search_loading, Cookies_auth, Cookies_user} = this.props;
    const city_name_list = [];
    const plainOptions = [{ label: '汇聚骨干中断', value: "HuiJu" }, { label: '接入中断', value: "JieRu" }, { label: '汇聚骨干弱光', value: "HuiJuLow" }, { label: '所有类型', value: "all" }];

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
              <Col span={24} >
                <Form.Item label={`选择中断类型`}>
                  {getFieldDecorator(`severity_keycode`, {rules: [{ required: true, message: '至少选择一种中断类型!' }],})(<Radio.Group options={plainOptions}  />)}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={12} >
                <Form.Item label={`告警发生时间`}>
                  {getFieldDecorator(`event_time`, {rules: [{ required: true, message: '请选择告警发生的时间段!' }],})(<DatePicker.RangePicker disabled={search_loading}
                    showTime={{ format: 'HH:mm' }}
                    format="YYYY-MM-DD HH:mm"
                    placeholder={['开始时间', '结束时间']}
                  />)}
                </Form.Item>
              </Col>
              <Col span={12} >
                <Form.Item  label={`地市`} style={{width:'100%'}}>
                  {getFieldDecorator(`city_name`, init_city)(<Select disabled={(disable_city) ? disable_city : search_loading}
                    mode="multiple"
                    style={{ width: '100%' }}
                    placeholder="请选择搜索关联的地市名称"
                  >
                    {city_name_list}
                  </Select>)}
                </Form.Item>
              </Col>
              <Col span={12} >
                <Form.Item label={`网元名称`} style={{width:'100%'}}>
                  {getFieldDecorator(`eqp_label`, {rules: [],})(<Input disabled={search_loading}  placeholder="请输入相关的网元名称关键字" />)}
                </Form.Item>
              </Col>
              <Col span={12} >
                <Form.Item label={`告警定位对象`} style={{width:'100%'}}>
                  {getFieldDecorator(`ne_label`, {rules: [],})(<Input disabled={search_loading}  placeholder="请输入告警定位对象关键字" />)}
                </Form.Item>
              </Col>
              <Col span={12} >
                <Form.Item label={`告警标题`} style={{width:'100%'}}>
                  {getFieldDecorator(`title_text`, {rules: [],})(<Input disabled={search_loading}  placeholder="请输入告警标题关键字" />)}
                </Form.Item>
              </Col>
              <Col span={12} >
                <Form.Item label={`所属子网`} style={{width:'100%'}}>
                  {getFieldDecorator(`subnet_name`, {rules: [],})(<Input disabled={search_loading}  placeholder="请输入所属子网关键字" />)}
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
