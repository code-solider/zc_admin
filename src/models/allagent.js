import { message } from 'antd';
import { getAgentList, getUserInfo, user_edit, user_del } from '@/services/api';
import router from 'umi/router';
import store from 'store';

const AllAgentModel = {
    namespace: 'allagent',
    state: {
        agentList: [],
        showEditUserModal: false,
        addAgentNumModal: {
            allNum: 0,
            useNum: 0,
            uid: ''
        },
        updateUserInfo: {}
    },
    effects: {
        *fetch({ payload }, { call, put }) {
            let res = yield call(getAgentList);
            let newArr = res.data.rows.map((item) => {
                item.restNum = item.auth_num - item.use_num;
                return item;
            })
            yield put({
                type: 'updateAgentList',
                payload: newArr,
            })
        },
        *showEditUserModal({ payload }, { call, put }) {
            let res = yield call(getUserInfo, { ids: payload.id });
            yield put({
                type: 'updateUserInfoAndShowEditUserModal',
                payload: res.data,
            })
        },
        *updateUser({ payload }, { call, put }) {
            let res = yield call(user_edit, payload);
            if (res.code === 1) {
                yield put({
                    type: 'closeModal'
                })
                yield put({
                    type: 'fetch'
                })
                message.success(res.msg, 1)
            } else {
                message.error(res.msg, 1)
            }

        },
        *user_del({ payload, callback }, { call, put }) {
            let res = yield call(user_del, payload);
            if (res.code) {
                message.success(res.msg, 1)
                callback && callback();
            } else {
                message.error(res.msg)
            }
        },
    },
    reducers: {
        updateAgentList(state, { payload }) {
            return { ...state, agentList: payload };
        },
        updateAddAgentNumModal(state, { payload }) {
            return { ...state, addAgentNumModal: payload };
        },
        updateUserInfoAndShowEditUserModal(state, { payload }) {
            return { ...state, showEditUserModal: true, updateUserInfo: payload };
        },
        closeModal(state, { payload }) {
            return { ...state, showEditUserModal: false, updateUserInfo: {} };
        },
    },
};
export default AllAgentModel;
