/* 
    * create by 庞洋
    * createTime: 2019年8月19日16:22:55
    * 当前页面用到
    * lastUpdateTime: 2019年8月19日16:23:07
*/
import { message } from 'antd';
import { fission_list, fission_del, fission_counts } from '@/services/api';

const Model = {
    namespace: 'fissionActivityStatistics',
    /**
     * fission 裂变
     * activity 活动
     * statistics 统计
     */
    state: {
        currentData: {},//添加 或修改 的数据
        data_list: [],
        data_list_total: 0,
        data_list_page: 1,
        data_list_pageSize: 10,
        fission_counts: {},//统计结果
    },
    effects: {
        *fetch({ payload }, { call, put }) {
            let res = yield call(fission_list);
            let res2 = yield call(fission_counts);

            yield put({
                type: 'update',
                payload: {
                    data_list: res.data.rows,
                    data_list_total: res.data.total,
                    fission_counts: res2.data[0]
                }
            });

        },
        *fission_del({ payload, callback }, { call, put }) {
            let res = yield call(fission_del, payload);
            if (res.code) {
                message.success(res.msg, 1.5);
                callback && callback();
            } else {
                message.error(res.msg, 1.5)
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
