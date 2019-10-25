import React, { Component } from 'react';
import TopFrom from './TopForm'
import List from './List'
import { message } from 'antd';
import ModalCom from './ModalCom'
import store from 'store';
import { connect } from 'dva';

@connect(({ wxGroup, enterPay, sh }) => ({
	wxGroup, enterPay, sh
}))
class InvitePage extends Component {

	constructor(props) {
		super(props);
		this.state = {
			isShowModal: false
		}
	}

	componentWillMount() {
		const { dispatch, enterPay } = this.props;
		if (store.get('shUser')) {
			dispatch({
				type: 'enterPay/fetch',
				payload: {
					wxid: store.get('shUser').wx_id,
					type: 2,
					page: enterPay.data_list_page,
					pageSize: enterPay.data_list_pageSize
				}
			})
		}
	}

	componentWillReceiveProps(nextProps) {
		const { sh: { shUser }, dispatch, enterPay } = this.props;
		if (shUser !== nextProps.sh.shUser) {
			dispatch({
				type: 'enterPay/fetch',
				payload: {
					wxid: store.get('shUser').wx_id,
					type: 2,
					page: enterPay.data_list_page,
					pageSize: enterPay.data_list_pageSize
				}
			})
		}
	}

	closeModal = () => {
		this.setState({
			isShowModal: false
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
