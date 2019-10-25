import React, { Component } from 'react';
import { Card, Row, Col, Button } from 'antd';
import PropTypes from 'prop-types'
import { connect } from 'dva';

@connect(({ sh }) => ({
	sh
}))
class TopFrom extends Component {
	handleOpenModal = () => {
		const { dispatch } = this.props;
		dispatch({
			type: 'sh/update',
			payload: {
				currentData: {},
				showModal: true
			}
		})
	}
	render() {
		const { auth_num, use_num } = this.props.sh;
		return (
			<Card>
				<Row>
					<Col span={5}>
						当前已授权{auth_num}台,还可授权{auth_num - use_num}台
          </Col>

					<Col span={3}>
						<Button type="primary" onClick={this.handleOpenModal}>添加授权</Button>
					</Col>
				</Row>
			</Card>
		)
	}
}

export default TopFrom
