import React, { Component } from 'react';
import TopFrom from './TopForm'
import List from './List'
import ModalCom from './ModalCom'
import { connect } from 'dva';
import store from 'store';
import { message } from 'antd';

@connect(({ sh, enterInvite }) => ({
	sh, enterInvite
}))
class InvitePage extends Component {

	constructor(props) {
		super(props);
		this.state = {
			isShowModal: false,
		}
	}

	componentWillMount() {
		let { dispatch, sh: { shUser }, enterInvite } = this.props;
		if (store.get('shUser')) {
			dispatch({
				type: 'enterInvite/fetch',
				payload: {
					wxid: store.get('shUser').wx_id,
					page: enterInvite.data_list_page,
					pageSize: enterInvite.data_list_pageSize
				}
			})
		}

	}

	componentWillReceiveProps(nextProps) {
		const { sh: { shUser }, dispatch, enterInvite } = this.props;
		if (shUser !== nextProps.sh.shUser) {
			dispatch({
				type: 'enterInvite/fetch',
				payload: {
					wxid: store.get('shUser').wx_id,
					page: enterInvite.data_list_page,
					pageSize: enterInvite.data_list_pageSize
				}
			})
		}
	}

	closeModal = () => {
		const { dispatch } = this.props;
		dispatch({
			type: 'sh/update',
			payload: {
				currentUpdateData: {}
			}
		})
		this.setState({
			isShowModal: false
		})
	}

	openModal = () => {
		if (store.get('shUser') === undefined) {
			message.error('尚未选择用户', 2)
			return;
		}
		const { dispatch } = this.props;

		dispatch({
			type: 'sh/get_wx_group_list',
			payload: {
				wxid: store.get('shUser').wx_id,
				p_type: 1001
			}
		})

		this.setState({
			isShowModal: true
		})
	}

	render() {
		let { isShowModal, isShowModalUpdate } = this.state;
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