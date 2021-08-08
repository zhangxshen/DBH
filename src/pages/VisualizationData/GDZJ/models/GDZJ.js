/*
 * @Author: your name
 * @Date: 2021-07-17 10:17:03
 * @LastEditTime: 2021-07-17 14:55:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \DanBianHuan - 副本\src\pages\VisualizationData\GDZJ\models\GDZJ.js
 */
import {getGdzjResult} from "../../../../service/service";


export default {
  state: {
    search_loading:false,
    search_total:0,
    search_count:0,
    search_data:[],

    modal_visible: false,
    detail_data:{},
  },
  subscriptions: {
    setup({dispatch, history}) {
    },
  },
  effects: {
    *search_alarm({ payload:{search_props} }, { call, put }) {
      yield put({type:"save",payload:{search_loading: true, search_total:0, search_count:0,}});
      let isFinnished = false, rtn_data = [];

      while(!isFinnished) {
        const search_rtn = yield call(getGdzjResult, search_props);
        if(search_rtn) {
          const {code, data, } = search_rtn;
          console.log(data)
          if(code === 0) {
            rtn_data = rtn_data.concat(data);
            isFinnished = true;
          } else {
            alert("查询后台数据失败！，具体原因：\n" + JSON.stringify(search_rtn));
          }

        } else {
          alert("查询后台数据失败！接口无返回数据！");
          break;
        }
      }
      
      yield put({type:"save",payload:{search_loading: false, search_data: rtn_data}});
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
