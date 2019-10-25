import React, { Component } from 'react';
import { Card, Table, Divider, Popconfirm } from 'antd';
import { connect } from 'dva';
import store from 'store';

@connect(({ enterPay }) => ({
	enterPay
}))
class List extends Component {

	handleDel = (e) => {
		const { dispatch, enterPay } = this.props;
		dispatch({
			type: 'enterPay/del',
			payload: {
				ids: e.id
			},
			callback: () => {
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
		})
	}

	// 回调函数，切换页
	handleTableChange = (e) => {
		const { dispatch, enterPay } = this.props;
		dispatch({
			type: 'enterPay/update',
			payload: {
				data_list_page: e,
				data_list_pageSize: enterPay.data_list_pageSize
			}
		})
		dispatch({
			type: 'enterPay/fetch',
			payload: {
				wxid: store.get('shUser').wx_id,
				type: 2,
				page: e,
				pageSize: enterPay.data_list_pageSize
			}
		})
	}

	// 回调函数,每页显示多少条
	changePageSize = (pageSize, current) => {
		const { dispatch } = this.props;

		// 将当前改变的每页条数存到store中
		dispatch({
			type: 'enterPay/update',
			payload: {
				data_list_page: current,
				data_list_pageSize: pageSize
			}
		})

		// 向后台请求
		dispatch({
			type: 'enterPay/fetch',
			payload: {
				wxid: store.get('shUser').wx_id,
				type: 2,
				page: current,
				pageSize: pageSize
			}
		})
	}

	//修改数据
	handleUpdate = (e) => {
		const { dispatch, onOpenModal } = this.props;
		dispatch({
			type: 'enterPay/update',
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
			},
			{
				title: '付费金额',
				dataIndex: 'money',
				key: 'money',
			},
			{
				title: '目标群',
				dataIndex: 'group_names',
				key: 'group_names',
			},
			{
				title: '累计已拉人数',
				dataIndex: 'num',
				key: 'num',
			},
			{
				title: '操作',
				key: 'option',
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
		const { enterPay: { data_list, data_list_total } } = this.props;
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
					rowKey='id'
					pagination={paginationProps}
					dataSource={data_list}
					columns={columns}
				/>
			</Card>
		)
	}
}



export default List
