import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { connect } from 'dva';

@connect(({ user }) => ({
	user
}))
class NormalLoginForm extends Component {

	handleSubmit = e => {
		let { dispatch } = this.props;
		e.preventDefault();
		// eslint-disable-next-line no-tabs
		this.props.form.validateFields((err, values) => {
			if (!err) {
				dispatch({
					type: 'user/login',
					payload: values
				})
			}
		});
	};

	// componentWillMount() {
	// 	const { dispatch } = this.props;
	// 	dispatch({
	// 		type: 'user/login',
	// 		payload: {
	// 			username: 'test3',
	// 			password: '111111'
	// 		}
	// 	})
	// }

	render() {
		const { getFieldDecorator } = this.props.form;
		return (
			<div style={{ width: '80%', margin: '0 auto' }}>
				<Form onSubmit={this.handleSubmit} className="login-form">
					<Form.Item>
						{getFieldDecorator('username', {
							rules: [{ required: true, message: '输入用户名!' }],
						})(
							<Input
								prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
								placeholder="账号"
							/>,
						)}
					</Form.Item>
					<Form.Item>
						{getFieldDecorator('password', {
							rules: [{ required: true, message: '输入密码!' }],
						})(
							<Input
								prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
								type="password"
								placeholder="密码"
							/>,
						)}
					</Form.Item>
					<Form.Item>
						{getFieldDecorator('remember', {
							valuePropName: 'checked',
							initialValue: true,
						})(<Checkbox>记住我</Checkbox>)}

					</Form.Item>
					<Button type="primary" htmlType="submit" className="login-form-button">
						登录
					</Button>
				</Form>
			</div>
		)
	}
}
const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);
export default WrappedNormalLoginForm
