/* 
    * create by 庞洋
    * createTime: 2019年8月19日17:24:18
    * 当前页面用到
    * lastUpdateTime: 2019年8月19日17:24:18
*/
import { message } from 'antd';
import { get_auth_url, auth_return, get_info } from '@/services/api';

const Model = {
    namespace: 'sysSettingEmpowerGZPT',
    /**
     * fission 裂变
     */
    state: {
        currentData: {},//添加 或修改 的数据
        data: [],
        data_list: [],
        data_list_total: 0,
        data_list_page: 1,
        data_list_pageSize: 10
    },
    effects: {
        *fetch({ payload, callback }, { call, put }) {
            let res = yield call(get_auth_url, payload.uri);
            if (res.status) {
                callback && callback(res.data);
            } else {
                message.error(res.statusText, 1)
            }
        },
        *saveCode({ payload, callback }, { call, put }) {
            let res = yield call(auth_return, payload);
            if (res.code) {
                message.success(res.msg, 1.5),
                    yield put({
                        type: 'update',
                        payload: {
                            data: [res.data]
                        }
                    })
            } else {
                message.error(res.msg, 1.5)
            }
        },
        *getData({ payload, callback }, { call, put }) {
            let res = yield call(get_info);
            if (res.code) {
                yield put({
                    type: 'update',
                    payload: {
                        data: [res.data]
                    }
                })
            } else {
                message.error(res.msg, 1.5)
            }
        }
    },
    reducers: {
        update(state, { payload }) {
            return { ...state, ...payload };
        },

    },
};
export default Model;
