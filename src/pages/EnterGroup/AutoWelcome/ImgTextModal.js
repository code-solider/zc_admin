import { Modal, Icon, Row, Col, Upload, Input, message, Spin } from 'antd';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';

function getBase64(file) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = error => reject(error);
	});
}

@connect(({ autoWelcome, loading }) => ({
	autoWelcome,
	loading: loading.models.autoWelcome
}))
class ImgTextModal extends Component {

	constructor(props) {
		super(props);
		this.state = {
			previewVisible: false,
			previewImage: '',
			title: '',
			linkUrl: '',
			imageUrl: '',
			loading: false,
			fileList: []
		}
	}


	handleChange = ({ fileList }) => this.setState({ fileList });

	handleCancel = () => this.setState({ previewVisible: false });

	handlePreview = async file => {
		if (!file.url && !file.preview) {
			file.preview = await getBase64(file.originFileObj);
		}

		this.setState({
			previewImage: file.url || file.preview,
			previewVisible: true,
		});
	};


	beforeUpload = (file) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => {
			this.setState({
				imageUrl: reader.result
			})
		}

		this.setState({
			fileList: [file],
		});
		return false; // 不调用默认的上传方法
	}

	handleInputChange = (name, value) => {
		switch (name) {
			case 'title':
				this.setState({
					title: value
				});
				break;
			case 'linkUrl':
				this.setState({
					linkUrl: value
				});
				break;
		}
	}

	handleSubmit = () => {
		const { dispatch, autoWelcome: { currentData } } = this.props;
		dispatch({
			type: 'autoWelcome/uploadFile',
			payload: {
				file: this.state.fileList[0],
				title: this.state.title,
				img: this.state.linkUrl,
				type: 4,
				currentData
			},
			callback: () => {
				this.handleClose();
			}
		})
	}

	handleClose = () => {
		const { onClose } = this.props;
		this.setState({
			previewVisible: false,
			previewImage: '',
			title: '',
			linkUrl: '',
			imageUrl: '',
			loading: false,
			fileList: []
		})
		onClose(3);
	}

	handleRemove = (e) => {
		this.setState({
			imageUrl: ''
		})
	}

	render() {
		let { visiable, loading } = this.props;
		const uploadButton = (
			<div>
				<Icon type={this.state.loading ? 'loading' : 'plus'} />
				<div className="ant-upload-text">Upload</div>
			</div>
		);
		const { imageUrl, fileList, title, linkUrl, previewVisible, previewImage } = this.state;
		return (
			<Spin tip="上传中..." spinning={loading}>
				<Modal
					title="新增图文"
					visible={visiable}
					onOk={this.handleSubmit}
					onCancel={this.handleClose}
				>
					<Row>
						<Col span={6} style={{ textAlign: 'right' }}>选择链接封面图:</Col>
						<Col span={16} offset={1}>
							<Upload
								name="avatar"
								onPreview={this.handlePreview}
								accept={'.jpg,.png,.gif,.jpeg'}
								listType="picture-card"
								beforeUpload={this.beforeUpload}
								onRemove={this.handleRemove}
							>
								{imageUrl ? null : uploadButton}
							</Upload>
						</Col>
					</Row>
					<Row style={{ marginTop: '20px' }}>
						<Col span={6} style={{ textAlign: 'right' }}>标题:</Col>
						<Col span={16} offset={1}>
							<Input value={title} onChange={(e) => this.handleInputChange('title', e.target.value)} />
						</Col>
					</Row>
					<Row style={{ marginTop: '20px' }}>
						<Col span={6} style={{ textAlign: 'right' }}>链接:</Col>
						<Col span={16} offset={1}>
							<Input value={linkUrl} onChange={(e) => this.handleInputChange('linkUrl', e.target.value)} />
						</Col>
					</Row>
				</Modal>
				<Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
					<img alt="example" style={{ width: '100%' }} src={previewImage} />
				</Modal>
			</Spin >
		)
	}
}

ImgTextModal.defaultProps = {
	visiable: false
}

ImgTextModal.propTypes = {
	visiable: PropTypes.bool,
	onClose: PropTypes.func
}

export default ImgTextModal;
