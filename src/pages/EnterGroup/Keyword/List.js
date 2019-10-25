import React, { Component } from 'react';
import { Card, Table, Divider, Pagination, Popconfirm } from 'antd';
import { connect } from 'dva';
import store from 'store';
@connect(({ enterKeyword, wxGroup }) => ({
	enterKeyword, wxGroup
}))
class List extends Component {

	handleDel = (e) => {
		const { dispatch, enterKeyword } = this.props;
		dispatch({
			type: 'enterKeyword/delKeyword',
			payload: {
				ids: e.id
			},
			callback: () => {
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
		})
	}

	// 回调函数，切换页
	handleTableChange = (e) => {
		const { dispatch, enterKeyword } = this.props;
		dispatch({
			type: 'enterKeyword/updatePagination',
			payload: {
				keyword_list_page: e,
				keyword_list_pageSize: enterKeyword.keyword_list_pageSize
			}
		})
		dispatch({
			type: 'enterKeyword/fetch',
			payload: {
				wxid: store.get('shUser').wx_id,
				type: 1,
				page: e,
				pageSize: enterKeyword.keyword_list_pageSize
			}
		})
	}

	// 回调函数,每页显示多少条
	changePageSize = (pageSize, current) => {
		const { dispatch } = this.props;

		// 将当前改变的每页条数存到store中
		dispatch({
			type: 'enterKeyword/updatePagination',
			payload: {
				keyword_list_page: current,
				keyword_list_pageSize: pageSize
			}
		})

		// 向后台请求
		dispatch({
			type: 'enterKeyword/fetch',
			payload: {
				wxid: store.get('shUser').wx_id,
				type: 1,
				page: current,
				pageSize: pageSize
			}
		})
	}

	//修改数据
	handleUpdate = (e) => {
		const { dispatch, onOpenModal } = this.props;
		dispatch({
			type: 'enterKeyword/update',
			payload: {
				currentData: e
			}
		})
		dispatch({
			type: 'wxGroup/changeData',
			payload: {
				wxid: store.get('shUser').wx_id,
				group_names: e.group_names,
				gid: e.gid,
				p_type: 1002
			}
		})
		onOpenModal(true)
	}

	render() {
		const columns = [
			{
				title: '任务创建时间',
				dataIndex: 'createTime',
				key: 'createTime',
				width: '200px'
			},
			{
				title: '进群关键词',
				dataIndex: 'keyword',
				key: 'keyword',
			},
			{
				title: '目标群',
				dataIndex: 'group_names',
				key: 'group_names',
				width: '200px'
			},
			{
				title: '累计已拉人数',
				dataIndex: 'num',
				key: 'num',
				width: '160px'
			},
			{
				title: '操作',
				key: 'option',
				width: '170px',
				render: (text, record) => (
					<span>
						<a href="javascript:;" onClick={() => this.handleUpdate(record)}>修改</a>
						<Divider type="vertical" />
						<Popconfirm
							title="确认删除?"
							onConfirm={() => this.handleDel(record)}
							okText="是"
							cancelText="否"
						>
							<a href="javascript:;">删除</a>
						</Popconfirm>
					</span>
				),
			},
		];
		const { enterKeyword: { keyword_list, keyword_list_total } } = this.props;
		const paginationProps = {
			page: 1,
			onChange: (page) => this.handleTableChange(page),
			total: keyword_list_total,
			showSizeChanger: true,
			showQuickJumper: false,
			showTotal: () => `共${keyword_list_total}条`,
			onShowSizeChange: (current, pageSize) => this.changePageSize(pageSize, current),
		}
		return (
			<Card style={{ marginTop: '20px' }}>
				<Table
					bordered
					rowKey='id'
					dataSource={keyword_list} columns={columns}
					pagination={paginationProps}
				/>
			</Card>
		)
	}
}



export default List
