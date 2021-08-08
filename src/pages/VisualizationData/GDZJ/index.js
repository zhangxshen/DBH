/*
 * @Author: your name
 * @Date: 2021-07-17 10:16:59
 * @LastEditTime: 2021-07-17 10:38:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \DanBianHuan - 副本\src\pages\VisualizationData\GDZJ\index.js
 */
import React from "react";
import {connect} from 'dva';
import Cookies from 'js-cookie';
import GDZJComponent from '../../../components/GDZJComponent/GDZJComponent';


const GDZJ = (state) => {
  // console.log(state);
  const user = Cookies.get('user');
  const auth = Cookies.get('auth');

  // return <DBHComponent {...state}  />;
  return <GDZJComponent {...state}  Cookies_user={user} Cookies_auth={auth}  />;
};

// 指定订阅数据，这里关联了 users
function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(GDZJ);
