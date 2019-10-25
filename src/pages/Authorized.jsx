import React from 'react';
import Redirect from 'umi/redirect';
import { connect } from 'dva';
import pathToRegexp from 'path-to-regexp';
import Authorized from '@/utils/Authorized';
import { getAuthority } from '@/utils/authority';
import store from 'store';
import router from 'umi/router'

const getRouteAuthority = (path, routeData) => {
	let authorities;
	routeData.forEach(route => {
		// match prefix
		if (pathToRegexp(`${route.path}(.*)`).test(path)) {
			// exact match
			if (route.path === path) {
				authorities = route.authority || authorities;
			} // get children authority recursively

			if (route.routes) {
				authorities = getRouteAuthority(path, route.routes) || authorities;
			}
		}
	});
	return authorities;
};

const AuthComponent = ({
	children,
	route = {
		routes: [],
	},
	location = {
		pathname: '',
	},
	user,
}) => {
	const { currentUser } = user;
	const { routes = [] } = route;
	const isLogin = currentUser && currentUser.name;

	{
		if (!store.get('manager_authority')) {
			router.push('/user')
		} else {
			//group_id:2管理总后台  group_id:3代理后台  group_id:4店铺后台  
			if (store.get('manager_authority') === 4) {
				//router.push('/');
			} else if (store.get('manager_authority') === 3) {
				router.push('/agent')
			} else if (store.get('manager_authority') === 2) {
				router.push('/allempower')
			} else {
				store.clearAll();
				//router.push('/user');
			}
		}
	}

	return (
		getAuthority() ? (
			<Authorized
				authority={getRouteAuthority(location.pathname, routes) || ''}
				noMatch={isLogin ? <Redirect to="/exception/403" /> : <Redirect to="/user" />}
			>
				{children}
			</Authorized>) : <Redirect to="/user" />
	);
};

export default connect(({ user }) => ({
	user,
}))(AuthComponent);
