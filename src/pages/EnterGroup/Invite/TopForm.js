import React, { Component } from 'react';
import { Card, Row, Col, Input, Button, message } from 'antd';
import SelectUserCom from '@/components/GlobalHeader/SelectUserCom';
import { connect } from 'dva';
import store from 'store';

const { Search } = Input;

@connect(({ sh, enterInvite }) => ({
	sh, enterInvite
}))
class TopFrom extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searchVal: ''
		}
	}
	handleSearch = (e) => {
		if (store.get('shUser') === undefined) {
			message.error('尚未选择用户', 2)
			return;
		}
		const { dispatch, enterInvite } = this.props;
		dispatch({
			type: 'enterInvite/fetch',
			payload: {
				wxid: store.get('shUser').wx_id,
				search: this.state.searchVal,
				page: enterInvite.data_list_page,
				pageSize: enterInvite.data_list_pageSize
			},
			callback: () => {
				this.setState({
					searchVal: ''
				})
			}
		})
	}

	handleChange = (e) => {
		this.setState({
			searchVal: e.target.value
		})
	}

	handleReset = () => {
		if (store.get('shUser') === undefined) {
			message.error('尚未选择用户', 2)
			return;
		}
		this.setState({ searchVal: '' })
		const { dispatch, enterInvite } = this.props;
		dispatch({
			type: 'enterInvite/fetch',
			payload: {
				wxid: store.get('shUser').wx_id,
				page: enterInvite.data_list_page,
				pageSize: enterInvite.data_list_pageSize
			}
		})
	}

	render() {
		let { onOpenModal } = this.props;
		const { searchVal } = this.state;
		return (
			<Card>
				<Row>
					<Col span={5}>
						<Search
							placeholder="请输入群名称"
							onSearch={value => this.handleSearch(value)}
							style={{ width: '100%' }}
							enterButton="查询"
							value={searchVal}
							onChange={e => this.handleChange(e)}
						/>
					</Col>
					<Col span={2} offset={1}>
						<Button onClick={this.handleReset}>重置</Button>
					</Col>
					<Col span={2} offset={1}>
						<Button type="primary" onClick={onOpenModal}>添加邀群任务</Button>
					</Col>

				</Row>
			</Card>
		)
	}
}



export default TopFrom
