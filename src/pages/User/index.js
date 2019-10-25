import React, { Component } from 'react';
import { Tabs, Card } from 'antd';
import styles from './index.less';
import WrappedNormalLoginForm from './Login';
import RegisterCom from './Register';
const { TabPane } = Tabs;

class LoginRegPage extends Component {
	render() {
		return (
			<Card className={styles.wrap}>
				<Tabs defaultActiveKey="1">
					<TabPane tab="登录" key="1">
						<WrappedNormalLoginForm />
					</TabPane>
					{/* <TabPane tab="注册" key="2">
						<RegisterCom />
					</TabPane> */}
				</Tabs>
			</Card>
		)
	}
}

export default LoginRegPage
