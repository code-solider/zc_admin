import React, { Component } from 'react';
import { Card, Table, Divider, Tag, Popconfirm } from 'antd';
import { connect } from 'dva';

@connect(({ sh }) => ({
	sh
}))

class List extends Component {

	handleUpdateClick = (e) => {
		let { dispatch } = this.props;
		dispatch({
			type: 'sh/update',
			payload: {
				currentData: e,
				showModal: true
			}
		})
	}

	// 回调函数，切换页
	handleTableChange = (e) => {
		const { dispatch, sh } = this.props;
		dispatch({
			type: 'sh/update',
			payload: {
				data_list_page: e,
				data_list_pageSize: sh.data_list_pageSize
			}
		})
		dispatch({
			type: 'sh/fetch',
			payload: {
				page: e,
				pageSize: sh.data_list_pageSize
			}
		})
	}

	// 回调函数,每页显示多少条
	changePageSize = (pageSize, current) => {
		const { dispatch } = this.props;

		// 将当前改变的每页条数存到store中
		dispatch({
			type: 'sh/update',
			payload: {
				data_list_page: current,
				data_list_pageSize: pageSize
			}
		})

		// 向后台请求
		dispatch({
			type: 'sh/fetch',
			payload: {
				page: current,
				pageSize: pageSize
			}
		})
	}

	handleDel = (e) => {
		const { dispatch, sh } = this.props;
		dispatch({
			type: 'sh/del',
			payload: {
				ids: e.id
			},
			callback: () => {
				dispatch({
					type: 'sh/fetch',
					payload: {
						page: sh.data_list_page,
						pageSize: sh.data_list_pageSize
					}
				})
			}
		})
	}

	render() {

		const columns = [
			{
				title: '员工姓名',
				dataIndex: 'name',
				key: 'name',
				width: '100px'
			},
			{
				title: '授权码',
				dataIndex: 'auth_code',
				key: 'auth_code',
				width: '300px'
			},
			{
				title: '已绑定微信名称',
				dataIndex: 'wx_name',
				key: 'wx_name',
			},
			{
				title: '已绑定微信ID',
				dataIndex: 'wx_id',
				key: 'wx_id',
			},
			{
				title: '备注',
				dataIndex: 'remark',
				key: 'remark',
			},
			{
				title: '创建时间',
				dataIndex: 'createTime',
				key: 'createTime',
			},
			{
				title: '状态',
				dataIndex: 'status',
				key: 'status',
				render: status => (
					status === 0 ? (<Tag color={'#87d068'} >未激活</Tag>) : '已激活'
				),
			},
			{
				title: '操作',
				key: 'option',
				width: '150px',
				render: (text, record) => (
					<span>
						<a href="javascript:;" onClick={() => this.handleUpdateClick(record)}>修改</a>
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
		let { sh: { data_list, data_list_total } } = this.props;
		const paginationProps = {
			page: 1,
			onChange: (page) => this.handleTableChange(page),
			total: data_list_total,
			showSizeChanger: true,
			showQuickJumper: false,
			showTotal: () => `共${data_list_total}条`,
			onShowSizeChange: (current, pageSize) => this.changePageSize(pageSize, current),
		}
		return (
			<Card style={{ marginTop: '20px' }}>
				<Table
					bordered
					dataSource={data_list} columns={columns}
					pagination={paginationProps}
				/>

			</Card>
		)
	}
}



export default List
