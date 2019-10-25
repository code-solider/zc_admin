import React, { Component } from 'react';
import { Modal, Input, Transfer } from 'antd'
import styles from './index.less'
import { connect } from 'dva';
import store from 'store';

const { Search } = Input;

@connect(({ sh, wxGroup }) => ({
	sh, wxGroup
}))
class AddGroupModal extends Component {

	state = {
		targetKeys: [],
		selectedKeys: [],
		dataSource: []
	};

	componentWillReceiveProps(nextProps) {
		const { sh: { wx_group_list, currentUpdateData } } = nextProps;
		if (this.state.a === wx_group_list) {
			return;
		} else {
			this.setState({
				a: wx_group_list
			})
		}
		let newArr = [], oldArr = [], targetKeys = [];

		if (currentUpdateData['row[group_names]'] !== undefined) {
			oldArr = [...currentUpdateData['row[group_names]'].split(','), ...wx_group_list]
		} else {
			oldArr = [...wx_group_list]
		}
		for (let i = 0; i < oldArr.length; i++) {
			if (oldArr[i] === '') {
				oldArr.splice(i, 1)
			}
		}
		for (let i = 0; i < oldArr.length; i++) {
			if (oldArr[i] !== "" && typeof oldArr[i] !== 'object') {
				targetKeys.push(i);
				newArr.push({
					key: i,
					title: oldArr[i].replace(/\s/g, ""),
					description: currentUpdateData['row[gid]'].split(',')[i]
				});
			} else {
				newArr.push({
					key: i,
					title: oldArr[i].nickName,
					description: oldArr[i].chatroomId
				});
			}
		}
		this.setState({
			dataSource: newArr,
			targetKeys: targetKeys
		})
	}

	handleChange = (nextTargetKeys, direction, moveKeys) => {
		this.setState({ targetKeys: nextTargetKeys });
		const { dispatch } = this.props;
		const { dataSource } = this.state;
		let nickNameArr = '', ids = '';
		for (let i = 0; i < nextTargetKeys.length; i++) {
			nickNameArr += dataSource[Number(nextTargetKeys[i])].title + ',';
			ids += dataSource[Number(nextTargetKeys[i])].description + ',';
		}
		dispatch({
			type: 'sh/changecurrentUpdateData',
			payload: {
				key: 'row[gid]',
				value: ids
			}
		})
		dispatch({
			type: 'sh/changecurrentUpdateData',
			payload: {
				key: 'row[group_names]',
				value: nickNameArr
			}
		})
		dispatch({
			type: 'sh/changecurrentUpdateData',
			payload: {
				key: 'row[wxid]',
				value: store.get('shUser').wx_id,
			}
		})
	};

	handleSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
		this.setState({ selectedKeys: [...sourceSelectedKeys, ...targetSelectedKeys] });
	};

	render() {
		const { targetKeys, selectedKeys, dataSource } = this.state;
		let { visible, onClose } = this.props;
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
							dataSource={dataSource}
							titles={['当前微信列表', '已选择群']}
							targetKeys={targetKeys}
							selectedKeys={selectedKeys}
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

export default AddGroupModal