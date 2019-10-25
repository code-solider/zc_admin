import { Avatar, Icon, Menu, Spin } from 'antd';
import { FormattedMessage } from 'umi-plugin-react/locale';
import React from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import styles from './index.less';
import store from 'store';

class AvatarDropdown extends React.Component {

	handleLogout = () => {
		const { dispatch } = this.props;
		if (dispatch) {
			dispatch({
				type: 'user/logout',
			});
		}
		router.push(`/user`);
	}

	render() {

		return (
			<span style={{ marginRight: '40px', float: 'right' }} className={`${styles.action} ${styles.account}`} >
				<span className={styles.name}>用户名:{store.get('username')}</span>
				<Avatar size="small" style={{ marginLeft: '20px' }} className={styles.avatar} icon="logout" alt="avatar" onClick={this.handleLogout} />
				<span className={styles.name} onClick={this.handleLogout}>退出登录</span>
			</span>
		);
	}
}

export default connect(({ user }) => ({
	user
}))(AvatarDropdown);
