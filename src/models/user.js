import { queryCurrent, query as queryUsers } from '@/services/user';
import { message } from 'antd';
import { login } from '@/services/api';
import router from 'umi/router';
import store from 'store';
import { setAuthority } from '@/utils/authority';

const UserModel = {
	namespace: 'user',
	state: {
		currentUser: {},
	},
	effects: {
		*login({ payload }, { call, put }) {
			const res = yield call(login, {
				account: payload.username,
				password: payload.password
			});
			//group_id:2管理总后台  group_id:3代理后台  group_id:4店铺后台  
			if (res.code !== 0) {
				yield put({
					type: 'saveCurrentUser',
					payload: res.data.userinfo,
				});
				store.set('token', res.data.userinfo.token)
				store.set('username', res.data.userinfo.nickname)
				setAuthority(res.data.userinfo.group_id);
				if (res.data.userinfo.group_id !== 2 && res.data.userinfo.group_id !== 3 && res.data.userinfo.group_id !== 4) {
					message.error('账号密码错误', 2)
				} else {
					message.success(res.msg, 2, () => {
						res.data.userinfo.group_id === 2 ? router.push('/allempower') : res.data.userinfo.group_id === 3 ? router.push('/agent') : router.push('/');
					})
				}

			} else {
				message.error(res.msg, 1)
			}

		},

		*logout(_, { call, put }) {
			store.clearAll();
			yield put({
				type: 'clearCurrentUser'
			});
		},
	},
	reducers: {
		saveCurrentUser(state, action) {
			return { ...state, currentUser: action.payload || {} };
		},
		clearCurrentUser(state, action) {
			return { ...state, currentUser: {} };
		},
	},
};
export default UserModel;
