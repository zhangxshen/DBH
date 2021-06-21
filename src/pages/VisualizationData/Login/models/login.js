import {loginData} from '../../../../service/service';
import md5 from 'js-md5';
import Cookies from 'js-cookie';
import router from 'umi/router';

export default {
  state: {
    login_loading:false,
  },
  subscriptions: {
    setup({dispatch, history}) {
    },
  },
  effects: {
    *login({ type, payload:{usr_name,usr_pwd} }, { put, call, select }) {
      if(usr_name && usr_pwd) {
        //loading动画开启
        yield put({type:'save', payload:{login_loading:true,}});
        // //搜索数据
        const rtn = yield call(loginData,usr_name,md5(usr_pwd));
        //
        if(rtn) {
          const {code,msg,data} = rtn;
          //
          if(code !== 0) {
            alert('登录失败，原因：'+ msg);
          } else {
            let inFifteenMinutes=new Date(new Date().getTime()+6 * 60 * 60 * 1000);
            Cookies.set('user',data.city_name + "-" + data.username, {expires:inFifteenMinutes});
            Cookies.set('auth',data, {expires:inFifteenMinutes});

            router.push('/VisualizationData/DBH');
            // // 改用cookies
            // yield put({
            //   type:'save',
            //   payload:{
            //     user:data.account,
            //     auth:data,
            //   }
            // });
          }

          //loading动画关闭
          yield put({
            type:'save',
            payload:{
              login_loading:false,
            }
          });
        }
        // console.log(rtn);

      }
    },
  },
  reducers: {
    save(state,action){
      return{...state,...action.payload};
    },
    createSuccess(){},
    deleteSuccess(){},
    updateSuccess(){},
  }
}
