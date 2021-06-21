import {getHistoryTransLoop} from "../../../../service/service";


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
    *search_alarm({ payload:{search_props} }, { select, call, put }) {
      yield put({type:"save",payload:{search_loading: true, search_total:0, search_count:0,}});
      let page = 1, pageSize = 1000, isFinnished = false, rtn_data = [];

      while(!isFinnished) {
        search_props["page"] = page;
        search_props["pageSize"] = pageSize;
        const search_rtn = yield call(getHistoryTransLoop, search_props);
        if(search_rtn) {
          const {code, data, } = search_rtn;
          if(code === 0) {
            const old_count = yield select(state => state["history_model"]["search_count"]);
            const {alarms, finish, total} = data;
            rtn_data = rtn_data.concat(alarms);
            let payload_item = {search_count: old_count + alarms.length};
            if (total) payload_item["search_total"] = total;
            yield put({type: 'save', payload: payload_item});

            if (finish) isFinnished = true;
          } else {
            alert("查询历史告警失败！，具体原因：\n" + JSON.stringify(search_rtn));
          }

        } else {
          alert("查询历史告警失败！接口无返回数据！");
          break;
        }
        page++;
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
