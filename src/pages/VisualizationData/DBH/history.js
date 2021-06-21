import React from "react";
import {connect} from 'dva';
import Cookies from 'js-cookie';
import HistoryComponent from '../../../components/DBHComponent/DBH_HistoryComponent/HistoryComponent';

const HistoryCheck = (state) => {
  const user = Cookies.get('user');
  const auth = Cookies.get('auth');

  return <HistoryComponent {...state}  Cookies_user={user} Cookies_auth={auth}  />;
};

// 指定订阅数据，这里关联了 users
function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(HistoryCheck);
