import { Button, Modal, Input, Radio } from 'antd';
import React, { Component } from 'react';
import styles from './ModalCom.less'
import AddGroupModal from '@/components/AddGroupModal'
import { connect } from 'dva';
import store from 'store';
import WxGroup from '@/components/WxGroup';

@connect(({ wxGroup, enterPay }) => ({
	wxGroup, enterPay
}))
class ModalCom extends Component {

	state = {
		value: 1,
		childModalIsVisible: false
	};

	onChange = e => {
		console.log('radio checked', e.target.value);
		this.setState({
			value: e.target.value,
		});
	};

	colseChildModal = () => {
		this.setState({ childModalIsVisible: false })
	}

	openChildModal = () => {
		this.setState({ childModalIsVisible: true })
	}

	handleChange = (e) => {
		const { dispatch, enterPay } = this.props;
		dispatch({
			type: 'enterPay/update',
			payload: {
				currentData: { ...enterPay.currentData, money: e.target.value }
			}
		})
	}

	handleOk = () => {
		const { dispatch, enterPay, wxGroup, onClose } = this.props;
		dispatch({
			type: 'enterPay/addData',
			payload: {
				'row[wxid]': store.get('shUser').wx_id,
				'row[gid]': wxGroup.gid,
				'row[group_names]': wxGroup.group_names,
				'row[type]': 2,
				'row[money]': enterPay.currentData.money,
				ids: enterPay.currentData.id
			},
			callback: () => {
				//1,清除model/wxGroup 数据
				dispatch({
					type: 'wxGroup/clearData'
				})
				//2,关闭model
				onClose()
				//3,清除 model/enterPay 数据
				dispatch({
					type: 'enterPay/update',
					payload: {
						currentData: {}
					}
				})
				//4, 获取最新数据
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

	render() {
		let { childModalIsVisible } = this.state;
		const { visible, onClose, wxGroup, enterPay } = this.props;
		return (
			<Modal
				className={styles.modal}
				title="添加邀群任务"
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
						<div className={styles.footer}>
							请添加目标群，可选多个。但只拉进一个群，当其中一个群满员自动拉有空位的群
            </div>
					</div>


					<div className={styles.item}>
						<div className={styles.one_line}>
							<div className={styles.title}>
								付费金额:
              </div>
						</div>
						<div className={styles.two_line}>
							<Input value={enterPay.currentData.money} onChange={(e) => this.handleChange(e)} />
						</div>
						<div className={styles.footer}>
							请输入付费金额
            </div>
					</div>

				</div>
				<WxGroup
					visible={childModalIsVisible}
					onClose={this.colseChildModal}
				/>
			</Modal>
		)
	}
}


export default ModalCom;
