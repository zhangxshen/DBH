import React from "react";
import {connect} from 'dva';
import Cookies from 'js-cookie';

import DBHComponent from '../../../components/DBHComponent/DBHComponent';
import LoginComponent from '../Login';


const DBH = (state) => {
  // console.log(state);
  const user = Cookies.get('user');
  const auth = Cookies.get('auth');

  // return <DBHComponent {...state}  />;
  return (user) ? <DBHComponent {...state}  /> : <LoginComponent/>;
};

// 指定订阅数据，这里关联了 users
function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(DBH);
