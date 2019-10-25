import { Button, Modal, Input, Radio, message } from 'antd';
import React, { Component } from 'react';
import styles from './ModalCom.less'
//import AddGroupModal from '@/components/AddGroupModal'
import { connect } from 'dva';
import store from 'store';
import WxGroup from '@/components/WxGroup';

@connect(({ enterKeyword, wxGroup }) => ({
	enterKeyword, wxGroup
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

	handleChange = (e) => {
		const { dispatch, enterKeyword } = this.props;
		dispatch({
			type: 'enterKeyword/update',
			payload: {
				currentData: { ...enterKeyword.currentData, keyword: e.target.value }
			}
		})
	}

	handleOk = () => {
		const { onClose, dispatch, wxGroup, enterKeyword } = this.props;
		if (wxGroup.group_names.replace(/\s*/g, "") === '') {
			message.error('未选择目标群', 1)
			return
		} else if (enterKeyword.currentData.keyword.replace(/\s*/g, "") === '') {
			message.error('未填写关键词', 1)
			return
		}
		dispatch({
			type: 'enterKeyword/addKeyword',
			payload: {
				'row[wxid]': store.get('shUser').wx_id,
				'row[gid]': wxGroup.gid,
				'row[group_names]': wxGroup.group_names,
				'row[type]': 1,
				'row[keyword]': enterKeyword.currentData.keyword,
				ids: enterKeyword.currentData.id
			},
			callback: () => {
				dispatch({
					type: 'wxGroup/clearData'
				})
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
		onClose();
	}

	render() {
		const { childModalIsVisible, in_num } = this.state;
		const { visible, onClose, enterKeyword, wxGroup } = this.props;
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
								拉人关键词:
              </div>
						</div>
						<div className={styles.two_line}>
							<Input value={enterKeyword.currentData.keyword} onChange={(e) => this.handleChange(e)} />
						</div>
						<div className={styles.footer}>
							请输入拉人的关键词
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
