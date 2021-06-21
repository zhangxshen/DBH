import Cookies from "js-cookie";
import React from "react";
import {connect} from 'dva';


import LoginComponent from '../Login';
import TDRComponent from '../../../components/TDRComponent/TDRComponent';

const TDR = (state) => {

  const user = Cookies.get('user');
  const auth = Cookies.get('auth');

  return (user) ? <TDRComponent  {...state} /> : <LoginComponent/>;

  // return <OBDComponent {...state} />;
};

// 指定订阅数据，这里关联了 users
function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(TDR);