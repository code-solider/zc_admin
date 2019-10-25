/* 
    * create by 庞洋
    * createTime: 2019年8月17日14:49:06
    * /enter/invite 页面用到
    * lastUpdateTime:2019年8月19日14:39:37 by 庞洋
*/
import { prize_add, prize_list, prize_del } from '@/services/api';
import { message } from 'antd';
import store from 'store';

const Model = {
    namespace: 'enterInvite',
    state: {
        currentData: {},//添加 或修改 的数据
        data_list: [],
        data_list_total: 0,
        data_list_page: 1,
        data_list_pageSize: 10
    },
    effects: {
        *fetch({ payload }, { call, put }) {
            let res = yield call(prize_list, payload);
            if (res.code) {
                yield put({
                    type: 'update',
                    payload: {
                        data_list: res.data.rows,
                        data_list_total: res.data.total
                    }
                });
            } else {
                message.error(res.msg, 1)
            }
        },
        *del({ payload, callback }, { call, put }) {
            let res = yield call(prize_del, payload);
            if (res.code) {
                message.success(res.msg, 1)
                callback && callback()

            } else {
                message.error(res.msg, 1)
            }
        },
    },
    reducers: {
        update(state, { payload }) {
            return { ...state, ...payload };
        },
    },
};
export default Model;
