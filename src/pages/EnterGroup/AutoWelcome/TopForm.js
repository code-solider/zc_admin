import React, { Component } from 'react';
import { Card, Row, Col, Input, Button, message } from 'antd';
import store from 'store';
import { connect } from 'dva';

const { Search } = Input;

@connect(({ autoWelcome }) => ({
	autoWelcome
}))
class TopFrom extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searchVal: ''
		}
	}

	handleChange = (e) => {
		this.setState({ searchVal: e.target.value })
	}

	handleSearch = (value) => {
		if (store.get('shUser') === undefined) {
			message.error('未选择用户', 1);
			return
		}
		const { dispatch, autoWelcome } = this.props;
		dispatch({
			type: 'autoWelcome/fetch',
			payload: {
				wxid: store.get('shUser').wx_id,
				search: value,
				page: autoWelcome.data_list_page,
				pageSize: autoWelcome.data_list_pageSize
			}
		})
	}

	handleReset = () => {
		this.setState({ searchVal: '' })
		if (store.get('shUser') === undefined) {
			message.error('未选择用户', 1);
			return
		}
		const { dispatch, autoWelcome } = this.props;
		dispatch({
			type: 'autoWelcome/fetch',
			payload: {
				wxid: store.get('shUser').wx_id,
				page: autoWelcome.data_list_page,
				pageSize: autoWelcome.data_list_pageSize
			}
		})
	}
	render() {
		const { onOpenModal } = this.props;
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
						<Button type="primary" onClick={() => onOpenModal(false)}>添加入群欢迎</Button>
					</Col>

				</Row>
			</Card>
		)
	}
}



export default TopFrom
