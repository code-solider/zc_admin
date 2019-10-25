/* 
    * create by 庞洋
    * createTime: 2019年8月15日09:53:28
    * /empower 页面用到的 也有全局
    * lastUpdateTime:2019年8月19日14:38:39 BY 庞洋
*/
import { message } from 'antd';
import { get_member_list, add_member, get_member, del_member, edit_member, wx_group_list, prize_add, prize_list, prize_del, user_info } from '@/services/api';
import router from 'umi/router';
import store from 'store';

const ShModel = {
    namespace: 'sh',
    state: {
        sqList: [],//页面顶部 a用户 b用户  list
        shUser: {},//页面顶部 a用户 b用户 点击后选择的用户详细数据
        // val: '',
        showModal: false,// 新增/编辑用户的modal显示状态
        // userData: {},
        // prize_list: [],//进群得大奖数据
        // wx_group_list: [],
        currentUpdateData: {}, // /enter/invite页面当前 添加/编辑 的数据
        currentData: {},//添加 或修改 的数据
        data_list: [],
        data_list_total: 0,
        data_list_page: 1,
        data_list_pageSize: 10,
        auth_num: 0,//授权总数
        use_num: 0,//已使用授权
    },
    effects: {
        *fetch({ payload }, { call, put }) {
            let res = yield call(get_member_list, payload);
            if (res.code) {
                yield put({
                    type: 'update',
                    payload: {
                        data_list: res.data.rows,
                        data_list_total: res.data.total,
                        sqList: res.data.rows,
                    }
                });
            } else {
                message.error(res.msg, 1)
            }
        },
        *del({ payload, callback }, { call, put }) {
            let res = yield call(del_member, payload);
            if (res.code === 1) {
                message.success('删除成功', 1);
                callback && callback()
            } else {
                message.error('删除失败', 1)
            };
        },
        *add_edit__memberE({ payload, callback }, { call, put }) {
            let res;
            if (payload.ids !== undefined) {
                res = yield call(edit_member, payload);
            } else {
                res = yield call(add_member, payload);
            }
            if (res.code) {
                message.success(res.msg, 1)
            } else {
                message.error(res.msg, 1)
            }
            callback && callback()
        },
        *get_wx_group_list({ payload }, { call, put }) {
            let res = yield call(wx_group_list, payload);
            let arr = [];
            for (let item in res.data) {
                arr.push(res.data[item]);
            }
            yield put({
                type: 'update',
                payload: {
                    wx_group_list: arr
                }
            })
        },
        *addData({ payload, callback }, { call, put }) {
            let res = yield call(prize_add, payload);
            if (res.code === 1) {
                message.success('操作成功', 1);
                callback && callback()
            } else {
                message.error('操作失败', 1)
            };
        },
        *setShUser({ payload, callback }, { call, put }) {
            let res = yield call(prize_list, { wxid: payload.wx_id });
            yield put({
                type: 'update',
                payload: {
                    shUser: payload,
                    prize_list: res.data.rows
                }
            })
        },
        *search({ payload, callback }, { call, put }) {
            let res = yield call(prize_list, { wxid: payload });
            yield put({
                type: 'updatePrize_list',
                payload: res.data.rows
            });
            callback && callback()
        },
        * updateInviteUserData({ payload, callback }, { call, put }) {
            yield put({
                type: 'update',
                payload: {
                    currentUpdateData: payload
                }
            });
            callback && callback()
        },
        *getUserInfo({ payload, callback }, { call, put }) {
            let res = yield call(user_info);
            if (res.code) {
                yield put({
                    type: 'update',
                    payload: {
                        auth_num: res.data.auth_num,//授权总数
                        use_num: res.data.use_num,//已使用授权
                    }
                });
            }
            callback && callback()
        },
    },
    reducers: {
        update(state, { payload }) {
            return { ...state, ...payload }
        },
        changecurrentUpdateData(state, { payload }) {
            let obj = { ...state.currentUpdateData }
            switch (payload.key) {
                case 'row[red_num]':
                    obj['row[red_num]'] = payload.value;
                    break;
                case 'row[red_status]':
                    obj['row[red_status]'] = payload.value;
                    break;
                case 'row[done_word]':
                    obj['row[done_word]'] = payload.value;
                    break;
                case 'row[process_word]':
                    obj['row[process_word]'] = payload.value;
                    break;
                case 'row[keyword]':
                    obj['row[keyword]'] = payload.value;
                    break;
                case 'row[in_num]':
                    obj['row[in_num]'] = payload.value;
                    break;
                case 'row[group_names]':
                    obj['row[group_names]'] = payload.value;
                    break;
                case 'row[gid]':
                    obj['row[gid]'] = payload.value;
                    break;
                case 'row[wxid]':
                    obj['row[wxid]'] = payload.value;
                    break;
                case 'ids':
                    obj.ids = payload.value;
                    break;
            }
            return { ...state, currentUpdateData: obj }
        },
    },
};
export default ShModel;
