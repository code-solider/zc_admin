import React, { Component } from 'react';
import { Card, Table, Divider, Popconfirm } from 'antd';
import { connect } from 'dva';
import store from 'store';

@connect(({ sh, enterInvite }) => ({
	sh, enterInvite
}))
class List extends Component {
	handleDel = (e) => {
		const { dispatch, enterInvite } = this.props;
		dispatch({
			type: 'enterInvite/del',
			payload: { ids: e.id },
			callback: () => {
				dispatch({
					type: 'enterInvite/fetch',
					payload: {
						wxid: store.get('shUser').wx_id,
						page: enterInvite.data_list_page,
						pageSize: enterInvite.data_list_pageSize

					}
				})
			}
		})
	}

	// 回调函数，切换页
	handleTableChange = (e) => {
		const { dispatch, enterInvite } = this.props;
		dispatch({
			type: 'enterInvite/update',
			payload: {
				data_list_page: e,
				data_list_pageSize: enterInvite.data_list_pageSize
			}
		})
		dispatch({
			type: 'enterInvite/fetch',
			payload: {
				wxid: store.get('shUser').wx_id,
				page: e,
				pageSize: enterInvite.data_list_pageSize
			}
		})
	}

	// 回调函数,每页显示多少条
	changePageSize = (pageSize, current) => {
		const { dispatch } = this.props;

		// 将当前改变的每页条数存到store中
		dispatch({
			type: 'enterInvite/update',
			payload: {
				data_list_page: current,
				data_list_pageSize: pageSize
			}
		})

		// 向后台请求
		dispatch({
			type: 'enterInvite/fetch',
			payload: {
				wxid: store.get('shUser').wx_id,
				page: current,
				pageSize: pageSize
			}
		})
	}

	handleUpdate = (e) => {
		const { onOpenModal, dispatch } = this.props;
		dispatch({
			type: 'sh/updateInviteUserData',
			payload: {
				'ids': e.id,
				'row[wxid]': e.wxid,
				'row[gid]': e.gid,
				'row[group_names]': e.group_names,
				'row[in_num]': e.in_num,
				'row[keyword]': e.keyword,
				'row[process_word]': e.process_word,
				'row[done_word]': e.done_word,
				'row[red_status]': e.red_status,
				'row[red_num]': e.red_num
			}
		})
		onOpenModal();
	}

	render() {

		const columns = [
			{
				title: '任务创建时间',
				dataIndex: 'createTime',
				key: 'createTime',
			},
			{
				title: '目标群',
				dataIndex: 'group_names',
				key: 'group_names',
			},
			{
				title: '需邀请人数',
				dataIndex: 'in_num',
				key: 'in_num',
			},
			{
				title: '已完成的人',
				dataIndex: 'done_num',
				key: 'done_num',
			},
			{
				title: '正在努力中的人',
				dataIndex: 'process_num',
				key: 'process_num',
			},
			{
				title: '咸鱼',
				dataIndex: 'xianyu',
				key: 'xianyu',
			},
			{
				title: '累计发送红包金额',
				dataIndex: 'all_red',
				key: 'all_red',
			},
			{
				title: '操作',
				key: 'option',
				render: (text, record) => (
					<span>
						<a href="javascript:;" onClick={() => this.handleUpdate(text)}>修改</a>
						<Divider type="vertical" />
						<Popconfirm
							title="确认删除?"
							onConfirm={() => this.handleDel(text)}
							okText="是"
							cancelText="否"
						>
							<a href="javascript:;">删除</a>
						</Popconfirm>
					</span >
				),
			},
		];
		const { enterInvite: { data_list, data_list_total } } = this.props;
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
					dataSource={data_list} columns={columns}
					pagination={paginationProps}
				/>
			</Card>
		)
	}
}



export default List
