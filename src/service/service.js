/*
 * @Author: your name
 * @Date: 2021-02-02 17:21:01
 * @LastEditTime: 2021-07-17 10:19:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \DanBianHuan\src\service\service.js
 */
/*
 * @Author: your name
 * @Date: 2021-02-02 17:21:01
 * @LastEditTime: 2021-06-10 15:51:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \DanBianHuan\src\service\service.js
 */
import URL_List from './UrlList';
import request from 'umi-request'
import moment from "moment";

const isTest = false;

//读取memu
export async function query_menu() {
  const url = `${URL_List.menuList}?t=${moment().unix()}`;
  return request(url);
}

//读取中断线路图
export async function get_trans_alarm_count() {
  const url = (isTest) ? '/api/getTransAlarm' : `${URL_List.getTransAlarmCount}?t=${moment().unix()}`;
  return request(url);
}

export async function getTransLoop() {
  const props = {};
  const url = (isTest) ? '/api/getTransLoop' : URL_List.getTransLoop;
  const params_temp = {
    method: 'POST',
    mode: "cors",
    timeout: 160000,
    headers: {
      // 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(props),
  };


  return  request(url, params_temp).catch(err => {
      alert('查询传输接入告警的数据接口发生错误，无法查询到数据.具体原因：\n' + err);
    });
}

export async function convergeAlarm() {
  const props = {"severity_keycode": 25};
  const url = (isTest) ? '/api/convergeAlarm' : URL_List.convergeAlarm;
  const params_temp = {
    method: 'POST',
    mode: "cors",
    timeout: 160000,
    headers: {
      // 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(props),
  };


  return request(url, params_temp).catch(err => {
      alert('查询汇聚骨干中断告警的数据接口发生错误，无法查询到数据.具体原因：\n' + err);
    });
}

export async function convergeAlarmLow() {
  const props = {"severity_keycode": 26};
  const url = (isTest) ? '/api/convergeAlarm' : URL_List.convergeAlarm;
  const params_temp = {
    method: 'POST',
    mode: "cors",
    timeout: 160000,
    headers: {
      // 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(props),
  };


  return request(url, params_temp).catch(err => {
      alert('查询汇聚骨干弱光告警的数据接口发生错误，无法查询到数据.具体原因：\n' + err);
    });
}

export async function getEomsDetailByEomsId(eomsid) {
  const props = {"eomsid":eomsid,"currentPage":1,"pageSize":10};
  const url = URL_List.getEomsDetailByEomsId;
  const params_temp = {
    method: 'POST',
    mode: "cors",
    timeout: 160000,
    headers: {
      // 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(props),
  };


  return request(url, params_temp).catch(err => {
      alert('查询EOMS的数据接口发生错误，无法查询到数据.具体原因：\n' + err);
    });
}

export async function getEomsMenuOrTicket(eomsid) {
  // const props = {"eomsid":eomsid,"currentPage":1,"pageSize":10};
  const url = URL_List.getEomsMenuOrTicket + "?term=" + eomsid;
  // console.log("url",url);
  return request(url);
}

export async function updateGuanKong(fps, manage_log) {
  // http://188.0.59.193:9851/alarm/updateTransAlarm
  // {"fp":"1000436334|527017290|2623405475|3603349020","manage_log":"1122222"}
  const props = {"fps":fps,"manage_log":manage_log};
  const url = URL_List.GuanKong;
  const params_temp = {
    method: 'POST',
    mode: "cors",
    timeout: 160000,
    headers: {
      // 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(props),
  };

  return request(url, params_temp).catch(err => {
    alert('提交“管控记录”失败.具体原因：\n' + err);
  });

}

export async function clearAlarm(fps, manage_log, cancel_time, ne_label) {
  // http://188.0.59.193:9851/alarm/updateTransAlarm
  // {"fp":"1000436334|527017290|2623405475|3603349020","manage_log":"1122222"}
  const props = {"fps":fps,"manage_log":manage_log, "cancel_time": cancel_time, "ne_label": ne_label};
  const url = URL_List.GuanKong;
  const params_temp = {
    method: 'POST',
    mode: "cors",
    timeout: 160000,
    headers: {
      // 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(props),
  };

  return request(url, params_temp).catch(err => {
    alert('人工确认告警“清除”状态失败.具体原因：\n' + err);
  });

}

export async function getHistoryTransLoop(props) {
  // http://188.0.59.193:9851/alarm/updateTransAlarm
  // {"fp":"1000436334|527017290|2623405475|3603349020","manage_log":"1122222"}
  // const props = {"fps":fps,"manage_log":manage_log, "cancel_time": cancel_time};
  const url = URL_List.getHistoryTransLoop;
  const params_temp = {
    method: 'POST',
    mode: "cors",
    timeout: 0,
    headers: {
      // 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(props),
  };

  return request(url, params_temp).catch(err => {
    alert('查询历史数据失败.具体原因：\n' + err);
  });

}

//登录接口
export async function loginData(usr_name,usr_pwd) {

  const props = {"account": usr_name,"password": usr_pwd};

  // const url = `http://188.0.59.193:7001/boco/login`;
  const url = (isTest) ? '/api/login' :URL_List.Login;

  const params_temp = {
    method: 'POST',
    mode: "cors",
    timeout: 60000,
    headers: {
      // 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(props),
  };

  let rtn = request(url, params_temp).catch(err =>{
    alert('登录账号的数据接口发生错误，无法验证数据.具体原因：\n'+err);
  });

  // console.log(JSON.stringify(props));
  return rtn;

}

export async function getGdzjResult(props) {
  // http://188.0.59.193:9851/alarm/updateTransAlarm
  // {"fp":"1000436334|527017290|2623405475|3603349020","manage_log":"1122222"}
  // const props = {"fps":fps,"manage_log":manage_log, "cancel_time": cancel_time};
  const url = URL_List.Gdzj;
  const params_temp = {
    method: 'POST',
    mode: "cors",
    timeout: 0,
    headers: {
      // 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(props),
  };

  return request(url, params_temp).catch(err => {
    alert('查询后台数据失败.具体原因：\n' + err);
  });

}
