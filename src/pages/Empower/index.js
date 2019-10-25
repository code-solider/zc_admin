import React, { Component } from 'react';
import TopFrom from './TopForm'
import List from './List'
import UserModal from './UserModal'
import { connect } from 'dva';
import store from 'store';

@connect(({ sh }) => ({
	sh
}))
class Empower extends Component {

	componentWillMount() {
		let { dispatch, sh } = this.props;
		dispatch({
			type: 'sh/fetch',
			payload: {
				page: sh.data_list_page,
				pageSize: sh.data_list_pageSize
			}
		})
		dispatch({
			type: 'sh/getUserInfo',
		})
	}

	render() {
		return (
			<>
				<TopFrom />
				<List />
				<UserModal />
			</>
		)
	}
}

export default Empower
