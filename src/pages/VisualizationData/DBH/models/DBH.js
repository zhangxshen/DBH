import {getTransLoop, convergeAlarm, convergeAlarmLow, get_trans_alarm_count, query_menu, updateGuanKong, clearAlarm, getEomsDetailByEomsId, getEomsMenuOrTicket} from '../../../../service/service';

export default {
  state: {
    menu_visible:false,
    menu_list:[],
    defaultSelectedKeys:'sub3_1',
    trans_loop_loading:true,
    guan_kong_loading:false,
    eoms_detail_loading: false,

    trans_loop_data:null,
    convergeAlarm_data:null,
    convergeAlarmLow_data:null,
    trans_alarm_count_data:null,
    eoms_detail_data : null,
    eoms_menu_ticket : [],

    detail_data:null,
    modal_visible:true,
    childrenDrawer:true,
    clear_alarm_visible:false,

    kong_data:[],
  },
  subscriptions: {
    setup({dispatch, history}) {
      //读取memu
      history.listen(location => dispatch({type:"menu"}));
    },
  },
  effects: {
    *menu({ payload}, { select, call, put }) {
      const menu_list  = yield call(query_menu);
      // console.log("menu_list", menu_list);
      if(menu_list) yield put({ type: 'save', payload:{menu_list: menu_list} });
    },
    *fetch_data({ payload  }, { select, call, put }) {
      yield put({type:"save",payload: {trans_loop_loading: true, modal_visible: false, childrenDrawer: false, } });
      const getTransLoop_rtn = yield call(getTransLoop, );
      const convergeAlarm_rtn = yield call(convergeAlarm, );
      const convergeAlarmLow_rtn = yield call(convergeAlarmLow, );
      const getTransAlarmCount_rtn = yield call(get_trans_alarm_count, );
      // console.log("getTransAlarmCount_rtn", getTransAlarmCount_rtn);

      let isTransLoopFinnish = false, isconvergeAlarmFinnish = false, isconvergeAlarmLowFinnish = false, payload_data = {};
      if(getTransLoop_rtn) {
        if(getTransLoop_rtn.code !== 0) {
          alert("查询列表失败，错误原因：\n" + JSON.stringify(getTransLoop_rtn))
        } else {
          payload_data["trans_loop_data"] = getTransLoop_rtn.data ;
          isTransLoopFinnish = true;
        }
      } else {
        alert('查询接入中断结果失败，后台无法回应。');
      }

      if(convergeAlarm_rtn) {
        if(convergeAlarm_rtn.code !== 0) {
          alert("查询列表失败，错误原因：\n" + JSON.stringify(convergeAlarm_rtn))
        } else {
          payload_data["convergeAlarm_data"] = convergeAlarm_rtn.data ;
          isconvergeAlarmFinnish = true;
        }
      } else {
        alert('查询汇聚骨干中断结果失败，后台无法回应。');
      }

      if(convergeAlarmLow_rtn) {
        if(convergeAlarmLow_rtn.code !== 0) {
          alert("查询列表失败，错误原因：\n" + JSON.stringify(convergeAlarmLow_rtn))
        } else {
          payload_data["convergeAlarmLow_data"] = convergeAlarmLow_rtn.data ;
          isconvergeAlarmLowFinnish = true;
        }
      } else {
        alert('查询汇聚骨干弱光结果失败，后台无法回应。');
      }

      if(getTransAlarmCount_rtn) {
        payload_data["trans_alarm_count_data"] = getTransAlarmCount_rtn ;
      } else {
        alert('查询折线数据结果失败，后台无法回应。');
      }


      if(isTransLoopFinnish && isconvergeAlarmFinnish && isconvergeAlarmLowFinnish) {
        payload_data["trans_loop_loading"] = false;
        payload_data["modal_visible"] = false;
        payload_data["childrenDrawer"] =false; //," +
        payload_data["clear_alarm_visible"] = false; //,
      }

      //保存数据
      yield put({type: "save", payload: payload_data});
    },
    *relaod_data({ payload  }, { select, call, put }) {
      yield put({type:"save",payload: {trans_loop_loading: true, } });
      const getTransLoop_rtn = yield call(getTransLoop, );
      const convergeAlarm_rtn = yield call(convergeAlarm, );
      const convergeAlarmLow_rtn = yield call(convergeAlarmLow, )
      const getTransAlarmCount_rtn = yield call(get_trans_alarm_count, );

      let isTransLoopFinnish = false, isconvergeAlarmFinnish = false, isconvergeAlarmLowFinnish = false, payload_data = {};
      if(getTransLoop_rtn) {
        if(getTransLoop_rtn.code !== 0) {
          alert("查询列表失败，错误原因：\n" + JSON.stringify(getTransLoop_rtn))
        } else {
          payload_data["trans_loop_data"] = getTransLoop_rtn.data ;
          isTransLoopFinnish = true;
        }
      } else {
        alert('查询接入中断结果失败，后台无法回应。');
      }

      if(convergeAlarm_rtn) {
        if(convergeAlarm_rtn.code !== 0) {
          alert("查询列表失败，错误原因：\n" + JSON.stringify(convergeAlarm_rtn))
        } else {
          payload_data["convergeAlarm_data"] = convergeAlarm_rtn.data ;
          isconvergeAlarmFinnish = true;
        }
      } else {
        alert('查询汇聚骨干中断结果失败，后台无法回应。');
      }

      if(convergeAlarmLow_rtn) {
        if(convergeAlarmLow_rtn.code !== 0) {
          alert("查询列表失败，错误原因：\n" + JSON.stringify(convergeAlarmLow_rtn))
        } else {
          payload_data["convergeAlarmLow_data"] = convergeAlarmLow_rtn.data ;
          isconvergeAlarmLowFinnish = true;
        }
      } else {
        alert('查询汇聚骨干弱光结果失败，后台无法回应。');
      }

      if(getTransAlarmCount_rtn) {
        payload_data["trans_alarm_count_data"] = getTransAlarmCount_rtn ;
      } else {
        alert('查询折线数据结果失败，后台无法回应。');
      }


      if(isTransLoopFinnish && isconvergeAlarmFinnish && isconvergeAlarmLowFinnish) {
        payload_data["trans_loop_loading"] = false;
      }

      //保存数据
      yield put({type: "save", payload: payload_data});
    },
    *update_guan_kong({ payload:{fps, manage_log} }, { select, call, put }) {
      yield put({type:"save",payload:{guan_kong_loading: true,}});
      const updateGuanKong_rtn = yield call(updateGuanKong, fps, manage_log);
      if(updateGuanKong_rtn) {
        const {code, } = updateGuanKong_rtn;
        if(code === 0) {
          yield put({type:"fetch_data"});
        } else {
          alert("提交“管控记录”失败，具体原因" + JSON.stringify(updateGuanKong_rtn));
        }

      } else {
        alert("提交“管控记录”失败");
      }
      yield put({type:"save",payload:{guan_kong_loading: false, }});
    },
    *clear_alarm({ payload:{fps, manage_log, cancel_time, ne_label} }, { select, call, put }) {
      yield put({type:"save",payload:{guan_kong_loading: true, }});
      const clearAlarm_rtn = yield call(clearAlarm, fps, manage_log, cancel_time, ne_label);
      if(clearAlarm_rtn) {
        const {code, } = clearAlarm_rtn;
        if(code === 0) {
          yield put({type:"save",payload:{ clear_alarm_visible:false,}});
          yield put({type:"fetch_data",});
        } else {
          alert("人工确认告警“清除”状态失败，具体原因" + JSON.stringify(clearAlarm_rtn));
        }
      } else {
        alert("人工确认告警“清除”状态失败");
      }
      yield put({type:"save",payload:{guan_kong_loading: false,}});
    },
    *get_eoms_detail({ payload:{ sheet_no_list}  }, { select, call, put }) {
      yield put({type:"save",payload: {eoms_detail_loading: true,  } });

      const {master, slave} = sheet_no_list;
      const master_eoms_detail_rtn = (master) ? yield call(getEomsDetailByEomsId, master) : null;
      const master_eoms_menu_ticket = (master) ? yield call(getEomsMenuOrTicket, master) : null;
      let slave_eoms_detail_rtn = [];
      let slave_eoms_menu_ticket = [];
      if(slave && slave.length > 0) {
        for(let i = 0;i < slave.length; i++) {
          const slave_rtn = yield call(getEomsDetailByEomsId, slave[i]);
          const slave_ticket = yield call(getEomsMenuOrTicket, slave[i]);
          slave_eoms_detail_rtn.push({"sheet_no": slave[i],"value": slave_rtn});
          slave_eoms_menu_ticket.push({"sheet_no": slave[i], "value": slave_ticket});
        }
      }

      let eoms_detail_data = {"master_eoms": {"sheet_no": master, "value": master_eoms_detail_rtn} , "slave_eoms" : slave_eoms_detail_rtn};
      const eoms_menu_ticket_rtn = {"master_ticket": {"sheet_no": master, "value": master_eoms_menu_ticket} , "slave_ticket" : slave_eoms_menu_ticket};

      //保存数据
      yield put({type: "save", payload: {eoms_detail_loading:false, eoms_detail_data: eoms_detail_data, eoms_menu_ticket: eoms_menu_ticket_rtn}});
      // console.log(eoms_detail_rtn, eoms_menu_ticket);
    },
  },
  reducers: {
    save(state,action){
      return{...state,...action.payload};
    },
    showLoading(state, action){
      return { ...state,...action.payload, loading: true };
    },
    // 使用服务器数据返回
    querySuccess(state,action){
      return {...state, ...action.payload, loading: false};

    },
    createSuccess(){},
    deleteSuccess(){},
    updateSuccess(){},
  }
}
