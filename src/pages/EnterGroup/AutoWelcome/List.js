import React, { Component } from 'react';
import { Card, Table, Divider, Popconfirm } from 'antd';
import { connect } from 'dva';
import store from 'store';

@connect(({ autoWelcome }) => ({
	autoWelcome
}))
class List extends Component {

	// 回调函数，切换页
	handleTableChange = (e) => {
		const { dispatch, autoWelcome } = this.props;
		dispatch({
			type: 'autoWelcome/update',
			payload: {
				data_list_page: e,
				data_list_pageSize: autoWelcome.data_list_pageSize
			}
		})
		dispatch({
			type: 'autoWelcome/fetch',
			payload: {
				wxid: store.get('shUser').wx_id,
				type: 1,
				page: e,
				pageSize: autoWelcome.data_list_pageSize
			}
		})
	}

	// 回调函数,每页显示多少条
	changePageSize = (pageSize, current) => {
		const { dispatch } = this.props;

		// 将当前改变的每页条数存到store中
		dispatch({
			type: 'autoWelcome/update',
			payload: {
				data_list_page: current,
				data_list_pageSize: pageSize
			}
		})

		// 向后台请求
		dispatch({
			type: 'autoWelcome/fetch',
			payload: {
				wxid: store.get('shUser').wx_id,
				type: 1,
				page: current,
				pageSize: pageSize
			}
		})
	}

	handleDel = (e) => {
		const { dispatch, autoWelcome } = this.props;
		dispatch({
			type: 'autoWelcome/del',
			payload: {
				ids: e.id
			},
			callback: () => {
				dispatch({
					type: 'autoWelcome/fetch',
					payload: {
						wxid: store.get('shUser').wx_id,
						page: autoWelcome.data_list_page,
						pageSize: autoWelcome.data_list_pageSize
					}
				})
			}
		})
	}

	handleEdit = (e) => {
		const { dispatch, onOpenModal } = this.props;
		e.welcomeContents = eval(e.welcomeContents)
		dispatch({
			type: 'autoWelcome/update',
			payload: {
				currentData: e
			},
			callback: () => {
				onOpenModal(true)
			}
		})
		dispatch({
			type: 'wxGroup/changeData',
			payload: {
				wxid: store.get('shUser').wx_id,
				group_names: e.group_names,
				gid: e.gid,
				p_type: 1003
			}
		})
	}

	render() {
		const columns = [
			{
				title: '任务创建时间',
				dataIndex: 'createTime',
				key: 'createTime',
			},
			{
				title: '群名称',
				dataIndex: 'group_names',
				key: 'group_names',
			},
			{
				title: '入群欢迎',
				dataIndex: 'welcomeContents',
				key: 'welcomeContents',
				render: (text, record) => (
					'数组无法显示'
				),
			},
			{
				title: '操作',
				key: 'option',
				render: (text, record) => (
					<span>
						<a href="javascript:;" onClick={() => this.handleEdit(record)}>修改</a>
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
		const { autoWelcome: { data_list, data_list_total } } = this.props;
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
					dataSource={data_list}
					columns={columns}
					pagination={paginationProps}
				/>
			</Card>
		)
	}
}

export default List