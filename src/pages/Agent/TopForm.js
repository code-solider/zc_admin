import React, { Component } from 'react';
import { Card, Row, Col } from 'antd';
import { connect } from 'dva';

@connect(({ agent }) => ({
	agent
}))
class TopFrom extends Component {

	render() {
		const { auth_num, use_num } = this.props.agent;
		return (
			<Card>
				<Row>
					<Col span={7}>
						总授权设备数{auth_num}，已用{use_num}，剩余{auth_num - use_num}
					</Col>
				</Row>
			</Card>
		)
	}
}

export default TopFrom
