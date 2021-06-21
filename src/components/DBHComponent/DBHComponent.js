import React,{Component} from 'react';
import moment from 'moment';
import Cookies from 'js-cookie';

import HeadPageComponent from './HeadPageComponent';
import MapChartComponent from './MapChartComponent';
import BarChartComponent from './BarChartComponent';
import PaiChartComponent from './PaiChartComponent';
import LineChartComponent from './LineChartComponent';
import TableComponent from './TableComponent';
import GuanKongForm from './GuanKongForm';
import ClearAlarmForm from './ClearAlarmForm';
import CheckTimeComponent from './CheckTimeComponent';

import styles2 from './DBHComponent.less';
import chart_option from './charts_options';
import table_option from './tables_options';

import config_text from '../../assets/config.json';

import {Layout, Row, Col, Drawer, Button, Divider, Modal, Carousel, Icon, message, Spin, Select} from 'antd';

class DBHComponent extends Component {


  constructor(props) {
    super(props);

    this.state = {
      scene:null,
      isImportant:"不过滤",
      city:null,
      select_seriesName:'传输接入',
      HuiJu_filteredInfo: {},
      JieRu_filteredInfo: {},
      HuiJuLow_filteredInfo: {},
      sortedInfo: null,
    };
  }
  componentWillUnmount() {
    // this.scene.destroy();
  }
  componentDidMount() {
    this.props.dispatch({type: "DBH/save", payload:{"defaultSelectedKeys": "sub3_1"}});
    this.props.dispatch({
      type:"DBH/fetch_data",
      payload:{the_loading_props:{modal_visible:false, childrenDrawer:false,clear_alarm_visible:false,}},
    });

    //使 两个table都被激活
    this.setState({select_seriesName:'汇聚骨干单边'});
    

  }
  handleCancel = () => this.props.dispatch({type:"DBH/save",payload:{modal_visible: false, eoms_detail_data : null, eoms_menu_ticket : [],}});
  handleClearCancel = () => this.props.dispatch({type:"DBH/save",payload:{clear_alarm_visible: false, }});
  onChange = (activeKey) => this.setState({select_seriesName:activeKey,});
  onClearClick = () => this.props.dispatch({type:"DBH/save",payload:{clear_alarm_visible: true, }});
  handleChange = (pagination, filters, sorter) => {
    // console.log('Various parameters', pagination, filters, sorter);
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  };
  scrollToAnchor = (anchorName) => {
    if (anchorName) {
      let anchorElement = document.getElementById(anchorName);
      if(anchorElement) { anchorElement.scrollIntoView(); }
    }
  };
  onChartClick = (params) => {
    console.log("params", params);
    const {componentType, name, value, seriesName} = params;
    //componentType: "yAxis"
    let rtn_seriesName = (seriesName === "重要环") ? "传输接入" : seriesName;

    const user = Cookies.get('user');
    const auth = (Cookies.get('auth')) ? JSON.parse(Cookies.get('auth')) : {};
    const user_type = (auth) ? auth.user_type : "";

    let newState = {
      // modal_visible: true,
      select_seriesName:null,
      city:null,
      //过滤成选择城市的数据
      filteredInfo: null, //{city_name:[name]}
    };
    console.log(this.state.select_seriesName)

    if(user_type === "all") {
      if (componentType === "series") {
        if(name) {
          newState["select_seriesName"] = rtn_seriesName;
          newState["city"] = name;
          newState["HuiJu_filteredInfo"] = {city_name:[name]};
          newState["JieRu_filteredInfo"] = {city_name:[name]};
          newState["HuiJuLow_filteredInfo"] = {city_name:[name]};

          this.setState(newState);
          this.scrollToAnchor('anchorId');
          console.log(this.state.select_seriesName)
        }
      }
      else if( componentType === "yAxis" ) {
        if(value) {
          const type_city = value.split("||");
          if(type_city.length > 1) {
            // console.log(type_city);
            this.setState({
              // modal_visible: true,
              select_seriesName:type_city[0],
              city:type_city[1],
              //过滤成选择城市的数据
              HuiJu_filteredInfo:{city_name:[type_city[1]]},
              JieRu_filteredInfo:{city_name:[type_city[1]]},
            });
          }
        }
      }
      else if( componentType === "statistic" ) {

        newState["select_seriesName"] = seriesName;
        // newState["city"] = name;
        let filteredInfo = (seriesName === "重要环") ? "HuiJu_filteredInfo" : "JieRu_filteredInfo";
        newState[filteredInfo] = {city_name:[name]};

        this.setState(newState);

        // this.setState({
        //   // modal_visible: true,
        //   select_seriesName: seriesName,
        //   isImportant:"过滤掉否",
        //   filteredInfo:filteredInfo,
        // });
        this.scrollToAnchor('anchorId');

        // console.log(this.state);
      }

      console.log("newState", newState);
    }
  };
  onEomsButtonClick = (sheet_no_list) => this.props.dispatch({type:"DBH/get_eoms_detail", payload:{sheet_no_list: sheet_no_list}});
  HuiJu_onTableFilterChanged = (params) => {
    // console.log("params",params.api.getDisplayedRowCount());
    const new_filter = params.api.getFilterModel();
    // console.log("onTableFilterChanged", new_filter);
    const old_filter = this.state.HuiJu_filteredInfo;
    if( JSON.stringify(new_filter) !== JSON.stringify(old_filter)) {
      // 发生filer更改
      console.log("HuiJu_filteredInfo发生filer更改:", "旧filter:" ,old_filter, ";新filter:" , new_filter);
      console.log();
      console.log();
      this.setState({
        //过滤成选择城市的数据
        HuiJu_filteredInfo:new_filter
      });
    }
  };
  JieRu_onTableFilterChanged = (params) => {
    const new_filter = params.api.getFilterModel();
    // console.log("onTableFilterChanged", new_filter);
    const old_filter = this.state.JieRu_filteredInfo;
    if( JSON.stringify(new_filter) !== JSON.stringify(old_filter)) {
      // 发生filer更改
      console.log("JieRu_filteredInfo发生filer更改:", "旧filter:" ,old_filter, ";新filter:" , new_filter);
      console.log();
      console.log();
      this.setState({
        //过滤成选择城市的数据
        JieRu_filteredInfo:new_filter
      });
    }
  };
  HuiJuLow_onTableFilterChanged = (params) => {
    // console.log("params",params.api.getDisplayedRowCount());
    const new_filter = params.api.getFilterModel();
    // console.log("onTableFilterChanged", new_filter);
    const old_filter = this.state.HuiJuLow_filteredInfo;
    if( JSON.stringify(new_filter) !== JSON.stringify(old_filter)) {
      // 发生filer更改
      console.log("HuiJuLow_filteredInfo发生filer更改:", "旧filter:" ,old_filter, ";新filter:" , new_filter);
      console.log();
      console.log();
      this.setState({
        //过滤成选择城市的数据
        HuiJuLow_filteredInfo:new_filter
      });
    }
  };
  onMenuClick = () => this.props.dispatch({type:"DBH/save", payload:{menu_visible: true}});
  onCellClicked = (params) => {
    // console.log(params);
    const data = params["data"];
    this.props.dispatch({type:"DBH/save",payload:{modal_visible: true, detail_data: data, kong_data: [data]}});
  };
  showChildrenDrawer = () => this.props.dispatch({type:"DBH/save",payload:{childrenDrawer: true,}});
  onChildrenDrawerClose = () => this.props.dispatch({type:"DBH/save",  payload:{childrenDrawer: false,}});
  saveGuanKong = ({fps, manage_log}) => this.props.dispatch({type:"DBH/update_guan_kong", payload: {fps, manage_log}});
  clearAlarmHandler = ({fps, manage_log, cancel_time, ne_label}) => this.props.dispatch({type:"DBH/clear_alarm", payload: {fps, manage_log, cancel_time, ne_label}});
  addMultiGuanKong(actionType, params, dispatch) {
    // console.log("params",params);
    // actionType = Kong Clear
    if(params.node) {
      console.log("params", params);
      const {selected, rowModel} = params.node;
      const {selectionController} = rowModel;
      if(!selected) {
        message.error('请点选至少1条告警，再进行添加“管控记录”！');
      } else {
        const {selectedNodes} = selectionController;
        let new_kong_data = [];
        if(selectedNodes) {
          // console.log("selectedNodes", selectedNodes);
          for(let selectedNodes_key in selectedNodes) {
            const selectedNodes_item = selectedNodes[selectedNodes_key];
            if(selectedNodes_item) new_kong_data.push(selectedNodes_item.data);
          }
        }
        if(actionType === "Kong") {
          dispatch({type:"DBH/save",payload:{childrenDrawer: true, modal_visible: false,  kong_data: new_kong_data}});
        } else if (actionType === "Clear") {
          dispatch({type:"DBH/save",payload:{clear_alarm_visible: true,  kong_data: new_kong_data}});
        }

      }
    }
  };
  reloadTableDataHandler = () =>  this.props.dispatch({type:"DBH/relaod_data",});



  render() {
    const h = document.body.clientHeight; //622;
    const h_real = h - 135;
    // console.log(this.props);
    const { DBH, dispatch} = this.props;
    const {guan_kong_loading, trans_loop_loading, trans_loop_data, convergeAlarm_data, convergeAlarmLow_data, modal_visible, trans_alarm_count_data,eoms_detail_data, eoms_menu_ticket, eoms_detail_loading,childrenDrawer, clear_alarm_visible, detail_data, kong_data} = DBH;
    //pai属性
    const statistic_data = chart_option.createStatisticData({trans_loop_data, convergeAlarm_data, convergeAlarmLow_data});
    const {Total, HuiJu, JieRu, Important} = statistic_data;
    const pai1_data = (Total !== 0 && Total !== "暂缺") ? (HuiJu / Total) : 0;
    const pai2_data = (JieRu !== 0 && JieRu !== "暂缺") ? (Important / JieRu) : 0;
    //map属性
    const total_data = chart_option.createTotalData({trans_loop_data, convergeAlarm_data, convergeAlarmLow_data});
    const map_props = {h: h_real, map_title:chart_option.map_title, map_option:chart_option.createMapOption({trans_loop_data, convergeAlarm_data, convergeAlarmLow_data}) , trans_loop_loading, statistic_data, total_data, onChartClick: this.onChartClick};
    //bar属性
    const HuiJu_data = chart_option.count_bar_list(convergeAlarm_data, "汇聚骨干中断");
    const HuiJu_yAxis_data = HuiJu_data["yAxis_data"], HuiJu_series_data = HuiJu_data["series_data"];
    const HuiJuLow_data = chart_option.count_bar_list(convergeAlarmLow_data, "汇聚骨干弱光");
    const HuiJuLow_yAxis_data = HuiJuLow_data["yAxis_data"], HuiJuLow_series_data = HuiJuLow_data["series_data"];
    const JieRu_data = chart_option.count_bar_list(trans_loop_data, "传输接入");
    const JieRu_yAxis_data = JieRu_data["yAxis_data"], JieRu_series_data = JieRu_data["series_data"],JieRu_important_data = JieRu_data["important_data"];
    //其他属性
    const ne_label_list = (kong_data.length > 0) ? kong_data.map( (detail_data,index) => <div key={"detail_" + index}><b>{index+1}。</b>{detail_data["ne_label"]}</div>) : null;

    const user = (this.state.clear_usr) ? this.state.clear_usr : Cookies.get('user');
    const auth = (Cookies.get('auth')) ? JSON.parse(Cookies.get('auth')) : {};
    const user_type = (auth) ? auth.user_type : "";

    //只有省公司的人才可以清除告警
    const clear_button = (user_type === "all") ? (<div> <Divider orientation="left" >告警人工确认清除</Divider>
      <Button type="primary" onClick={this.onClearClick} color={"green"} icon={"delete"} size={"large"} style={{ width:"100%",}} >人工确认清除</Button>
    </div>) : null;

    //传递参数
    const pai1_props = {loading: trans_loop_loading, h: h_real, pai_title: chart_option.pai_title1, options: chart_option.pai_option({labelColor:'#470e0e', borderColor: 'rgba(136, 32, 32,1)', backgroundColor: 'rgba(136, 32, 32,.5)', data:[pai1_data]})};
    const pai2_props = {loading: trans_loop_loading, h: h_real, pai_title: chart_option.pai_title2, options: chart_option.pai_option({labelColor:'#0000ff', borderColor: 'rgba(68, 197, 253,1)', backgroundColor: 'rgba(0, 0, 253,.3)', data:[pai2_data]})};
    const bar1_props = {onChartClick:this.onChartClick, loading: trans_loop_loading, h: h_real + 50, bar_option:chart_option.bar_option({barType:"汇聚骨干单边", itemColor:chart_option.bar_color1, yAxis_data:HuiJu_yAxis_data, series_data:HuiJu_series_data}), card_title: chart_option.bar_title1} ;
    const bar2_props = {onChartClick:this.onChartClick, loading: trans_loop_loading, h: h_real + 50, bar_option:chart_option.bar_option({barType:"传输接入", itemColor:chart_option.bar_color2, yAxis_data:JieRu_yAxis_data, series_data:JieRu_series_data, important_data:JieRu_important_data }), card_title: chart_option.bar_title2} ;
    const bar3_props = {onChartClick:this.onChartClick, loading: trans_loop_loading, h: h_real + 50, bar_option:chart_option.bar_option({barType:"汇聚骨干弱光", itemColor:chart_option.bar_color3, yAxis_data:HuiJuLow_yAxis_data, series_data:HuiJuLow_series_data}), card_title: chart_option.bar_title3} ;
    const line1_props = {h: h_real + 50, card_title: chart_option.line_title1, loading: trans_loop_loading, line_option:chart_option.line_option(trans_alarm_count_data, chart_option.line_title1, "汇聚骨干")};
    const line2_props = {h: h_real + 50, card_title: chart_option.line_title2, loading: trans_loop_loading, line_option:chart_option.line_option(trans_alarm_count_data, chart_option.line_title2, "传输接入")};
    const line3_props = {h: h_real + 50, card_title: chart_option.line_title3, loading: trans_loop_loading, line_option:chart_option.line_option(trans_alarm_count_data, chart_option.line_title3, "重要环")};

    const table_props = {loading: trans_loop_loading, onCellClicked:this.onCellClicked,  convergeAlarm_data, convergeAlarmLow_data,trans_loop_data,
      isImportant:this.state.isImportant,  city:this.state.city, h: h_real ,
      HuiJu_filteredInfo:this.state.HuiJu_filteredInfo, HuiJu_onTableFilterChanged:this.HuiJu_onTableFilterChanged,
      JieRu_filteredInfo:this.state.JieRu_filteredInfo, JieRu_onTableFilterChanged:this.JieRu_onTableFilterChanged,
      HuiJuLow_filteredInfo:this.state.HuiJuLow_filteredInfo, HuiJuLow_onTableFilterChanged:this.HuiJuLow_onTableFilterChanged,
      select_seriesName:this.state.select_seriesName,
      tab_onChange:this.onChange, addMultiGuanKong:this.addMultiGuanKong, dispatch:this.props.dispatch};

    return (
      <div>
        <HeadPageComponent onMenuClick={this.onMenuClick} title={config_text.DBH_title} desc_text={config_text.DBH_desc} icon={"avatar_icon"} />
        <Layout.Content className={styles2.content_style} >
          <Row  gutter={24}>
            <Col span={16}><MapChartComponent {...map_props}  /></Col>
            <Col span={8}>
              <PaiChartComponent {...pai1_props} />
              <div  style={{marginTop:20}}><PaiChartComponent {...pai2_props} /></div>
            </Col>
          </Row>
          <Row  gutter={24} style={{marginTop:20,}}>

            <Carousel >
              <div>
                <Col span={8}>
                    <div><BarChartComponent {...bar1_props}  /></div>
                </Col>
                <Col span={8}>
                    <div><BarChartComponent {...bar2_props}  /></div>
                    {/*<div><LineChartComponent {...line2_props} /></div>*/}
                </Col>
                <Col span={8}>
                    <div><BarChartComponent {...bar3_props}  /></div>
                </Col>
              </div>

              <div><Col span={24}><LineChartComponent {...line1_props} /></Col></div>
              <div><Col span={24}><LineChartComponent {...line2_props} /></Col></div>
              <div><Col span={24}><LineChartComponent {...line3_props} /></Col></div>

            </Carousel>
          </Row>
          <Row  gutter={24} style={{marginTop:20,}}>
            <CheckTimeComponent reloadTableData={this.reloadTableDataHandler} />
          </Row>
          <Row  gutter={24} style={{marginTop:20, marginBottom:10}}>
            <Col  id="anchorId"><TableComponent {...table_props}  /></Col>
          </Row>

          <Drawer title="告警详情" width={"50%"} onClose={this.handleCancel} visible={modal_visible}>
            <div style={{marginBottom:15}} ><Button type="primary"  onClick={this.showChildrenDrawer}>添加管控记录</Button></div>
            <div>{table_option.createTimeLine(detail_data)}</div>
            <Spin spinning={eoms_detail_loading} tip={"正在查询EOMS信息"} >
            {table_option.createEoms(detail_data, this.onEomsButtonClick, eoms_detail_data, eoms_menu_ticket, )}
            </Spin>
            <Divider orientation="left" >告警信息</Divider>
            <div style={{border:"1px solid #cbcfdb", padding:"15px"}}>
              {table_option.createDescriptions({select_seriesName: this.state.select_seriesName, detail_data, })}
            </div>
            {clear_button}
           <Drawer title="添加管控记录" width={420} closable={false} onClose={this.onChildrenDrawerClose} visible={childrenDrawer}>
              <GuanKongForm guan_kong_loading={guan_kong_loading} kong_data={kong_data} saveGuanKong={this.saveGuanKong} />
            </Drawer>
          </Drawer>

          <Modal
            title={<span><Icon type="highlight" />确认告警清除状态</span>}
            visible={clear_alarm_visible}
            onCancel={this.handleClearCancel}
            footer={false}
          >
            <Divider  orientation="left">人工确认对象：</Divider>
            {ne_label_list}
            <Divider  orientation="left">人工确认内容：</Divider>
            <ClearAlarmForm guan_kong_loading={guan_kong_loading} kong_data={kong_data} clearAlarmHandler={this.clearAlarmHandler} />
          </Modal>
        </Layout.Content>

      </div>
    )
  }
}


export default DBHComponent;
