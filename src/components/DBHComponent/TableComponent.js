import React from "react";
import {Icon, Spin, Tabs} from 'antd';
import {AgGridReact} from 'ag-grid-react';
import moment from 'moment';
// import { MasterDetailModule } from 'ag-grid-enterprise/master-detail';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-community/dist/styles/ag-theme-balham-dark.css';
import 'ag-grid-enterprise';

import table_option from './tables_options';
import styles from './TableComponent.less';
import Cookies from "js-cookie";

class TableComponent extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      HuiJu_GridReady_obj:null,
      JieRu_GridReady_obj:null,
      HuiJuLow_GridReady_obj:null,
      defaultColDef : {
        flex: 1,
        // minWidth: 200,
        resizable: true,
        sortable: true, //开启排序
        floatingFilter: true,
        filterParams: {
          excelMode: 'windows', // can be 'windows' or 'mac'
        },
      },
      localeText: {
        applyFilter: 'OK',
        cancelFilter: 'Cancel',
        resetFilter: 'Clear Filter',
      },
      detailCellRendererParams:(columnDefs) => {
        return {
          detailGridOptions: {
            columnDefs: columnDefs,  // table_option.child_HuiJuColumns,
            defaultColDef: { flex: 1 , resizable: true, sortable: true, },//开启排序
          },
          autoHeight: true,
          template:
            '<div class="ag-details-row ag-details-row-auto-height" style="background-color: #edf6ff; padding: 20px; box-sizing: border-box;">' +
            // '  <div style="height: 10%; padding: 2px; font-weight: bold;">###### Call Details</div>' +
            '  <div ref="eDetailGrid" style="height: 100%; width: 100%;" class="ag-details-grid ag-details-grid-auto-height ag-theme-balham-dark"></div>' +
            '</div>',
          getDetailRowData: function(params) {
            let rtn = (params.data["alarms"]) ? params.data["alarms"]  : null;
            params.successCallback(rtn);
            // if(params.data["alarms"]) params.successCallback(params.data["alarms"]);
          },
        }
      }
    };
  }
  componentWillUnmount() {
    // this.scene.destroy();
  }
  componentDidMount() {
    // // // 指定图表的配置项和数据
  }

  test(pa) {
    console.log(pa);
  }

  getContextMenuItems = (params, user_type) => {
    const rtn = ['copy', 'separator', "csvExport",
      {name: '批量添加“管控记录”', action: () => this.props.addMultiGuanKong("Kong", params, this.props.dispatch),},
      {name: 'test', action: () => this.test( params,),},
      // {name: '批量确认清除状态', action: () => this.props.addMultiGuanKong("Clear",params, this.props.dispatch),}
    ];

    if(user_type === "all") rtn.push({name: '批量确认清除状态', action: () => this.props.addMultiGuanKong("Clear",params, this.props.dispatch),});

    return rtn;
  };

  render() {

    const { onCellClicked, convergeAlarm_data, convergeAlarmLow_data, trans_loop_data,
      city, isImportant, h,
      HuiJu_filteredInfo, HuiJu_onTableFilterChanged,
      JieRu_filteredInfo, JieRu_onTableFilterChanged,
      HuiJuLow_filteredInfo, HuiJuLow_onTableFilterChanged,
      select_seriesName, tab_onChange, loading} = this.props;
    const auth = (Cookies.get('auth')) ? JSON.parse(Cookies.get('auth')) : {};
    const user_type = (auth) ? auth.user_type : "";
    const city_name = (auth) ? auth.city_name : "";
    let total_context = "";  // 保存描述文字
    let GridReady_obj = null;
    let selected_filterinfo = null;
    let check_column = null;
    if((this.state.HuiJu_GridReady_obj && this.state.JieRu_GridReady_obj && this.state.HuiJuLow_GridReady_obj)) {
      // GridReady_obj.api
      //对表格筛选数据
      // const GridReady_obj = null
      // const selected_filterinfo = null
      // const check_column = null
      if (select_seriesName === "汇聚骨干单边"){
        GridReady_obj = this.state.HuiJu_GridReady_obj;
        selected_filterinfo = HuiJu_filteredInfo;
        check_column = table_option.NewHuiJuColumns;}
      else if (select_seriesName === "传输接入"){
        GridReady_obj = this.state.JieRu_GridReady_obj;
        selected_filterinfo = JieRu_filteredInfo;
        check_column = table_option.NewJieRuColumns;}
      else if (select_seriesName === "汇聚骨干弱光"){
        GridReady_obj = this.state.HuiJuLow_GridReady_obj;
        selected_filterinfo = HuiJuLow_filteredInfo;
        check_column = table_option.NewHuiJuLowColumns;}
      // const GridReady_obj = (select_seriesName === "汇聚骨干单边") ? this.state.HuiJu_GridReady_obj : this.state.JieRu_GridReady_obj;
      // const selected_filterinfo = (select_seriesName === "汇聚骨干单边") ? HuiJu_filteredInfo : JieRu_filteredInfo;
      // const check_column = (select_seriesName === "汇聚骨干单边") ? table_option.NewHuiJuColumns : table_option.NewJieRuColumns;
      // console.log("selected_filterinfo", selected_filterinfo);
      GridReady_obj.api.setFilterModel(selected_filterinfo);
      let filterId_count = 0;
      total_context = "筛选条件：";
      for(let selected_filterinfo_keyname in selected_filterinfo) {
        for(let i =0; i < check_column.length;i++) {
          if(check_column[i]["field"] === selected_filterinfo_keyname) {
            total_context += check_column[i]["headerName"] + JSON.stringify(selected_filterinfo[selected_filterinfo_keyname]["values"]) + "；";

            break;
          }
        }

        filterId_count++;
      }

      total_context = (filterId_count > 0) ? total_context : "无筛选条件。";
      total_context = total_context + "现告警总数为：" + GridReady_obj.api.getDisplayedRowCount();
      // if(city) {
      //   // console.log(this.state.GridReady_obj);
      //   const countryFilterComponent = GridReady_obj.api.getFilterInstance('city_name');
      //   countryFilterComponent.setModel({ values: [city] });
      //   GridReady_obj.api.onFilterChanged();
      // }
    }

    //重组 convergeAlarm_data
    const new_convergeAlarm_data = [];
    if(convergeAlarm_data) convergeAlarm_data.forEach( convergeAlarm_data_item => {
      const new_convergeAlarm_data_item = {...convergeAlarm_data_item};
      
      const {manage_log, duration_time,time_stamp, event_time} = convergeAlarm_data_item;
      new_convergeAlarm_data_item["manage_log_text"] = table_option.markManageLogText(manage_log);
      new_convergeAlarm_data_item["duration_time"] = table_option.changeSecondToDuration(duration_time);
      new_convergeAlarm_data_item["time_stamp"] =  (time_stamp) ? moment(parseInt(time_stamp * 1000)).format("YYYY-MM-DD HH:mm:ss") : null;
      new_convergeAlarm_data_item["event_time"] =  moment(event_time).format("YYYY-MM-DD HH:mm:ss");


      if(user_type !== "all") {
        // console.log(auth, city_name);
        if(new_convergeAlarm_data_item["city_name"].indexOf(city_name) > -1 ) {
          new_convergeAlarm_data.push(new_convergeAlarm_data_item);
        }
      } else {
        new_convergeAlarm_data.push(new_convergeAlarm_data_item);
      }
    });

    //重组 convergeAlarmLow_data
    const new_convergeAlarmLow_data = [];
    if(convergeAlarmLow_data) convergeAlarmLow_data.forEach( convergeAlarmLow_data_item => {
      const new_convergeAlarmLow_data_item = {...convergeAlarmLow_data_item};
      const {manage_log, duration_time,time_stamp, event_time} = convergeAlarmLow_data_item;
      new_convergeAlarmLow_data_item["manage_log_text"] = table_option.markManageLogText(manage_log);
      new_convergeAlarmLow_data_item["duration_time"] = table_option.changeSecondToDuration(duration_time);
      new_convergeAlarmLow_data_item["time_stamp"] =  (time_stamp) ? moment(parseInt(time_stamp * 1000)).format("YYYY-MM-DD HH:mm:ss") : null;
      new_convergeAlarmLow_data_item["event_time"] =  moment(event_time).format("YYYY-MM-DD HH:mm:ss");

      if(user_type !== "all") {
        // console.log(auth, city_name);
        if(new_convergeAlarmLow_data_item["city_name"].indexOf(city_name) > -1 ) {
          new_convergeAlarmLow_data.push(new_convergeAlarmLow_data_item);
        }
      } else {
        new_convergeAlarmLow_data.push(new_convergeAlarmLow_data_item);

      }
    });

    //重组 trans_loop_data
    const new_trans_loop_data = [];
    if(trans_loop_data)  trans_loop_data.forEach( trans_loop_data_item => {
      const new_trans_loop_data_item = {...trans_loop_data_item};
      const {manage_log, duration_time,time_stamp, event_time, is_important, risk_score} = trans_loop_data_item;
      new_trans_loop_data_item["manage_log_text"] = table_option.markManageLogText(manage_log);
      new_trans_loop_data_item["duration_time"] = table_option.changeSecondToDuration(duration_time);
      new_trans_loop_data_item["time_stamp"] =  (time_stamp) ? moment(parseInt(time_stamp * 1000)).format("YYYY-MM-DD HH:mm:ss") : null;
      new_trans_loop_data_item["event_time"] =  moment(event_time).format("YYYY-MM-DD HH:mm:ss");
      new_trans_loop_data_item["is_important"] = (risk_score && risk_score > 59) ? "是" : "否";
      new_trans_loop_data_item["worker_obj"] = table_option.isWorkerObj(trans_loop_data_item) ;

      if(user_type !== "all") {
        // console.log(auth, city_name);
        if(new_trans_loop_data_item["city_name"].indexOf(city_name) > -1 ) {
          new_trans_loop_data.push(new_trans_loop_data_item);
        }
      } else {
        new_trans_loop_data.push(new_trans_loop_data_item);
      }
    });

    return(
      <div className="card-container">
        <Tabs type="card" activeKey={select_seriesName} onChange={tab_onChange}>
          <Tabs.TabPane tab={<span><Icon type="gateway" />汇聚骨干中断</span>} key="汇聚骨干单边">
            <Spin spinning={loading} tip={"数据读取中。。。"}>
              <div style={{width:"100%",}}>{total_context}</div>
              <div className="ag-theme-alpine" style={{height: h, width: '100%',}}>
                <AgGridReact
                  onGridReady={params => {
                      params.api.sizeColumnsToFit();
                      this.setState({HuiJu_GridReady_obj: params});
                    }}
                  //展开子告警
                  masterDetail={true}
                  isRowMaster={ (dataItem) => (dataItem["alarm_count"] > 0)}
                  detailCellRendererParams={this.state.detailCellRendererParams(table_option.child_HuiJuColumns)}
                  //复选
                  rowSelection={'multiple'}
                  rowMultiSelectWithClick={true}
                  allowContextMenuWithControlKey={true}
                  getContextMenuItems={params => this.getContextMenuItems(params, user_type)}
                  localeText={this.state.localeText}
                  onFilterChanged={HuiJu_onTableFilterChanged}
                  animateRows={true}
                  onCellDoubleClicked={onCellClicked}
                  defaultColDef={this.state.defaultColDef} columnDefs={table_option.NewHuiJuColumns} rowData={new_convergeAlarm_data} />
              </div>
            </Spin>
          </Tabs.TabPane>
          <Tabs.TabPane tab={<span><Icon type="api" />接入中断</span>} key="传输接入">
            <Spin spinning={loading} tip={"数据读取中。。。"}>
              <div style={{width:"100%",}}>{total_context}</div>
                <div className="ag-theme-alpine" style={{height: h, width: '100%',}}>
                  <AgGridReact
                    onGridReady={params => {
                      params.api.sizeColumnsToFit();
                      this.setState({JieRu_GridReady_obj: params});
                    }}
                    //展开子告警
                    masterDetail={true}
                    isRowMaster={ (dataItem) => (dataItem["alarm_count"] > 0)}
                    detailCellRendererParams={this.state.detailCellRendererParams(table_option.child_JieRuColumns)}
                    //复选
                    rowSelection={'multiple'}
                    rowMultiSelectWithClick={true}
                    allowContextMenuWithControlKey={true}
                    getContextMenuItems={params => this.getContextMenuItems(params, user_type)}
                    localeText={this.state.localeText}
                    animateRows={true}
                    onCellDoubleClicked={onCellClicked}
                    onFilterChanged={JieRu_onTableFilterChanged}
                    defaultColDef={this.state.defaultColDef} columnDefs={table_option.NewJieRuColumns} rowData={new_trans_loop_data} />
                </div>
            </Spin>
          </Tabs.TabPane>
          <Tabs.TabPane tab={<span><Icon type="gateway" />汇聚骨干弱光</span>} key="汇聚骨干弱光">
            <Spin spinning={loading} tip={"数据读取中。。。"}>
              <div style={{width:"100%",}}>{total_context}</div>
                <div className="ag-theme-alpine" style={{height: h, width: '100%',}}>
                  <AgGridReact
                    onGridReady={params => {
                      params.api.sizeColumnsToFit();
                      this.setState({HuiJuLow_GridReady_obj: params});
                    }}
                    //展开子告警
                    masterDetail={true}
                    isRowMaster={ (dataItem) => (dataItem["alarm_count"] > 0)}
                    detailCellRendererParams={this.state.detailCellRendererParams(table_option.child_HuiJuLowColumns)}
                    //复选
                    rowSelection={'multiple'}
                    rowMultiSelectWithClick={true}
                    allowContextMenuWithControlKey={true}
                    getContextMenuItems={params => this.getContextMenuItems(params, user_type)}
                    localeText={this.state.localeText}
                    animateRows={true}
                    onCellDoubleClicked={onCellClicked}
                    onFilterChanged={HuiJuLow_onTableFilterChanged}
                    defaultColDef={this.state.defaultColDef} columnDefs={table_option.NewHuiJuColumns} rowData={new_convergeAlarmLow_data} />
                </div>
            </Spin>
          </Tabs.TabPane>
        </Tabs>

      </div>
    )
  }

}

export default TableComponent;
