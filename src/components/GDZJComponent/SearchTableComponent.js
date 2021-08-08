import React from "react";
import {Spin, Tabs, Icon} from 'antd';
import styles from './SearchTableComponent.less';
import {AgGridReact} from "ag-grid-react";
import table_option from "./tables_options";
import moment from "moment";

class TableComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      GridReady_obj:null,
      defaultColDef : {
        flex: 1,
        // minWidth: 200,
        resizable: true,
        sortable: true, //开启排序
        floatingFilter: true,
        filterParams: {
          excelMode: 'mac', // can be 'windows' or 'mac'
        },
      },
      localeText: {
        applyFilter: 'OK',
        cancelFilter: 'Cancel',
        resetFilter: 'Clear Filter',
      },
    };
  }
  componentWillUnmount() {
  }
  componentDidMount() {
  }


  render() {
    const {search_data,  search_count, search_total,  search_loading, onCellClicked, select_seriesName, tab_onChange} = this.props;

    const new_search_data = [];
    var data_one = [], data_two = [];
    search_data.forEach( convergeAlarm_data_item => {
      const new_item = {...convergeAlarm_data_item};
      new_item["op_time"] = moment(new_item["op_time"]).format("YYYY-MM-DD HH:mm:ss");
      new_item["fault_happen_time"] = moment(new_item["fault_happen_time"]).format("YYYY-MM-DD HH:mm:ss");
      new_item["fault_found_time"] = moment(new_item["fault_found_time"]).format("YYYY-MM-DD HH:mm:ss");
      new_item["alarm_cancel_time"] = moment(new_item["alarm_cancel_time"]).format("YYYY-MM-DD HH:mm:ss");
      new_item["apply_end_time"] = moment(new_item["apply_end_time"]).format("YYYY-MM-DD HH:mm:ss");
      new_search_data.push(new_item);
      if (new_item["problem_eoms"]){
        data_one = new_search_data
      }else if (new_item["maybe_eoms"]){
        data_two = new_search_data
      };
    });
    
    let total_context = "";  // 保存描述文字
    if(this.state.GridReady_obj) {
      total_context = total_context + "表格内告警总数（无筛选）为：" + this.state.GridReady_obj.api.getDisplayedRowCount();
    }
    // const process = (search_total !== 0) ? (search_count / search_total * 100).toFixed(0) : null;

    return (
      <div className="card-container">
        <Tabs type="card" activeKey={select_seriesName} onChange={tab_onChange}>
          <Tabs.TabPane tab={<span><Icon type="info-circle" />问题工单</span>} key="问题工单">
            <Spin spinning={search_loading} tip="正在查询后台数据，请稍后……">
              <div style={{width:"100%", background:"white", padding:"10px 20px"}}>{total_context}</div>
              <div className="ag-theme-alpine" style={{height: '540px', width: '100%',}}>
                <AgGridReact
                  onGridReady={params => {
                    params.api.sizeColumnsToFit();
                    this.setState({GridReady_obj: params});
                  }}
                  localeText={this.state.localeText}
                  animateRows={true}
                  onCellDoubleClicked={onCellClicked}
                  defaultColDef={this.state.defaultColDef} columnDefs={table_option.totalColumns} rowData={data_one} />
              </div>
            </Spin>
          </Tabs.TabPane>
          <Tabs.TabPane tab={<span><Icon type="question-circle" />疑似制造工单</span>} key="疑似制造工单">
            <Spin spinning={search_loading} tip="正在查询后台数据，请稍后……">
              <div style={{width:"100%", background:"white", padding:"10px 20px"}}>{total_context}</div>
              <div className="ag-theme-alpine" style={{height: '540px', width: '100%',}}>
                <AgGridReact
                  onGridReady={params => {
                    params.api.sizeColumnsToFit();
                    this.setState({GridReady_obj: params});
                  }}
                  localeText={this.state.localeText}
                  animateRows={true}
                  onCellDoubleClicked={onCellClicked}
                  defaultColDef={this.state.defaultColDef} columnDefs={table_option.totalColumns2} rowData={data_two} />
              </div>
            </Spin>
          </Tabs.TabPane>
        </Tabs>
      </div>
    );
  }

}

export default TableComponent;
