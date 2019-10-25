/* 
    * create by 庞洋
    * createTime: 2019-08-14
    * 店铺后台 所有页面用到
*/

import { wx_group_list } from '@/services/api';

const EnterKeywordModel = {
    namespace: 'wxGroup',
    state: {
        group_names: '',
        gid: '',
        dataSource: [],
        targetKeys: [],
        selectedKeys: []
    },
    effects: {
        *changeData({ payload }, { put, call }) {
            let res = yield call(wx_group_list, { wxid: payload.wxid, p_type: payload.p_type });
            let newArr = [], oldArr = [], targetKeys = [];
            oldArr = [...payload.group_names.split(','), ...Object.values(res.data)]
            for (let i = 0; i < oldArr.length; i++) {
                if (oldArr[i] === "") {
                    oldArr.splice(i, 1)
                }
            }
            for (let i = 0; i < oldArr.length; i++) {
                if (oldArr[i] !== "" && typeof oldArr[i] !== 'object') {
                    targetKeys.push(i);
                    newArr.push({
                        key: i,
                        title: oldArr[i].replace(/\s/g, ""),
                        description: payload.gid.split(',')[i]
                    });
                } else {
                    newArr.push({
                        key: i,
                        title: oldArr[i].nickName,
                        description: oldArr[i].chatroomId
                    });
                }
            }
            yield put({
                type: 'update',
                payload: {
                    dataSource: newArr,
                    targetKeys: targetKeys,
                    group_names: payload.group_names,
                    gid: payload.gid
                }
            })
        }
    },
    reducers: {
        update(state, { payload }) {
            return { ...state, ...payload };
        },
        clearData(state) {
            return { ...state, group_names: '', gid: '', dataSource: [], targetKeys: [], selectedKeys: [] };
        },
    },
};
export default EnterKeywordModel;