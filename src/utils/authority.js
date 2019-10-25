import store from 'store';

//获取
export function getAuthority() {
	return store.get('manager_authority');
}

//存入
export function setAuthority(authority) {
	return store.set('manager_authority', authority);
}
