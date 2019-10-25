import { Button, Modal, Input, Divider, Switch, InputNumber, Table, Icon, Popconfirm, Row, Col, message } from 'antd';
import React, { Component } from 'react';
import styles from './ModalCom.less'
import WxGroup from '@/components/WxGroup'
import WenziModal from './WenziModal'
import FileModal from './FileModal'
import ImgTextModal from './ImgTextModal'
import { connect } from 'dva';
import store from 'store';

@connect(({ autoWelcome, wxGroup }) => ({
	autoWelcome, wxGroup
}))

class ModalCom extends Component {

	state = {
		value: 1,
		childModalIsVisible: false,
		showAddWzModal: false,
		showAddFileModal: false,
		showAddImgTextModal: false
	};

	colseChildModal = () => {
		this.setState({ childModalIsVisible: false })
	}

	openChildModal = () => {
		this.setState({ childModalIsVisible: true })
	}


	showModal = (e) => {
		//e=1 文字modal e=2 文件modal
		e === 1 ? this.setState({ showAddWzModal: true }) : e === 2 ? this.setState({ showAddFileModal: true }) : e === 3 ? this.setState({ showAddImgTextModal: true }) : null
	}

	closeModal = (e) => {
		//e=1 文字modal e=2 文件modal
		e === 1 ? this.setState({ showAddWzModal: false }) : e === 2 ? this.setState({ showAddFileModal: false }) : e === 3 ? this.setState({ showAddImgTextModal: false }) : null
	}

	handleChange = (name, e) => {
		const { dispatch, autoWelcome: { currentData } } = this.props;
		let oldData = currentData;
		switch (name) {
			case 'triggerTime':
				oldData.triggerTime = e;
				break;
			case 'intervalNum':
				oldData.intervalNum = e;
				break;
			case 'switchTime':
				oldData.switchTime = e;
				break;
			case 'switchNum':
				oldData.switchNum = e;
				break;
		}
		dispatch({
			type: 'autoWelcome/update',
			payload: {
				currentData: oldData
			}
		})
	}

	handleOk = () => {
		const { onClose, dispatch, wxGroup, autoWelcome: { currentData, data_list_page, data_list_pageSize } } = this.props;
		if (wxGroup.group_names.replace(/\s*/g, "") === '') {
			message.error('未选择目标群', 1)
			return
		}
		if (currentData.welcomeContents) {
			currentData.welcomeContents = JSON.stringify(currentData.welcomeContents).replace(/\"/g, "'") + ''
		}
		dispatch({
			type: 'autoWelcome/addData',
			payload: {
				ids: currentData.id,
				'row[wxid]': store.get('shUser').wx_id,
				'row[gid]': wxGroup.gid,
				'row[group_names]': wxGroup.group_names,
				'row[welcomeContents]': currentData.welcomeContents || "[]",
				'row[triggerTime]': currentData.triggerTime,
				'row[switchTime]': currentData.switchTime === true ? 1 : 0,
				'row[intervalNum]': currentData.intervalNum,
				'row[switchNum]': currentData.switchNum === true ? 1 : 0
			},
			callback: () => {
				dispatch({
					type: 'autoWelcome/fetch',
					payload: {
						wxid: store.get('shUser').wx_id,
						page: data_list_page,
						pageSize: data_list_pageSize
					}
				})
			}
		})
		onClose();
	}

	handleDel = (e) => {
		const { dispatch, autoWelcome: { currentData } } = this.props;
		let newArr = currentData.welcomeContents.filter(item => item.weight !== e.weight);
		dispatch({
			type: 'autoWelcome/update',
			payload: {
				currentData: { ...currentData, welcomeContents: newArr }
			}
		})
	}

	move = (action, e) => {
		const { dispatch, autoWelcome: { currentData } } = this.props;
		let newArr = currentData.welcomeContents;
		switch (action) {
			case 'up':
				for (let index in newArr) {
					if (newArr[index] === e) {
						if (Number(index) !== 0) {//判断不是第一个
							newArr.splice(index, 1);
							newArr.splice(index - 1, 0, e);
							dispatch({
								type: 'autoWelcome/update',
								payload: {
									currentData: { ...currentData, welcomeContents: newArr }
								}
							})
						}
					}
				}
				break;
			case 'down':
				for (let index in newArr) {
					if (newArr[index] === e) {
						if (Number(index) !== newArr.length - 1) {//判断不是最后一个
							newArr.splice(index, 1);
							newArr.splice(Number(index) + 1, 0, e);
							dispatch({
								type: 'autoWelcome/update',
								payload: {
									currentData: { ...currentData, welcomeContents: newArr }
								}
							})
							return;
						}
					}
				}
				break
		}
	}

	handleEdit = (value) => {
		const { dispatch } = this.props;
		if (value.type === (2 || 3 || 4)) {
			message.error('非文字请删除后重新添加', 1)
		} else if (value.type === 1) {
			dispatch({
				type: 'autoWelcome/update',
				payload: {
					WenziModalInitVal: value
				}
			})
			this.setState({ showAddWzModal: true })
		}

	}

	render() {
		let { childModalIsVisible, showAddWzModal, showAddFileModal, showAddImgTextModal } = this.state;
		let { visible, onClose, wxGroup, autoWelcome: { currentData } } = this.props;

		const columns = [
			{
				title: '类型',
				dataIndex: 'type',
				key: 'type',
				render: (text) => (
					text === 1 ? '文本' : text === 2 ? '图片' : text === 3 ? '视频' : text === 4 ? '图文消息' : '其他'
				),
			},
			{
				title: '内容',
				dataIndex: 'content',
				key: 'content',
				render: (text, record) => (
					record.type === 1 ? text :
						record.type === 2 ? <img style={{ width: '100px', height: '100px' }} src={text} /> :
							record.type === 3 ? <video src={text} /> :
								record.type === 4 ? <img style={{ width: '100px', height: '100px' }} src={text} /> : '其他'
				),
			},
			{
				title: '操作',
				key: 'address',
				width: '140px',
				render: (text, record) => (
					<span>
						<Icon type="up-circle" onClick={() => this.move('up', record)} />
						<Divider type="vertical" />
						<Icon type="down-circle" onClick={() => this.move('down', record)} />
						<Divider type="vertical" />
						<Icon type="edit" onClick={() => this.handleEdit(record)} />
						<Divider type="vertical" />
						<Popconfirm
							title="确认删除?"
							onConfirm={() => this.handleDel(record)}
							okText="确认"
							cancelText="取消"
						>
							<Icon type="delete" />
						</Popconfirm>
					</span>
				),
			},
		];
		return (
			<Modal
				className={styles.modal}
				title="添加自动欢迎"
				visible={visible}
				onOk={this.handleOk}
				onCancel={onClose}
			>
				<div className={styles.content_wrap}>
					<div className={styles.item}>
						<div className={styles.one_line}>
							<div className={styles.title}>
								已选群:
              </div>
							<div className={styles.r}>
								<Button type="primary" onClick={this.openChildModal}>添加群</Button>
							</div>
						</div>
						<div className={styles.two_line}>
							<Input.TextArea
								value={wxGroup.group_names || ''}
								autosize={{ minRows: 2, maxRows: 4 }}
							/>
						</div>
						{/* <div className={styles.footer}>
							请添加目标群，可选多个。但只拉进一个群，当其中一个群满员自动拉有空位的群
            </div> */}
					</div>
					<div className={styles.config}>
						<div className={styles.item}>
							<Switch checked={currentData.switchTime} onChange={(e) => this.handleChange('switchTime', e)} />
							进群 <InputNumber value={currentData.triggerTime} onChange={(e) => this.handleChange('triggerTime', e)} /> 秒后发送欢迎语
            </div>
						<Divider type="vertical" />
						<div className={styles.item}>
							<Switch checked={currentData.switchNum} onChange={(e) => this.handleChange('switchNum', e)} />
							进群 <InputNumber value={currentData.intervalNum} onChange={(e) => this.handleChange('intervalNum', e)} /> 人后发送欢迎语
            </div>
					</div>
					<Divider />
					<div className={styles.content}>
						<div className={styles.one_line}>
							<div>已添加回复内容</div>
							<div className={styles.btn}>
								<Button type="primary" onClick={() => this.showModal(1)}>+ 文字</Button>
								<Button type="primary" onClick={() => this.showModal(2)}>+ 文件</Button>
								<Button type="primary" onClick={() => this.showModal(3)}>+ 图文链接</Button>
							</div>
						</div>
						<Table
							rowKey="uid"
							className={styles.table}
							dataSource={currentData.welcomeContents}
							columns={columns}
							bordered={true}
						/>
					</div>
				</div>
				<WxGroup
					visible={childModalIsVisible}
					onClose={this.colseChildModal}
				/>
				{ /*新增文字modal*/}
				<WenziModal
					visiable={showAddWzModal}
					onClose={this.closeModal}
				/>
				{ /* 新增文件 modal */}
				<FileModal
					visiable={showAddFileModal}
					onClose={this.closeModal}
				/>
				{/* 新增图文 MODAL */}
				<ImgTextModal
					visiable={showAddImgTextModal}
					onClose={this.closeModal}
				/>
			</Modal>
		)
	}
}


export default ModalCom;
