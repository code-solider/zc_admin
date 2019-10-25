import { Button, Modal, Input, Radio, message } from 'antd';
import React, { Component } from 'react';
import styles from './ModalCom.less'
import AddGroupModal from '@/components/AddGroupModal'
import { connect } from 'dva';
import store from 'store';

@connect(({ sh, enterInvite }) => ({
	sh, enterInvite
}))
class ModalCom extends Component {

	state = {
		childModalIsVisible: false,
	};

	colseChildModal = () => {
		this.setState({ childModalIsVisible: false })
	}

	openChildModal = () => {
		this.setState({ childModalIsVisible: true })
	}

	handleOk = () => {
		const { dispatch, sh: { currentUpdateData }, enterInvite } = this.props;
		if (currentUpdateData['row[group_names]'].replace(/\s*/g, "") === '') {
			message.error('未选择目标群', 1)
			return
		}
		dispatch({
			type: 'sh/addData',
			payload: currentUpdateData,
			callback: () => {
				dispatch({
					type: 'enterInvite/fetch',
					payload: {
						wxid: store.get('shUser').wx_id,
						page: enterInvite.data_list_page,
						pageSize: enterInvite.data_list_pageSize
					}
				});
				dispatch({
					type: 'sh/clearCurrentUpdateData'
				})
				const { onClose } = this.props;
				onClose();
			}
		})
	}

	handleChange = (name, e2) => {
		const { dispatch } = this.props;
		dispatch({
			type: 'sh/changecurrentUpdateData',
			payload: {
				key: name,
				value: e2.target.value
			}
		})
	}

	render() {
		let { childModalIsVisible } = this.state;
		let { visible, onClose, sh: { currentUpdateData } } = this.props;
		return (
			<Modal
				className={styles.modal}
				title="添加/修改邀群任务"
				visible={visible}
				onOk={this.handleOk}
				onCancel={onClose}
			>
				<div className={styles.content_wrap}>
					<div className={styles.item}>
						<div className={styles.one_line}>
							<div className={styles.title}>已选群:</div>
							<div className={styles.r}><Button type="primary" onClick={this.openChildModal}>添加群</Button></div>
						</div>
						<div className={styles.two_line}>
							<Input.TextArea
								value={currentUpdateData['row[group_names]'] || ''}
								autosize={{ minRows: 2, maxRows: 4 }}
							/>
						</div>
						<div className={styles.footer}>请添加目标群，可选多个。</div>
					</div>

					<div className={styles.item}>
						<div className={styles.one_line}>
							<div className={styles.title}>需邀请人数:</div>
						</div>
						<div className={styles.two_line}>
							<Input value={currentUpdateData['row[in_num]'] || ''} onChange={(e) => this.handleChange('row[in_num]', e)} addonAfter="人" />
						</div>
						<div className={styles.footer}>请输入完成任务，需要邀请进群的多人数</div>
					</div>

					<div className={styles.item}>
						<div className={styles.one_line}>
							<div className={styles.title}>查询任务情况关键词:</div>
						</div>
						<div className={styles.two_line}>
							<Input value={currentUpdateData['row[keyword]'] || ''} onChange={(e) => this.handleChange('row[keyword]', e)} />
						</div>
						<div className={styles.footer}>群内成员@机器人并发送以上关键词，即可获悉自己当前任务完成情况</div>
					</div>

					<div className={styles.item}>
						<div className={styles.one_line}>
							<div className={styles.title}>进行中回复内容:</div>
						</div>
						<div className={styles.two_line}>
							<Input.TextArea
								onChange={(e) => this.handleChange('row[process_word]', e)}
								autosize={{ minRows: 3, maxRows: 4 }}
								value={currentUpdateData['row[process_word]'] || ''}
							/>
						</div>
						<div className={styles.footer}>
							例如：亲爱的感谢您的支持与厚爱，您当前已邀请dq人，还需要邀请hx人，加油哦。
							dq=已邀约人数，hx=还需要邀请的人数
            			</div>
					</div>

					<div className={styles.item}>
						<div className={styles.one_line}>
							<div className={styles.title}>完成回复内容:</div>
						</div>
						<div className={styles.two_line}>
							<Input.TextArea
								onChange={(e) => this.handleChange('row[done_word]', e)}
								autosize={{ minRows: 3, maxRows: 4 }}
								value={currentUpdateData['row[done_word]'] || ''}
							/>
						</div>
						<div className={styles.footer}>例如1：亲爱的你真棒，您是第mc名哦，请添加微信：pm-liuming领取奖励哦，刚刚给你发了一点小惊喜，注意查看微信哟</div>
					</div>

					<div className={styles.item}>
						<div className={styles.one_line}>
							<div className={styles.title}>是否开启红包奖励:</div>
						</div>
						<div className={styles.two_line}>
							<Radio.Group onChange={(e) => this.handleChange('row[red_status]', e)} value={currentUpdateData['row[red_status]']}>
								<Radio value={0}>关闭</Radio>
								<Radio value={1}>开启</Radio>
							</Radio.Group>
							<Input value={currentUpdateData['row[red_num]'] || ''} onChange={(e) => this.handleChange('row[red_num]', e)} addonAfter="元" />
						</div>
						<div className={styles.footer}>请输入红包奖励金额。注：开启次功能必须配置微信企业支付相关信息，才能自动发红包</div>
					</div>

				</div>
				<AddGroupModal
					visible={childModalIsVisible}
					onClose={this.colseChildModal}
				/>
			</Modal>
		)
	}
}


export default ModalCom;
