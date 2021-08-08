/*
 * @Author: your name
 * @Date: 2021-07-17 10:48:46
 * @LastEditTime: 2021-07-17 15:54:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \DanBianHuan - 副本\src\components\GDZJComponent\tables_options.js
 */
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
  },

  totalColumns:[
    {headerName: "故障发生地市", minWidth: 130 , field: "fault_city_name",filter: 'agSetColumnFilter',},
    {headerName: "工单编号",  minWidth: 270 ,  suppressSizeToFit: true,  field: "eoms_id",filter: 'agSetColumnFilter'},
    {headerName: "操作名称", field: "op_name", minWidth: 170 ,filter: 'agSetColumnFilter',},  
    {headerName: "是否敏感操作", field: "is_sens", minWidth: 130 ,filter: 'agSetColumnFilter',},
    {headerName: "操作用户",  minWidth: 130 ,  suppressSizeToFit: true,  field: "op_user",filter: 'agSetColumnFilter',},
    {headerName: "操作时间", field: "op_time",filter: false, minWidth: 170 ,},  
    {headerName: "网元名称", field: "op_object",filter: 'agSetColumnFilter', minWidth: 180,},
    {headerName: "详细信息", minWidth: 130 , field: "op_info",filter: 'agSetColumnFilter',},
    {headerName: "问题工单",minWidth: 110 ,  suppressSizeToFit: true,  field: "problem_eoms",filter: 'agSetColumnFilter'},
    {headerName: "告警厂家", minWidth: 110 , field: "vendor_name",filter: false,},
    {headerName: "网管告警消除时间", minWidth: 170 , field: "alarm_cancel_time",filter: false,},
    {headerName: "告警标准名",minWidth: 270, field: "standard_alarm_name",filter: 'agSetColumnFilter'},
    {headerName: "网络分类二级",minWidth: 150, field: "network_level_2",filter: 'agSetColumnFilter'},
    {headerName: "网络分类三级", minWidth: 150 , field: "network_level_3",filter: 'agSetColumnFilter'},
    {headerName: "故障发生时间", minWidth: 170 , field: "fault_happen_time",filter: false,},
    {headerName: "故障发现时间", minWidth: 170 , field: "fault_found_time",filter: false,},
    {headerName: "申请报结时间", minWidth: 170 , field: "apply_end_time",filter: false,},
    {headerName: "回单人", minWidth: 170 , field: "apply_end_operation",filter: false,},
    {headerName: "回单人所属班组", minWidth: 170 , field: "apply_end_role",filter: false,},
    {headerName: "处理措施", minWidth: 170 , field: "treatment_measures",filter: false,},
    {headerName: "故障原因描述", minWidth: 170 , field: "fault_reason_desc",filter: false,},
    {headerName: "网管操作时间与告警消除时间相差小于15分钟", field: "op_cancel_15", minWidth: 320 ,filter: 'agSetColumnFilter'},
    {headerName: "网管操作时间与申请报结时间相差小于15分钟",minWidth: 320 , field: "op_apply_15",filter: 'agSetColumnFilter'},
  ],
  totalColumns2:[
    {headerName: "故障发生地市", minWidth: 130 , field: "fault_city_name",filter: 'agSetColumnFilter',},
    {headerName: "工单编号",  minWidth: 270 ,  suppressSizeToFit: true,  field: "eoms_id",filter: 'agSetColumnFilter'},
    {headerName: "操作名称", field: "op_name", minWidth: 170 ,filter: 'agSetColumnFilter',},  
    {headerName: "是否敏感操作", field: "is_sens", minWidth: 130 ,filter: 'agSetColumnFilter',},
    {headerName: "操作用户",  minWidth: 130 ,  suppressSizeToFit: true,  field: "op_user",filter: 'agSetColumnFilter',},
    {headerName: "操作时间", field: "op_time",filter: false, minWidth: 170,},  
    {headerName: "网元名称", field: "op_object",filter: 'agSetColumnFilter', minWidth: 180,},
    {headerName: "详细信息", minWidth: 130 , field: "op_info",filter: 'agSetColumnFilter',},
    {headerName: "疑似制造工单",minWidth: 130 ,  suppressSizeToFit: true,  field: "maybe_eoms",filter: 'agSetColumnFilter'},
    {headerName: "告警厂家", minWidth: 110 , field: "vendor_name",filter: false,},
    {headerName: "网管告警消除时间", minWidth: 170 , field: "alarm_cancel_time",filter: false,},
    {headerName: "告警标准名",minWidth: 270, field: "standard_alarm_name",filter: 'agSetColumnFilter'},
    {headerName: "网络分类二级",minWidth: 150, field: "network_level_2",filter: 'agSetColumnFilter'},
    {headerName: "网络分类三级", minWidth: 150 , field: "network_level_3",filter: 'agSetColumnFilter'},
    {headerName: "故障发生时间", minWidth: 170 , field: "fault_happen_time",filter: false,},
    {headerName: "故障发现时间", minWidth: 170 , field: "fault_found_time",filter: false,},
    {headerName: "申请报结时间", minWidth: 170 , field: "apply_end_time",filter: false,},
    {headerName: "回单人", minWidth: 170 , field: "apply_end_operation",filter: false,},
    {headerName: "回单人所属班组", minWidth: 170 , field: "apply_end_role",filter: false,},
    {headerName: "处理措施", minWidth: 170 , field: "treatment_measures",filter: false,},
    {headerName: "故障原因描述", minWidth: 170 , field: "fault_reason_desc",filter: false,},
  ],
};

export default tables_options;
