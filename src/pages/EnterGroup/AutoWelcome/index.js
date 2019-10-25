import React, { Component } from 'react';
import TopFrom from './TopForm'
import List from './List'
import ModalCom from './ModalCom'
import store from 'store';
import { connect } from 'dva';
import { message } from 'antd';

@connect(({ wxGroup, autoWelcome, sh }) => ({
	wxGroup, autoWelcome, sh
}))
class Page extends Component {

	constructor(props) {
		super(props);
		this.state = {
			isShowModal: false
		}
	}

	componentWillMount() {
		const { dispatch, autoWelcome } = this.props;
		if (store.get('shUser')) {
			dispatch({
				type: 'autoWelcome/fetch',
				payload: {
					wxid: store.get('shUser').wx_id,
					page: autoWelcome.data_list_page,
					pageSize: autoWelcome.data_list_pageSize
				}
			})
		}
	}

	componentWillReceiveProps(nextProps) {
		const { sh: { shUser }, dispatch, autoWelcome } = this.props;
		if (shUser !== nextProps.sh.shUser) {
			dispatch({
				type: 'autoWelcome/fetch',
				payload: {
					wxid: store.get('shUser').wx_id,
					page: autoWelcome.data_list_page,
					pageSize: autoWelcome.data_list_pageSize
				}
			})
		}
	}

	closeModal = () => {
		const { dispatch } = this.props;
		//清除 wxgroup
		dispatch({
			type: 'wxGroup/clearData'
		})
		dispatch({
			type: 'autoWelcome/update',
			payload: {
				currentData: {}
			}
		})
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
					p_type: 1003
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


export default Page;
