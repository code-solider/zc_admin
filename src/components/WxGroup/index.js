import React, { Component } from 'react';
import { Modal, Input, Transfer, message } from 'antd'
import styles from './index.less'
import { connect } from 'dva';
import store from 'store';

const { Search } = Input;

@connect(({ sh, wxGroup }) => ({
	sh, wxGroup
}))
class WxGroup extends Component {

	handleChange = (nextTargetKeys, direction, moveKeys) => {
		if (nextTargetKeys.length <= 0) {
			message.error('至少选择一项', 1)
			return
		}
		const { dispatch, wxGroup } = this.props;
		let nickNameArr = '', ids = '';
		for (let i = 0; i < nextTargetKeys.length; i++) {
			nickNameArr += wxGroup.dataSource[Number(nextTargetKeys[i])].title + ',';
			ids += wxGroup.dataSource[Number(nextTargetKeys[i])].description + ',';
		}
		dispatch({
			type: 'wxGroup/update',
			payload: {
				dataSource: wxGroup.dataSource,
				targetKeys: nextTargetKeys,
				group_names: nickNameArr,
				gid: ids
			}
		})

	};

	handleSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
		const { dispatch } = this.props;
		dispatch({
			type: 'wxGroup/update',
			payload: {
				selectedKeys: [...sourceSelectedKeys, ...targetSelectedKeys]
			}
		})
	};

	render() {
		const { visible, onClose, wxGroup } = this.props;
		return (
			<Modal
				visible={visible}
				className={styles.modal}
				title="查找群"
				onCancel={onClose}
				//onOk={onClose}
				footer={null}
			>
				<div className={styles.wrap}>
					<Search
						placeholder="输入查找信息"
						onSearch={value => console.log(value)}
						style={{ width: 300 }}
					/>
					<div className={styles.content}>
						<Transfer
							titles={['当前微信列表', '已选择群']}
							dataSource={wxGroup.dataSource}
							targetKeys={wxGroup.targetKeys}
							selectedKeys={wxGroup.selectedKeys}
							onChange={this.handleChange}
							onSelectChange={this.handleSelectChange}
							render={item => item.title}
							style={{ display: 'flex', alignItems: 'center' }}
							listStyle={{ flex: 1 }}
						/>
					</div>
				</div>
			</Modal>
		)
	}
}

export default WxGroup