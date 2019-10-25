import React, { Component } from 'react';
import { Card, Row, Col, Input, Button, message } from 'antd';
import store from 'store';
import { connect } from 'dva';

const { Search } = Input;

@connect(({ enterKeyword }) => ({
	enterKeyword
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
			message.error('尚未选择用户', 2)
			return;
		}
		const { dispatch, enterKeyword } = this.props;
		dispatch({
			type: 'enterKeyword/fetch',
			payload: {
				wxid: store.get('shUser').wx_id,
				type: 1,
				search: value,
				page: enterKeyword.keyword_list_page,
				pageSize: enterKeyword.keyword_list_pageSize
			}
		})
	}

	handleReset = () => {
		this.setState({ searchVal: '' })
		if (store.get('shUser') === undefined) {
			message.error('尚未选择用户', 2)
			return;
		}
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
						<Button type="primary" onClick={() => onOpenModal(false)}>添加进群关键词</Button>
					</Col>

				</Row>
			</Card>
		)
	}
}



export default TopFrom
