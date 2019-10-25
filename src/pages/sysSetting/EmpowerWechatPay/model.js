/* 
    * create by 庞洋
    * createTime: 2019年8月19日17:24:18
    * 当前页面用到
    * lastUpdateTime: 2019年8月19日17:24:18
*/
import { message } from 'antd';

const Model = {
    namespace: 'sysSettingEmpowerWechatPay',
    /**
     * fission 裂变
     */
    state: {
        currentData: {},//添加 或修改 的数据
        data_list: [],
        data_list_total: 0,
        data_list_page: 1,
        data_list_pageSize: 10
    },
    effects: {
        *fetch({ payload }, { call, put }) {
            // let res = yield call(keyword_list, payload);
            // if (res.code) {
            //     yield put({
            //         type: 'update',
            //         payload: {
            //             data_list: res.data.rows,
            //             data_list_total: res.data.total
            //         }
            //     });
            // } else {
            //     message.error(res.msg, 1)
            // }
        },
    },
    reducers: {
        update(state, { payload }) {
            return { ...state, ...payload };
        },

    },
};
export default Model;
