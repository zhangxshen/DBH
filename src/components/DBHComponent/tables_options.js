import moment from 'moment';
import {Divider, Button, Icon, List, Timeline, Tooltip} from "antd";
import React from "react";

const tables_options = {
  changeSecondToDuration: (text) => {
    const second = text / 1000;
    const days = Math.floor(second / 86400);
    const hours = Math.floor((second % 86400) / 3600);
    const minutes = Math.floor(((second % 86400) % 3600) / 60);
    const seconds = Math.floor(((second % 86400) % 3600) % 60);

    const day_str = (days !== 0) ? days + "天" : null;
    const hour_str = (hours !== 0) ? hours + "小时" + minutes + "分" : null;
    const minute_str = (minutes !== 0) ? minutes + "分" : null;
    const second_str = (seconds !== 0) ? seconds + "秒" : "";

    const rtn = (second / 3600).toFixed(2);

    return parseFloat(rtn);
    // if(day_str) {
    //   return day_str;
    // } else
    //   if(hour_str) {
    //   return hour_str;
    // } else if(minute_str) {
    //   return minute_str + second_str;
    // } else {
    //   return second_str;
    // }
  },
  markManageLogType: (value) => {
    // "[{"nickname":"广州-广州通用维护员","content_text":"微波已经停用，信源站点改到了清澜路，这个光路可以删除了","create_time":"2020-12-03 14:31"},{"nickname":"广州-广州通用维护员","content_text":"环带链，非单边，申请剔除","create_time":"2020-12-03 14:47"}]"
    let rtn = "未管控";
    // console.log("value",value);
    const manager_json = JSON.parse(value);
    if(manager_json && manager_json.length > 0) {
      const last_manager_json = manager_json[manager_json.length - 1];
      const {action_type} = last_manager_json;
      rtn = (action_type) ? action_type : "有管控记录";
    }
    return rtn;
  },
  markManageLogText: (value) => {
    let manager_text = null;
    if(value) {
      const manager_json = JSON.parse(value);
      const manager_json_item = (manager_json && manager_json.length > 0) ? manager_json[manager_json.length - 1] :  {nickname: "数据缺失", content_text: "数据缺失", create_time: "数据缺失"};
      manager_text = manager_json_item.content_text;
    }
    return manager_text;
  },
  markManageLog : (value) => {
    if(!value) {
      return '<span><i aria-label="icon: meh" class="anticon anticon-meh" style="margin-right: 10px"><svg viewBox="64 64 896 896" focusable="false" class="" data-icon="meh" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zM288 421a48.01 48.01 0 0 1 96 0 48.01 48.01 0 0 1-96 0zm384 200c0 4.4-3.6 8-8 8H360c-4.4 0-8-3.6-8-8v-48c0-4.4 3.6-8 8-8h304c4.4 0 8 3.6 8 8v48zm16-152a48.01 48.01 0 0 1 0-96 48.01 48.01 0 0 1 0 96z"></path></svg></i>无记录</span>'
    } else {
      return '<span style="color: blue;"><i aria-label="icon: edit" class="anticon anticon-edit"><svg viewBox="64 64 896 896" focusable="false" class="" data-icon="edit" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32zm-622.3-84c2 0 4-.2 6-.5L431.9 722c2-.4 3.9-1.3 5.3-2.8l423.9-423.9a9.96 9.96 0 0 0 0-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2a33.5 33.5 0 0 0 9.4 29.8c6.6 6.4 14.9 9.9 23.8 9.9z"></path></svg></i>'+value+'</span>';
    }

    // <span style="color: blue"><i aria-label="icon: message" className="anticon anticon-message"><svg viewBox="64 64 896 896" focusable="false" className="" data-icon="message" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M924.3 338.4a447.57 447.57 0 0 0-96.1-143.3 443.09 443.09 0 0 0-143-96.3A443.91 443.91 0 0 0 512 64h-2c-60.5.3-119 12.3-174.1 35.9a444.08 444.08 0 0 0-141.7 96.5 445 445 0 0 0-95 142.8A449.89 449.89 0 0 0 65 514.1c.3 69.4 16.9 138.3 47.9 199.9v152c0 25.4 20.6 46 45.9 46h151.8a447.72 447.72 0 0 0 199.5 48h2.1c59.8 0 117.7-11.6 172.3-34.3A443.2 443.2 0 0 0 827 830.5c41.2-40.9 73.6-88.7 96.3-142 23.5-55.2 35.5-113.9 35.8-174.5.2-60.9-11.6-120-34.8-175.6zM312.4 560c-26.4 0-47.9-21.5-47.9-48s21.5-48 47.9-48 47.9 21.5 47.9 48-21.4 48-47.9 48zm199.6 0c-26.4 0-47.9-21.5-47.9-48s21.5-48 47.9-48 47.9 21.5 47.9 48-21.5 48-47.9 48zm199.6 0c-26.4 0-47.9-21.5-47.9-48s21.5-48 47.9-48 47.9 21.5 47.9 48-21.5 48-47.9 48z"></path></svg></i>暂无记录</span>
  },
  markWorkerObjList : (detail_data, ) => {
    let work_list = [];
    let {g2_count, g4_count, train_count, manage_count, twin_aaa_count,
      g2_business, g4_business, rru_business, manage_business, twin_aaa_business
    } = detail_data;
    if(!g2_count) g2_count = 0;
    if(!g4_count) g4_count = 0;
    if(!train_count) train_count = 0;
    if(!manage_count) train_count = 0;
    if(!twin_aaa_count) train_count = 0;

    if(twin_aaa_count > 0 && twin_aaa_business) {
      work_list.push(<div key={"work_obj_aaa"}><b>跨省3A电路编号为：</b></div>);
      twin_aaa_business.toString().split(",").forEach((business_item, business_index) => {
        work_list.push(<div key={"work_obj_aaa_" + business_index}>{business_index + 1}.{business_item}</div>);
      });
    }
    if(manage_count > 0 && manage_business) {
      work_list.push(<div key={"work_obj_manage"}><b>普通集客电路编号为：</b></div>);
      manage_business.toString().split(",").forEach((business_item, business_index) => {
        work_list.push(<div key={"work_obj_manage_" + business_index}>{business_index + 1}.{business_item}</div>);
      });
    }
    if(g2_count > 0 && g2_business) {
      work_list.push(<div key={"work_obj_2G"}><b>2G基站名称为：</b></div>);
      //基站名称，用逗号就行
      work_list.push(<div key={"work_obj_2G_content"}>{g2_business.toString()}</div>);
      // g2_business.toString().split(",").forEach((business_item, business_index) => {
      //   work_list.push(<div key={"work_obj_2G_" + business_index}>{business_index + 1}.{business_item}</div>);
      // });
    }
    if(g4_count > 0 && g4_business) {
      work_list.push(<div key={"work_obj_4G"}><b>4G基站名称为：</b></div>);
      work_list.push(<div key={"work_obj_4G_content"}>{g4_business.toString()}</div>);
      // g4_business.toString().split(",").forEach((business_item, business_index) => {
      //   work_list.push(<div key={"work_obj_4G_" + business_index}>{business_index + 1}.{business_item}</div>);
      // });
    }
    if(train_count > 0 && rru_business) {
      work_list.push(<div key={"work_obj_RRU"}><b>高铁RRU名称为：</b></div>);
      work_list.push(<div key={"work_obj_rru_content"}>{rru_business.toString()}</div>);
      // rru_business.toString().split(",").forEach((business_item, business_index) => {
      //   work_list.push(<div key={"work_obj_RRU_" + business_index}>{business_index + 1}.{business_item}</div>);
      // });
    }

    return work_list;
  },
  markAlarmType : (severity_keycode, special_field15) => {
    let rtn = "接入中断";
    if (severity_keycode == 25){
        rtn = "汇聚骨干";
    }else if (severity_keycode == 26){
      rtn = "汇聚骨干弱光";
    }

    return rtn;
  },
  markSuperviseColor : (value, isAgGrid) => {

    let rtn = value;
    if(value === '一级督办') {
      rtn = (isAgGrid) ?
        "<div style='background: #d5d328; text-align: center; color: white; font-weight: bold;'>" + rtn + "</div>" :
      <div style={{padding:"5px 20px", background: "#d5d328", textAlign: "center", color: "white", fontWeight: "bold"}}>{rtn}</div>
      ;
    }
    else if (value === '二级督办') {
      rtn =  (isAgGrid) ?
        "<div style='background: darkorange; text-align: center; color: white; font-weight: bold;'>" + rtn + "</div>" :
        <div style={{padding:"5px 20px",background: "darkorange", textAlign: "center", color: "white", fontWeight: "bold"}}>{rtn}</div>
      ;
    }
    else if (value === '三级督办') {
      rtn =   (isAgGrid) ?
        "<div style='background: red; text-align: center; color: white; font-weight: bold;'>" + rtn + "</div>" :
        <div style={{padding:"5px 20px",background: "red", textAlign: "center", color: "white", fontWeight: "bold"}}>{rtn}</div>
      ;
    }
    else {
      rtn =   (isAgGrid) ?
        "<div style=' text-align: center; '>" + rtn + "</div>" :
        <p>督办类型：{rtn}</p>;
      ;
    }

    return rtn;
  },
  createDescriptions : ({select_seriesName, detail_data}) => {
    // console.log("select_seriesName", select_seriesName);
    if(detail_data) {
      const col = (select_seriesName === "汇聚骨干") ? tables_options.NewHuiJuColumns : tables_options.NewJieRuColumns;

      return <List itemLayout="horizontal" dataSource={col} renderItem={col_item => {
        const {field, headerName, cellRenderer} = col_item;
        if (detail_data[field] && (field !== "manage_log_text") ) {

          let content = (cellRenderer && cellRenderer !== "agGroupCellRenderer") ? cellRenderer({value: detail_data[field], data:detail_data}) : detail_data[field];
          //业务详情要列举
          const work_obj_list = (field === "worker_obj") ? tables_options.markWorkerObjList(detail_data) : null;
          if( field === "supervise") {
            content = <Tooltip placement="left" title={detail_data["supervise_text"]}>{tables_options.markSuperviseColor(detail_data["supervise"])}</Tooltip>;
          }
          else {
            content = <p><b>{headerName}：</b>{content.toString()}</p>;
          }
          return <List.Item><div>{content}{work_obj_list}</div></List.Item>;
        } else {
          return <div/>;
        }
      }} />;
    }
  },
  createTimeLine : (detail_data) => {
    let rtn = null;
    if(detail_data) {
      const {manage_log,} = detail_data;

      if(manage_log) {
        const manage_log_json = JSON.parse(manage_log);
        rtn = manage_log_json.map((manage_log_json_item, index) => {
          // {nickname: "cds", content_text: "cds", create_time}
          const {nickname, content_text, create_time, fileList} = manage_log_json_item;
          // console.log(fileList);
          const fileList_child = (fileList) ?
            fileList.map((fileList_item,fileList_index) => <span key={"span_" +fileList_index}><a key={"a_"+fileList_index} href={fileList_item.url} target={"_bank"}>{fileList_item.name}</a></span>)
        : null;
          const attachment = <div>{fileList_child}</div>;
          return (<Timeline.Item key={"timeline_item_" + index} dot={<Icon type="form" style={{ fontSize: '16px' }} />} color="blue">
            <div>{create_time}：{content_text}（{nickname}）</div>
            {attachment}
          </Timeline.Item>)
        });

        rtn = <Timeline>{rtn}</Timeline>;
      }
    }

    return rtn;
  },

  createEomsItem: (sheet_type, sheet_no, eoms_detail_data, eoms_menu_ticket, ) => {
    let rtn = [];

    const add_text = (eoms_menu_ticket && eoms_menu_ticket.length > 0) ? "，请在EOMS系统内打开以下链接查看：" : null;
    const eoms_url = (eoms_menu_ticket && eoms_menu_ticket.length > 0) ?
      <List style={{marginTop:10}} key={"eoms_url"} size="small" bordered dataSource={eoms_menu_ticket} renderItem={item => {
        const {billmanID, createTime, displayEntry, id, processID, workItemID,
          // activityInstID, itype, label, ticketFlag, value,
        } = item;
    //     // http://eomswf.gmcc.net/default/com.huawei.nsm.gzcl.ticketView.flow?billmainid=31433712&type=commoncx&processInstID=59274577&activityInstID=&workItemID=439985509&processID=23&createTime=2020-9-21.9.37.%201.%200
        const url_text = encodeURI(`http://eomswf.gmcc.net/default/${displayEntry}?billmainid=${billmanID}&type=commoncx&processInstID=${id}&activityInstID=&workItemID=${workItemID}&processID=${processID}&createTime=${createTime}`);
        return <List.Item><Icon type="warning" theme="filled" style={{color:"red"}} /> 由于EOMS只支持IE浏览器打开，请另行打开EOMS系统后输入以下地址，即可查看EOMS工单信息：<br />{url_text}</List.Item>
      }
      } /> : null;
    //
    if(eoms_detail_data) {
      const {code, msg, data} = eoms_detail_data;
      rtn.push(<Divider key={"eoms_" + sheet_no} orientation="left" >{sheet_type}：{sheet_no}</Divider>);
      if(code !== 0) {
        rtn.push(<div key={"eoms_err"} >此EOMS工单 “{sheet_no}”已归档{add_text}</div>);
      } else {
        const { alarmlist, rtCode, rtMessage
          // alarmCounts,
        } = data;
        if(rtCode !== 0) {
          rtn.push(<div key={"eoms_err"} >{rtMessage}{add_text}</div>);
        } else {
          const {createTime, alarmClearTime,alarmTitle, alarmparticipant, failureOccurTime,premessage,
            shiftparticipant, suggestion, taskstatus, treatmentman,  // eomsId,
            // faultyEquipmentmanufacturers, networkClassification, alarmDesc, alarmName,alarmid,NEName,
          } = alarmlist;

          const ListData = [
            {name:"工单状态", value:taskstatus},
            {name:"建单时间", value:createTime},
            {name:"故障发生时间", value:failureOccurTime},
            {name:"告警清除时间", value:alarmClearTime},
            {name:"预处理信息", value:premessage},
            {name:"工单主题", value:alarmTitle},
            {name:"告警对象", value:alarmparticipant},
            {name:"移交对象", value:shiftparticipant},
            {name:"处理人", value:treatmentman},
            {name:"处理措施", value:suggestion},
          ];

          rtn.push(<List key={"eoms_list"}  style={{marginTop:10}}
                         size="small"
                         bordered
                         dataSource={ListData}
                         renderItem={item => <List.Item><b>{item.name}:</b>{item.value}</List.Item>}
          />);
          rtn.push(eoms_url);
        }
      }
    }

    return rtn;
  },
  createEoms : (detail_data, onEomsButtonClick, eoms_detail_data, eoms_menu_ticket, ) => {
    let rtn = [];
    //
    if(detail_data && detail_data["sheet_no"]) {
      let sheet_no_list = {"master" : detail_data["sheet_no"]};
      if(detail_data.alarms && detail_data.alarms.length > 0) {
        let slave = [];
        detail_data.alarms.forEach(alarms_item => (alarms_item["sheet_no"]) ? slave.push(alarms_item["sheet_no"]) : null);
        sheet_no_list["slave"] = slave;
      }
      rtn.push(<Divider key={"eoms_divider"} orientation="left" >EOMS信息</Divider>);
      rtn.push(<Button key={"eoms_button"} type="primary" onClick={() => onEomsButtonClick(sheet_no_list)}>点击查询EOMS信息</Button>)
    }
      // const {sheet_no, value} = master_eoms;
    if(eoms_detail_data) {
      const {master_eoms, slave_eoms} = eoms_detail_data;
      const {master_ticket, slave_ticket} = eoms_menu_ticket;
      rtn.push(tables_options.createEomsItem("主告警工单", master_eoms.sheet_no, master_eoms.value, master_ticket.value));
      if(slave_eoms &&slave_eoms.length > 0) {
        slave_eoms.forEach(slave_eoms_item => {
          let slave_ticket_item = null;
          for(let i = 0;i < slave_ticket.length;i++) {
            if(slave_ticket[i]["sheet_no"] === slave_eoms_item.sheet_no) slave_ticket_item = slave_ticket[i]["value"];
          }

          //console.log("slave_eoms_item.sheet_no, slave_eoms_item.value, slave_ticket_item", slave_eoms_item.sheet_no, slave_eoms_item.value, slave_ticket_item);
          rtn.push(tables_options.createEomsItem("子告警工单", slave_eoms_item.sheet_no, slave_eoms_item.value, slave_ticket_item));
        });

      }
    }

    // console.log(rtn);

    return rtn;
  },
  markGuanKongData : (detail_data, values) => {
    const { fp, alarms
      // manage_log,
    } = detail_data;
    let fps = [fp];
    //如果有子告警，一并打上管控记录
    if(alarms) {
      alarms.forEach(alarms_item => {
        if(alarms_item["fp"]) fps.push(alarms_item["fp"]);
      })
    }
    //增加在后台push，不需要前台push，直接传{}json
    // let post_log = (manage_log) ? JSON.parse(manage_log) : [];
    // post_log.push(values);

    return {fps, post_log: values}
  },
  isImportant:(item) => {
    // let rtn = "<span style='color: green'>× 否</span>";
    let rtn = null;
    if(item.value === 1 || item.value === "1") {
      let {provincial_manage_count,aaa_count,government_count} = item.data;
      if(!provincial_manage_count) provincial_manage_count = 0;
      if(!aaa_count) aaa_count = 0;
      if(!government_count) government_count = 0;
      rtn = `军政:${government_count}，3A:${aaa_count}，省管专线:${provincial_manage_count}`;
    }

    return rtn;
  },
  isWorkerObj:(item) => {
    let {g2_count, g4_count, train_count, manage_count, twin_aaa_count} = item;
    if(!g2_count) g2_count = 0;
    if(!g4_count) g4_count = 0;
    if(!train_count) train_count = 0;
    if(!manage_count) manage_count = 0;
    if(!twin_aaa_count) twin_aaa_count = 0;
    //manage_count: 1twin_aaa_count: 0
    return (!g2_count && !g4_count && !train_count && !manage_count && !twin_aaa_count) ? "无关联业务" :
      `2G:${g2_count}，4G:${g4_count}`;
     // `双跨3A:${twin_aaa_count}，普通集客:${manage_count}，2G:${g2_count}，4G:${g4_count}，高铁:${train_count}`;
  },
  HuiJu_columns : [
    {
      title: '地市',
      dataIndex: 'city_name',
      key: 'city_name',
      width:120,
      align:"center",
    },
    {
      title: '厂家',
      dataIndex: 'vendor_name',
      key: 'vendor_name',
      width:100,
      align:"center",
    },
    {
      title: '设备类型',
      dataIndex: 'eqp_object_class',
      key: 'eqp_object_class',
      width:100,
      align:"center",
    },
    {
      title: '持续时长',
      dataIndex: 'duration_time',
      key: 'duration_time',
      width:150,
      align:"center",
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.duration_time - b.duration_time,
      render:(text,) => tables_options.changeSecondToDuration(text),
    },
    {
      title: '告警发生时间',
      dataIndex: 'event_time',
      key: 'event_time',
      width: 150,
      align: "center",
      sorter: (a, b) => a.event_time - b.event_time,
      render: (text) => moment(text).format("YYYY-MM-DD HH:mm:ss")
    },
    {
      title: '告警定位对象',
      dataIndex: 'ne_label',
      key: 'ne_label',
      // align:"center",
    },
    {
      title: '告警标题',
      dataIndex: 'title_text',
      key: 'title_text',
    },
    {
      title: '所属子网',
      dataIndex: 'special_field9',
      key: 'special_field9',
      // align:"center",
    },
    {
      title: '工单号',
      dataIndex: 'sheet_no',
      key: 'sheet_no',
      width:400,
      align:"center",
    },
    {
      title: '管控记录',
      dataIndex: '管控记录',
      key: '管控记录',
      width:150,
      align:"center",
    },
    {
      title: 'fp',
      dataIndex: 'fp',
      key: 'fp',
      width:350,
      align:"center",
    },
  ],
  JieRu_columns : [
  {
    title: '地市',
    dataIndex: 'city_name',
    key: 'city_name',
    width:120,
    align:"center",
  },
  {
    title: '厂家',
    dataIndex: 'vendor_name',
    key: 'vendor_name',
    width:100,
    align:"center",
  },
  {
    title: '设备类型',
    dataIndex: 'eqp_object_class',
    key: 'eqp_object_class',
    width:100,
    align:"center",
  },
  {
    title: '持续时长',
    dataIndex: 'duration_time',
    key: 'duration_time',
    width:150,
    align:"center",
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.duration_time - b.duration_time,
    render:(text,) => tables_options.changeSecondToDuration(text),
  },
  {
      title: '告警发生时间',
      dataIndex: 'event_time',
      key: 'event_time',
      width:150,
      align:"center",
      sorter: (a, b) => a.event_time - b.event_time,
      render: (text) => moment(text).format("YYYY-MM-DD HH:mm:ss")
  },
  {
    title: '重要环',
    dataIndex: 'is_important',
    key: 'is_important',
    width:100,
    align:"center",
    filters:[{text:"是", value: 1}, {text:"否", value: 0}, {text:"暂无数据", value : ""}],
    onFilter:(value, record) => {},
    render: (text) => {
      let rtn = "暂无数据";
      if(text) {
        rtn = (text === 1) ? <Icon style={{colon: "blue"}} type="check-circle" theme="filled"/> :
          <Icon type="close-circle" theme="filled"/>;
      }

      return rtn;
    }
  },
  {
    title: '业务详情',
    dataIndex: '业务详情',
    key: '业务详情',
    width:100,
    align:"center",
  },
  {
    title: '告警定位对象',
    dataIndex: 'ne_label',
    key: 'ne_label',
  },
  {
    title: '告警标题',
    dataIndex: 'title_text',
    key: 'title_text',
  },
  {
    title: '所属子网',
    dataIndex: 'subnet_name',
    key: 'subnet_name',
    width:200,
    // align:"center",
  },
  {
    title: '所属传输系统',
    dataIndex: 'sysytem_name',
    key: 'sysytem_name',
    width:200,
    align:"center",
  },
  {
    title: '工单号',
    dataIndex: 'sheet_no',
    key: 'sheet_no',
    width:400,
    align:"center",
  },
  {
    title: '管控记录',
    dataIndex: '管控记录',
    key: '管控记录',
  },
  {
      title: 'fp',
      dataIndex: 'fp',
      key: 'fp',
      width:350,
      align:"center",
    },
],
  createFilter:(key_name_array, columns_name, filteredInfo, data) => {

    if(data) {
      key_name_array.forEach( key_name => {
        let rtn = [];
        data.forEach( data_item => {
          if(data_item[key_name]) {
            const filter_option = data_item[key_name];

            let isExists = false;
            for(let i = 0; i < rtn.length; i++) {
              if(rtn[i]["value"] === filter_option) {
                isExists = true;
                break;
              }
            }

            if(!isExists) rtn.push({text: filter_option, value:filter_option});
          }
        });
        if(tables_options[columns_name]) {
          const add_filter_col = tables_options[columns_name];
          for(let i = 0; i < add_filter_col.length; i++) {
            if(add_filter_col[i]["dataIndex"] === key_name) {
              add_filter_col[i]["filters"] = rtn;
              add_filter_col[i]["onFilter"] = (value, record) => {
                if(record[key_name]) {
                  return record[key_name].includes(value);
                }
              };
              if(filteredInfo ) {
                if(filteredInfo[key_name]) add_filter_col[i]["filteredValue"] = filteredInfo[key_name] || null;
              } else {
                add_filter_col[i]["filteredValue"] = null;
              }

              break;
            }
          }
        }
      });

    }

    // return tables_options[columns_name];
  },
  NewHuiJuColumns:[
    {
      headerName: ' ',
      // headerCheckboxSelection: true,
      checkboxSelection: true,
      floatingFilter: false,
      suppressMenu: true,
      minWidth: 50,
      maxWidth: 50,
      width: 50,
      flex: 0,
      resizable: false,
      sortable: false,
      editable: false,
      filter: false,
      suppressColumnsToolPanel: true,
    },
    {headerName: "督办类型",  minWidth: 130 ,  suppressSizeToFit: true,  field: "supervise",filter: 'agSetColumnFilter',
      cellRenderer: (item) => tables_options.markSuperviseColor(item.value,true)
    },
    {headerName: "管控记录",  minWidth: 180 ,  suppressSizeToFit: true,  field: "manage_log_text",filter: 'agSetColumnFilter',
      cellRenderer: (item) => tables_options.markManageLog(item.value)
    },
    {headerName: "告警合并数", field: "alarm_count",filter: false, minWidth: 120 ,
      cellRenderer: "agGroupCellRenderer"},  //agGroupCellRenderer
    {headerName: "地市", minWidth: 130 , field: "city_name",filter: 'agSetColumnFilter',},
    {headerName: "厂家",  minWidth: 100 ,  suppressSizeToFit: true,  field: "vendor_name",filter: 'agSetColumnFilter'},
    {headerName: "设备类型",minWidth: 110 ,  suppressSizeToFit: true,  field: "eqp_object_class",filter: 'agSetColumnFilter'},
    {headerName: "持续时长（小时）", minWidth: 130 , field: "duration_time",filter: false,   sort: 'desc' ,
      cellRenderer: (item) =>  item.value + " 小时",
    },
    {headerName: "告警发现时间", minWidth: 170 , field: "time_stamp",filter: false,},
    {headerName: "告警发生时间", minWidth: 170 , field: "event_time",filter: false,
      // cellRenderer: (item) => moment(item.value).format("YYYY-MM-DD HH:mm:ss"),
    },
    {headerName: "告警定位对象",minWidth: 470, field: "ne_label",filter: 'agSetColumnFilter'},
    {headerName: "告警标题",minWidth: 320, field: "title_text",filter: 'agSetColumnFilter'},
    {headerName: "所属子网", field: "subnet_name", minWidth: 320 ,filter: 'agSetColumnFilter'},
    {headerName: "资源关联信息",minWidth: 370, field: "special_field9",filter: 'agSetColumnFilter'},
    {headerName: "所属片区", field: "corr_str", minWidth: 120 ,filter: 'agSetColumnFilter'},
    {headerName: "代维信息", field: "special_field18", minWidth: 320 ,filter: 'agSetColumnFilter'},
    {headerName: "工单号",minWidth: 270, field: "sheet_no",filter: 'agSetColumnFilter'},
    {headerName: "fp", minWidth: 130, field: "fp",filter: 'agSetColumnFilter'},
  ],
  child_HuiJuColumns: [
    {headerName: "地市", minWidth: 110 , field: "city_name",},
    {headerName: "厂家",  minWidth: 100 , field: "vendor_name",},
    {headerName: "设备类型",minWidth: 110 , field: "eqp_object_class",},
    {headerName: "持续时长", minWidth: 130 ,  sort: 'desc' , cellRenderer: (item) => tables_options.changeSecondToDuration(item.value) + "小时", field: "duration_time",},
    {headerName: "告警发现时间", minWidth: 170 , field: "time_stamp",  cellRenderer: (item) => moment(item.value * 1000).format("YYYY-MM-DD HH:mm:ss")},
    {headerName: "告警发生时间", minWidth: 170 , field: "event_time", cellRenderer: (item) => moment(item.value).format("YYYY-MM-DD HH:mm:ss")},
    {headerName: "告警定位对象", minWidth:470, field: "ne_label"},
    {headerName: "告警标题", minWidth:220, field: "title_text"},
    {headerName: "所属子网", minWidth:400, field: "subnet_name",},
    {headerName: "资源关联信息",minWidth: 270, field: "special_field9",},
    {headerName: "所属片区", field: "corr_str", minWidth: 120 ,filter: 'agSetColumnFilter'},
    {headerName: "代维信息", field: "special_field18", minWidth: 320 ,filter: 'agSetColumnFilter'},
    {headerName: "工单号", field: "sheet_no",minWidth: 270},
    {headerName: "fp",  field: "fp",minWidth: 170,},
  ],
  importantFormatter : (item) => {
    return  (item.value === 1 || item.value === "1") ? "<span style='color: red;font-weight: bold;font-size: 20px;'>✔ 是</span>" : "<span style='color: green'>× 无</span>";
  },
  NewJieRuColumns:[
    {
      headerName: ' ',
      // headerCheckboxSelection: true,
      checkboxSelection: true,
      floatingFilter: false,
      suppressMenu: true,
      minWidth: 50,
      maxWidth: 50,
      width: 50,
      flex: 0,
      resizable: false,
      sortable: false,
      editable: false,
      filter: false,
      suppressColumnsToolPanel: true,
    },
    {headerName: "督办类型",  minWidth: 130 ,  suppressSizeToFit: true,  field: "supervise",filter: 'agSetColumnFilter',
      cellRenderer: (item) => tables_options.markSuperviseColor(item.value,true)
    },
    {headerName: "管控记录",  minWidth: 180 ,  suppressSizeToFit: true,  field: "manage_log_text",filter: 'agSetColumnFilter',
      cellRenderer: (item) => tables_options.markManageLog(item.value)
    },
    // risk_score
    {headerName: "风险评分", field: "risk_score",filter: false, minWidth: 120 ,},  //agGroupCellRenderer
    {headerName: "重要环", field: "is_important",filter: 'agSetColumnFilter', minWidth: 110,
      // filterParams: {cellRenderer:(item) => (item.value === 1 || item.value === "1") ? "是" : "否"},
      // cellRenderer:(item) => tables_options.isImportant(item)
    } ,
    {headerName: "告警合并数", field: "alarm_count",filter: false, minWidth: 120 ,  cellRenderer: "agGroupCellRenderer"},  //agGroupCellRenderer
    {headerName: "地市", minWidth: 130 , field: "city_name", filter: 'agSetColumnFilter'},
    {headerName: "厂家",  minWidth: 100 ,  suppressSizeToFit: true,  field: "vendor_name",filter: 'agSetColumnFilter'},
    {headerName: "设备类型",minWidth: 110 ,  suppressSizeToFit: true,  field: "eqp_object_class",filter: 'agSetColumnFilter'},
    {headerName: "持续时长（小时）", minWidth: 130 , sort: 'desc', field: "duration_time",filter: false,
      cellRenderer: (item) =>  item.value + " 小时",
    },
    {headerName: "告警发现时间", minWidth: 170 , field: "time_stamp",filter: false,},
    {headerName: "告警发生时间", minWidth: 170 , field: "event_time",filter: false,
      // cellRenderer: (item) => moment(item.value).format("YYYY-MM-DD HH:mm:ss"),
    },
    // {headerName: "业务详情", minWidth: 340 , field: "worker_obj",filter: false,},
    // g2_count, g4_count, train_count, manage_count, twin_aaa_count
    {headerName: "双跨3A", minWidth: 120 , field: "twin_aaa_count",filter: false,},
    {headerName: "高铁RRU", minWidth: 120 , field: "train_count",filter: false,},
    {headerName: "普通集客", minWidth: 120 , field: "manage_count",filter: false,},
    {headerName: "基站业务", minWidth: 120 , field: "worker_obj",filter: false,},

    {headerName: "告警定位对象", minWidth: 400 , field: "ne_label",filter: 'agSetColumnFilter'},
    {headerName: "告警标题", minWidth: 340 , field: "title_text",filter: 'agSetColumnFilter'},
    {headerName: "所属子网", minWidth: 340 , field: "subnet_name",filter: 'agSetColumnFilter'},
    {headerName: "资源关联信息",minWidth: 370, field: "special_field9",filter: 'agSetColumnFilter'},
    {headerName: "所属传输系统",minWidth: 220 , field: "sysytem_name",filter: 'agSetColumnFilter'},
    {headerName: "所属片区", field: "corr_str", minWidth: 120 ,filter: 'agSetColumnFilter'},
    {headerName: "代维信息", field: "special_field18", minWidth: 320 ,filter: 'agSetColumnFilter'},
    {headerName: "工单号",minWidth: 270, field: "sheet_no",filter: 'agSetColumnFilter'},
    {headerName: "fp", minWidth: 170, field: "fp",filter: 'agSetColumnFilter'},
  ],
  child_JieRuColumns:[
    // risk_score
    {headerName: "风险评分", field: "risk_score",filter: false, minWidth: 120 ,},  //agGroupCellRenderer
    {headerName: "地市", minWidth: 110 , field: "city_name",},
    {headerName: "厂家", minWidth: 100 ,  field: "vendor_name",},
    {headerName: "设备类型",minWidth: 110 ,field: "eqp_object_class",},
    {headerName: "持续时长",minWidth: 130 , field: "duration_time", sort: 'desc' ,
      cellRenderer: (item) => tables_options.changeSecondToDuration(item.value) + "小时",
    },
    {headerName: "告警发现时间", minWidth: 170 , field: "time_stamp",  cellRenderer: (item) => moment(item.value * 1000).format("YYYY-MM-DD HH:mm:ss")},
    {headerName: "告警发生时间",minWidth: 170 ,field: "event_time", cellRenderer: (item) => moment(item.value).format("YYYY-MM-DD HH:mm:ss"), },

    {headerName: "业务详情", minWidth: 340 , field: "worker_obj", cellRenderer:(item) => tables_options.isWorkerObj(item.data),},
    {headerName: "告警定位对象", minWidth: 400 , field: "ne_label",},
    {headerName: "告警标题", minWidth: 220 , field: "title_text",},
    {headerName: "所属子网",minWidth: 220 , field: "subnet_name",},
    {headerName: "资源关联信息",minWidth: 370, field: "special_field9",filter: 'agSetColumnFilter'},
    {headerName: "所属传输系统",minWidth: 220 ,field: "sysytem_name",},
    {headerName: "所属片区", field: "corr_str", minWidth: 120 ,filter: 'agSetColumnFilter'},
    {headerName: "代维信息", field: "special_field18", minWidth: 320 ,filter: 'agSetColumnFilter'},
    {headerName: "工单号", field: "sheet_no",minWidth: 270,},
    {headerName: "fp",  field: "fp",minWidth: 170,},
  ],
  NewHuiJuLowColumns:[
    {
      headerName: ' ',
      // headerCheckboxSelection: true,
      checkboxSelection: true,
      floatingFilter: false,
      suppressMenu: true,
      minWidth: 50,
      maxWidth: 50,
      width: 50,
      flex: 0,
      resizable: false,
      sortable: false,
      editable: false,
      filter: false,
      suppressColumnsToolPanel: true,
    },
    {headerName: "督办类型",  minWidth: 130 ,  suppressSizeToFit: true,  field: "supervise",filter: 'agSetColumnFilter',
      cellRenderer: (item) => tables_options.markSuperviseColor(item.value,true)
    },
    {headerName: "管控记录",  minWidth: 180 ,  suppressSizeToFit: true,  field: "manage_log_text",filter: 'agSetColumnFilter',
      cellRenderer: (item) => tables_options.markManageLog(item.value)
    },
    {headerName: "告警合并数", field: "alarm_count",filter: false, minWidth: 120 ,
      cellRenderer: "agGroupCellRenderer"},  //agGroupCellRenderer
    {headerName: "地市", minWidth: 130 , field: "city_name",filter: 'agSetColumnFilter',},
    {headerName: "厂家",  minWidth: 100 ,  suppressSizeToFit: true,  field: "vendor_name",filter: 'agSetColumnFilter'},
    {headerName: "设备类型",minWidth: 110 ,  suppressSizeToFit: true,  field: "eqp_object_class",filter: 'agSetColumnFilter'},
    {headerName: "持续时长（小时）", minWidth: 130 , field: "duration_time",filter: false,   sort: 'desc' ,
      cellRenderer: (item) =>  item.value + " 小时",
    },
    {headerName: "告警发现时间", minWidth: 170 , field: "time_stamp",filter: false,},
    {headerName: "告警发生时间", minWidth: 170 , field: "event_time",filter: false,
      // cellRenderer: (item) => moment(item.value).format("YYYY-MM-DD HH:mm:ss"),
    },
    {headerName: "告警定位对象",minWidth: 470, field: "ne_label",filter: 'agSetColumnFilter'},
    {headerName: "告警标题",minWidth: 320, field: "title_text",filter: 'agSetColumnFilter'},
    {headerName: "所属子网", field: "subnet_name", minWidth: 320 ,filter: 'agSetColumnFilter'},
    {headerName: "资源关联信息",minWidth: 370, field: "special_field9",filter: 'agSetColumnFilter'},
    {headerName: "所属片区", field: "corr_str", minWidth: 120 ,filter: 'agSetColumnFilter'},
    {headerName: "代维信息", field: "special_field18", minWidth: 320 ,filter: 'agSetColumnFilter'},
    {headerName: "工单号",minWidth: 270, field: "sheet_no",filter: 'agSetColumnFilter'},
    {headerName: "fp", minWidth: 130, field: "fp",filter: 'agSetColumnFilter'},
  ],
  child_HuiJuLowColumns: [
    {headerName: "地市", minWidth: 110 , field: "city_name",},
    {headerName: "厂家",  minWidth: 100 , field: "vendor_name",},
    {headerName: "设备类型",minWidth: 110 , field: "eqp_object_class",},
    {headerName: "持续时长", minWidth: 130 ,  sort: 'desc' , cellRenderer: (item) => tables_options.changeSecondToDuration(item.value) + "小时", field: "duration_time",},
    {headerName: "告警发现时间", minWidth: 170 , field: "time_stamp",  cellRenderer: (item) => moment(item.value * 1000).format("YYYY-MM-DD HH:mm:ss")},
    {headerName: "告警发生时间", minWidth: 170 , field: "event_time", cellRenderer: (item) => moment(item.value).format("YYYY-MM-DD HH:mm:ss")},
    {headerName: "告警定位对象", minWidth:470, field: "ne_label"},
    {headerName: "告警标题", minWidth:220, field: "title_text"},
    {headerName: "所属子网", minWidth:400, field: "subnet_name",},
    {headerName: "资源关联信息",minWidth: 270, field: "special_field9",},
    {headerName: "所属片区", field: "corr_str", minWidth: 120 ,filter: 'agSetColumnFilter'},
    {headerName: "代维信息", field: "special_field18", minWidth: 320 ,filter: 'agSetColumnFilter'},
    {headerName: "工单号", field: "sheet_no",minWidth: 270},
    {headerName: "fp",  field: "fp",minWidth: 170,},
  ],
  importantFormatter : (item) => {
    return  (item.value === 1 || item.value === "1") ? "<span style='color: red;font-weight: bold;font-size: 20px;'>✔ 是</span>" : "<span style='color: green'>× 无</span>";
  },
  totalColumns:[
    {headerName: "中断类型", field: "severity_keycode", minWidth: 130 ,filter: 'agSetColumnFilter',},  //agGroupCellRenderer
    {headerName: "管控状态", field: "manage_log_type", minWidth: 130 ,filter: 'agSetColumnFilter',},
    {headerName: "管控记录",  minWidth: 180 ,  suppressSizeToFit: true,  field: "manage_log_text",filter: 'agSetColumnFilter',
      cellRenderer: (item) => tables_options.markManageLog(item.value)
    },
    {headerName: "风险评分", field: "risk_score",filter: 'agSetColumnFilter', minWidth: 120 ,},  //agGroupCellRenderer
    {headerName: "重要环", field: "is_important",filter: 'agSetColumnFilter', minWidth: 110,
    } ,
    {headerName: "地市", minWidth: 130 , field: "city_name",filter: 'agSetColumnFilter',},
    {headerName: "厂家",  minWidth: 100 ,  suppressSizeToFit: true,  field: "vendor_name",filter: 'agSetColumnFilter'},
    {headerName: "设备类型",minWidth: 110 ,  suppressSizeToFit: true,  field: "eqp_object_class",filter: 'agSetColumnFilter'},
    {headerName: "持续时长（小时）", minWidth: 130 , field: "duration_time",filter: false,
      cellRenderer: (item) =>  item.value + "小时",
    },
    {headerName: "告警发现时间", minWidth: 170 , field: "time_stamp",filter: false,},
    {headerName: "告警发生时间", minWidth: 170 , field: "event_time",filter: false,
      // cellRenderer: (item) => moment(item.value).format("YYYY-MM-DD HH:mm:ss"),
    },
    {headerName: "告警清除时间", minWidth: 170 , field: "cancel_time",filter: false,
      // cellRenderer: (item) => moment(item.value).format("YYYY-MM-DD HH:mm:ss"),
    },
    {headerName: "告警定位对象",minWidth: 470, field: "ne_label",filter: 'agSetColumnFilter'},
    {headerName: "告警标题",minWidth: 320, field: "title_text",filter: 'agSetColumnFilter'},
    // {headerName: "业务详情", minWidth: 340 , field: "worker_obj",filter: false,},
    {headerName: "双跨3A", minWidth: 120 , field: "twin_aaa_count",filter: false,},
    {headerName: "高铁RRU", minWidth: 120 , field: "train_count",filter: false,},
    {headerName: "普通集客", minWidth: 120 , field: "manage_count",filter: false,},
    {headerName: "基站业务", minWidth: 120 , field: "worker_obj",filter: false,},

    {headerName: "所属子网", field: "subnet_name", minWidth: 320 ,filter: 'agSetColumnFilter'},
    {headerName: "所属传输系统",minWidth: 220 , field: "sysytem_name",filter: 'agSetColumnFilter'},
    {headerName: "资源关联信息",minWidth: 370, field: "special_field9",filter: 'agSetColumnFilter'},
    {headerName: "所属片区", field: "corr_str", minWidth: 120 ,filter: 'agSetColumnFilter'},
    {headerName: "代维信息", field: "special_field18", minWidth: 320 ,filter: 'agSetColumnFilter'},
    {headerName: "工单号",minWidth: 270, field: "sheet_no",filter: 'agSetColumnFilter'},
    {headerName: "fp", minWidth: 130, field: "fp",filter: 'agSetColumnFilter'},
  ],
};

export default tables_options;
