import { Modal, Input, Switch, Icon, Row, Col } from 'antd';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';

@connect(({ autoWelcome, loading }) => ({
	autoWelcome,
	loading: loading.models.autoWelcome
}))
class WenziModal extends Component {

	constructor(props) {
		super(props);
		this.state = {
			isOpen: false,
			content: '',
			weight: null,
			type: null
		}
	}

	componentWillReceiveProps(nextProps) {
		const { autoWelcome } = nextProps;
		this.setState({
			...autoWelcome.WenziModalInitVal
		})
	}


	handleChange = (key, value) => {
		switch (key) {
			case 'content':
				this.setState({
					content: value
				})
				break;
			case 'isOpen':
				this.setState({
					isOpen: value
				})
				break;
		}
	}

	handleOk = () => {
		const { onClose, dispatch, autoWelcome: { currentData } } = this.props;
		if ((this.state.weight || this.state.type) !== null) {//修改
			let newArr = [...currentData.welcomeContents];
			for (let index in newArr) {
				if (newArr[index].weight === this.state.weight) {
					newArr[index] = this.state;
				}
			}
			dispatch({

				type: 'autoWelcome/update',
				payload: {
					currentData: { ...currentData, welcomeContents: newArr },
				},
				callback: () => {
					this.setState({
						isOpen: false,
						content: '',
						weight: null,
						type: null
					})
					onClose(1)
				}
			})
		} else {//新增
			dispatch({
				type: 'autoWelcome/uploadFile',
				payload: {
					isOpen: this.state.isOpen,
					content: this.state.content,
					type: 1,
					title: '',
					img: '',
					currentData
				},
				callback: () => {
					this.setState({ isOpen: false, content: '', weight: null, type: null })
					onClose(1)
				}
			})
		}

	}

	render() {
		const { visiable, onClose } = this.props;
		const { isOpen, content } = this.state;
		return (

			<Modal
				title="添加文字"
				visible={visiable}
				onOk={this.handleOk}
				onCancel={() => onClose(1)}
			>
				<Row>
					<Col span={3} style={{ textAlign: 'right' }}>@新人:</Col>
					<Col span={18} offset={1}><Switch checked={isOpen} onChange={(e) => this.handleChange('isOpen', e)} /></Col>
				</Row>
				<Row style={{ marginTop: '20px' }}>
					<Col span={3} style={{ textAlign: 'right' }}>文字:</Col>
					<Col span={18} offset={1}>
						<Input.TextArea placeholder='@新人' value={content} onChange={(e) => this.handleChange('content', e.target.value)} />
					</Col>
					{/* <Col>
						<Icon type="smile" style={{ fontSize: '26px', color: '#08c', marginLeft: '10px' }} />
					</Col> */}
				</Row>
			</Modal >
		)
	}
}

WenziModal.defaultProps = {
	visiable: false
}

WenziModal.propTypes = {
	visiable: PropTypes.bool,
	onClose: PropTypes.func
}

export default WenziModal;
