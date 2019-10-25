/* 
    * create by 庞洋
    * createTime: 2019-08-14
    * /enter/Keyword 页面用到
*/
import { keyword_add, keyword_list, keyword_del } from '@/services/api';
import { message } from 'antd';
import store from 'store';

const EnterKeywordModel = {
    namespace: 'enterKeyword',
    state: {
        currentData: {},//添加 或修改 的数据
        keyword_list: [],
        keyword_list_total: 0,
        keyword_list_page: 1,
        keyword_list_pageSize: 10
    },
    effects: {
        *fetch({ payload }, { call, put }) {
            const res = yield call(keyword_list, payload);
            if (res.code) {
                yield put({
                    type: 'updateKeyword_list',
                    payload: {
                        keyword_list: res.data.rows,
                        total: res.data.total
                    }
                });
            } else {
                message.error(res.msg, 1)
            }
        },
        *addKeyword({ payload, callback }, { call, put }) {
            const res = yield call(keyword_add, payload);
            if (res.code) {
                message.success(res.msg, 1)
                callback && callback()
            } else {
                message.error(res.msg, 1)
            }
        },
        *delKeyword({ payload, callback }, { call, put }) {
            const res = yield call(keyword_del, payload);
            if (res.code) {
                message.success(res.msg, 1)
                callback && callback()
            } else {
                message.error(res.msg, 1)
            }
        },
    },
    reducers: {
        updateKeyword_list(state, { payload }) {
            return { ...state, keyword_list: payload.keyword_list, keyword_list_total: payload.total };
        },
        updatePagination(state, { payload }) {
            return { ...state, ...payload };
        },
        update(state, { payload }) {
            return { ...state, ...payload };
        },
    },
};
export default EnterKeywordModel;
