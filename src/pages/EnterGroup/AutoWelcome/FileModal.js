import { Modal, Icon, Row, Col, Upload, Button, message, Spin } from 'antd';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';

// function getBase64(img, callback) {
// 	const reader = new FileReader();
// 	reader.addEventListener('load', () => callback(reader.result));
// 	//reader.readAsDataURL(img);
// }

@connect(({ autoWelcome, loading }) => ({
	autoWelcome,
	loading: loading.models.autoWelcome
}))
class FileModal extends Component {

	// handleChange = (info) => {
	// 	if (info.file.status === 'uploading') {
	// 		this.setState({ loading: true });
	// 		return;
	// 	}
	// 	if (info.file.status === 'done') {
	// 		// Get this url from response in real world.
	// 		getBase64(info.file.originFileObj, imageUrl => this.setState({
	// 			imageUrl,
	// 			loading: false,
	// 		}));
	// 	}
	// }

	beforeUpload = (file) => {
		const { dispatch, autoWelcome: { currentData } } = this.props;
		const isLt2M = file.size / 1024 / 1024 < 2;
		if (!isLt2M) {
			message.error('必须小于 2MB!');
			return;
		}
		dispatch({
			type: 'autoWelcome/uploadFile',
			payload: {
				file,
				currentData,
				type: 2
			}
		})
		return false; // 不调用默认的上传方法
	}
	handleClose = () => {
		const { onClose } = this.props;
		onClose(2)
	}

	render() {
		const { visiable, onClose, loading } = this.props;
		return (

			<Modal
				title="上传文件"
				visible={visiable}
				// onOk={this.handleOk}
				onCancel={this.handleClose}
				footer={null}
			>
				<Row>
					<Col span={4} style={{ textAlign: 'right' }}>文件内容:</Col>
					<Col span={18} offset={1}>
						<Upload
							showUploadList={false}
							onChange={this.handleChange}
							beforeUpload={this.beforeUpload}
						>
							<Spin tip="上传中..." spinning={loading}>
								<Button>
									<Icon type="upload" /> 点击上传
            					</Button>
							</Spin>
						</Upload>
					</Col>
				</Row>
			</Modal>
		)
	}
}

FileModal.defaultProps = {
	visiable: false
}

FileModal.propTypes = {
	visiable: PropTypes.bool,
	onClose: PropTypes.func
}

export default FileModal;
