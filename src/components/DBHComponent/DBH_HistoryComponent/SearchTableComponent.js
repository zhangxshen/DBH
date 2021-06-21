import React from "react";
import {Spin} from 'antd';
import styles from './SearchTableComponent.less';
import {AgGridReact} from "ag-grid-react";
import table_option from "../tables_options";
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
    // this.scene.destroy();
  }
  componentDidMount() {
  }


  render() {
    const {search_data,  search_count, search_total,  search_loading, onCellClicked} = this.props;

    //重组 convergeAlarm_data
    const new_search_data = [];
    search_data.forEach( convergeAlarm_data_item => {
      const new_item = {...convergeAlarm_data_item};
      const {manage_log, duration_time, time_stamp, event_time, cancel_time, severity_keycode, trans_loops, special_field15 } = convergeAlarm_data_item;
      new_item["manage_log_text"] = table_option.markManageLogText(manage_log);
      new_item["manage_log_type"] = table_option.markManageLogType(manage_log);
      new_item["duration_time"] = table_option.changeSecondToDuration(duration_time);

      new_item["time_stamp"] =  (time_stamp) ? moment(parseInt(time_stamp * 1000)).format("YYYY-MM-DD HH:mm:ss") : null;
      new_item["event_time"] =  (event_time) ? moment(event_time).format("YYYY-MM-DD HH:mm:ss") : null;
      new_item["cancel_time"] =  (cancel_time) ? moment(cancel_time).format("YYYY-MM-DD HH:mm:ss") : null;
      new_item["severity_keycode"] = table_option.markAlarmType(severity_keycode, special_field15) ;
      if(trans_loops && trans_loops.length > 0 ) {
        if(trans_loops.length  === 1) {
          const trans_loops_item = trans_loops[0];
          const {risk_score, sysytem_name, subnet_name, train_count, manage_count, twin_aaa_count} = trans_loops_item;
          new_item["risk_score"] = risk_score;
          new_item["is_important"] = (risk_score && risk_score > 59) ? "是" : "否" ;
          new_item["worker_obj"] = table_option.isWorkerObj(trans_loops_item) ;
          new_item["train_count"] = train_count;
          new_item["manage_count"] = manage_count;
          new_item["twin_aaa_count"] = twin_aaa_count;

          new_item["sysytem_name"] = sysytem_name;
          new_item["subnet_name"] = subnet_name;
        } else {
          let risk_score_text = 0,is_important_text = "", worker_obj_text = "", sysytem_name_text= "", subnet_name_text="",
            train_count_text = "", manage_count_text = "", twin_aaa_count_text = "";
          trans_loops.forEach( trans_loops_item => {
            const {risk_score, sysytem_name, subnet_name,  train_count, manage_count, twin_aaa_count} = trans_loops_item;
            if(risk_score > risk_score_text) risk_score_text = risk_score;
            sysytem_name_text += sysytem_name + "；";
            subnet_name_text += subnet_name + "；";

            train_count_text += "【" + sysytem_name + "】" + train_count  + "；";
            manage_count_text += "【" + sysytem_name + "】" + manage_count  + "；";
            twin_aaa_count_text += "【" + sysytem_name + "】" + twin_aaa_count + "；";
            worker_obj_text += "【" + sysytem_name + "】" + table_option.isWorkerObj(trans_loops_item)  + "；";
          });
          new_item["risk_score"] = risk_score_text;
          new_item["is_important"] = (risk_score_text && risk_score_text > 59) ? "是" : "否" ;
          new_item["train_count"] = train_count_text;
          new_item["manage_count"] = manage_count_text;
          new_item["twin_aaa_count"] = twin_aaa_count_text;
          new_item["worker_obj"] = worker_obj_text;
          new_item["sysytem_name"] = sysytem_name_text;
          new_item["subnet_name"] = subnet_name_text;
        }
      } else if (table_option.markAlarmType(severity_keycode, special_field15) === "接入中断") {
        new_item["risk_score"] = null;
        new_item["is_important"] = "缺数据" ;
        new_item["worker_obj"] = "缺数据" ;
        new_item["sysytem_name"] = "缺数据" ;
        new_item["subnet_name"] = "缺数据" ;
      } else {
        new_item["risk_score"] = null;
        new_item["is_important"] = "汇聚骨干环" ;
        new_item["train_count"] = "汇聚骨干无需业务数据" ;
        new_item["manage_count"] = "汇聚骨干无需业务数据" ;
        new_item["twin_aaa_count"] = "汇聚骨干无需业务数据" ;
        new_item["worker_obj"] = "汇聚骨干无需业务数据" ;
        new_item["sysytem_name"] = "汇聚骨干无需最小环数据" ;
        new_item["subnet_name"] = "汇聚骨干无需最小环数据" ;
      }

      new_search_data.push(new_item);
    });
    let total_context = "";  // 保存描述文字
    if(this.state.GridReady_obj) {
      total_context = total_context + "表格内告警总数为：" + this.state.GridReady_obj.api.getDisplayedRowCount();
    }
    const process = (search_total !== 0) ? (search_count / search_total * 100).toFixed(0) : null;

    return (
      <div className={styles.table_body}>
        <Spin spinning={search_loading} tip={<div>已查找到 <b>{search_count} 条（{process}%）</b> 数据！</div>} >
          <div style={{width:"100%", background:"white", padding:"10px 20px"}}>{total_context}</div>
          <div className="ag-theme-alpine" style={{height: '540px', width: '100%',}}>
            <AgGridReact

              onGridReady={params => {
                params.api.sizeColumnsToFit();
                this.setState({GridReady_obj: params});
              }}
              // allowContextMenuWithControlKey={true}
              // getContextMenuItems={this.getContextMenuItems}
              localeText={this.state.localeText}
              animateRows={true}
              onCellDoubleClicked={onCellClicked}
              defaultColDef={this.state.defaultColDef} columnDefs={table_option.totalColumns} rowData={new_search_data} />
          </div>
        </Spin>
      </div>
    );
  }

}

export default TableComponent;
