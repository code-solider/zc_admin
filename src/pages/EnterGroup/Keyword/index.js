import React, { Component } from 'react';
import TopFrom from './TopForm'
import List from './List'
import ModalCom from './ModalCom'
import { message } from 'antd';
import store from 'store';
import { connect } from 'dva';

@connect(({ enterKeyword, wxGroup, sh }) => ({
	enterKeyword, wxGroup, sh
}))
class InvitePage extends Component {

	constructor(props) {
		super(props);
		this.state = {
			isShowModal: false
		}
	}


	componentWillMount() {
		if (store.get('shUser')) {
			const { dispatch, enterKeyword } = this.props;
			dispatch({
				type: 'enterKeyword/fetch',
				payload: {
					wxid: store.get('shUser').wx_id,
					type: 1,
					page: enterKeyword.keyword_list_page,
					pageSize: enterKeyword.keyword_list_pageSize
				}
			})
		}

	}

	componentWillReceiveProps(nextProps) {
		const { sh: { shUser }, dispatch, enterKeyword } = this.props;
		if (shUser !== nextProps.sh.shUser) {
			dispatch({
				type: 'enterKeyword/fetch',
				payload: {
					wxid: store.get('shUser').wx_id,
					type: 1,
					page: enterKeyword.keyword_list_page,
					pageSize: enterKeyword.keyword_list_pageSize
				}
			})
		}
	}

	closeModal = () => {
		this.setState({
			isShowModal: false
		})
		const { dispatch } = this.props;
		dispatch({
			type: 'wxGroup/clearData'
		})
		dispatch({
			type: 'enterKeyword/update',
			payload: {
				currentData: {}
			}
		})
	}

	openModal = (isUpdate) => { // 传true代表更新 否则新增
		if (store.get('shUser') === undefined) {
			message.error('尚未选择用户', 2)
			return;
		}
		if (!isUpdate) {
			const { dispatch } = this.props;
			dispatch({
				type: 'wxGroup/changeData',
				payload: {
					wxid: store.get('shUser').wx_id,
					group_names: '',
					gid: '',
					p_type: 1002
				}
			})
		}


		this.setState({
			isShowModal: true
		})
	}

	render() {
		let { isShowModal } = this.state;
		return (
			<div>
				<TopFrom
					onOpenModal={this.openModal}
				/>
				<List
					onOpenModal={this.openModal}
				/>
				<ModalCom
					visible={isShowModal}
					onClose={this.closeModal}
				/>
			</div>
		)
	}
}

export default InvitePage;