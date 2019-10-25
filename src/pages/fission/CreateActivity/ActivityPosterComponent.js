import React, { Component } from 'react';
import { Row, Col, Switch, Radio, Button, Input, Upload, message, Icon } from 'antd';
import { relative } from 'path';
import { connect } from 'dva';
import styles from './ActivityPosterComponent.less';

@connect(({ active_info, loading }) => ({ active_info, loading: loading.models.active_info }))
class ActivityPosterComponent extends Component {

    handleChange = (key, e) => {
        const { dispatch, active_info: { formField } } = this.props;
        switch (key) {
            case 'bill_on':
                dispatch({
                    type: 'active_info/update',
                    payload: {
                        formField: {
                            ...formField,
                            'row[bill_on]': Number(formField['row[bill_on]']) === 0 ? 1 : 0
                        }
                    }
                })
                break;
        }
    }

    beforeUpload = (file, fileList) => {
        const { dispatch, active_info: { formField } } = this.props;
        dispatch({
            type: 'active_info/upload',
            payload: file,
            callback: (e) => {
                dispatch({
                    type: 'active_info/update',
                    payload: {
                        formField: {
                            ...formField,
                            'row[bill_url]': e
                        }
                    }
                })
            }
        })
        return false;
    }

    render() {
        const { active_info: { formField }, loading } = this.props;
        return (
            <Row style={{ marginBottom: 40 }}>
                <Col span={2} style={{ marginRight: 20, textAlign: 'right' }}> <h3>活码海报:</h3></Col>
                <Col span={11}>
                    <Switch style={{ marginBottom: 10 }} onChange={() => this.handleChange('bill_on')} checked={Number(formField['row[bill_on]']) === 1} />
                    {
                        Number(formField['row[bill_on]']) === 1 ? (
                            <>
                                <Row style={{ marginTop: 10, marginBottom: 20 }}>
                                    <Col span={3}>选择海报：</Col>
                                    <Col>
                                        <Upload
                                            accept={'.jpg,.png,.gif,.jpeg'}
                                            beforeUpload={this.beforeUpload}
                                            showUploadList={false}
                                        >
                                            {formField['row[bill_url]'] !== '' ? <img className={styles.bgImgSmall} src={formField['row[bill_url]']} alt="avatar" /> : (
                                                <div className={styles.uploadWrap}>
                                                    <Icon type={loading ? 'loading' : 'plus'} />
                                                    <div className="ant-upload-text">Upload</div>
                                                </div>
                                            )}
                                        </Upload>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={4}><Button type='primary'>微信头像</Button></Col>
                                    <Col span={4}><Button type='primary'>活码</Button></Col>
                                </Row>

                            </>
                        ) : null
                    }

                </Col>
                {
                    Number(formField['row[bill_on]']) === 1 ? (
                        <Col span={5} offset={2}>
                            <Drag />
                        </Col>
                    ) : null
                }

            </Row>
        );
    }
}

export default ActivityPosterComponent;

/* drag 拖拽 组件 start */
@connect(({ active_info, loading }) => ({ active_info, loading: loading.models.active_info }))
class Drag extends Component {
    constructor(props) {
        super(props);
        this.state = {
            /*定义两个值用来存放当前元素的left和top值*/
            needX: 0,
            needY: 0
        }
        /*定义两个值用来存放鼠标按下的地方距离元素上侧和左侧边界的值*/
        this.disX = 0;
        this.disY = 0;
    }
    /*定义鼠标下落事件*/
    fnDown(e) {
        /*事件兼容*/
        e = e || window.event;
        /*事件源对象兼容*/
        let target = e.target || e.srcElement;
        /*获取鼠标按下的地方距离元素左侧和上侧的距离*/
        this.disX = event.clientX - target.offsetLeft;
        this.disY = event.clientY - target.offsetTop;
        /*定义鼠标移动事件*/
        document.onmousemove = this.fnMove.bind(this);
        /*定义鼠标抬起事件*/
        document.onmouseup = this.fnUp.bind(this);
        return false;
    }
    /*定义鼠标移动事件*/
    fnMove(e) {
        /*事件兼容*/
        let event = e || window.event;
        /*事件源对象兼容*/
        let target = event.target || event.srcElement;
        let l = event.clientX - this.disX, t = event.clientY - this.disY;
        if (l < 0) { l = 0 } else if (l > 220 - target.offsetWidth) { l = 220 - target.offsetWidth };
        if (t < 0) { t = 0 } else if (t > 340 - target.offsetHeight) { t = 340 - target.offsetHeight };
        this.setState({
            needX: l + 'px',
            needY: t + 'px'
        });
    }
    fnUp() {
        document.onmousemove = null;
        document.onmuseup = null;
    }
    render() {
        const { active_info: { formField } } = this.props;
        return (
            <div style={{ position: 'relative' }}>
                <img src={formField['row[bill_url]'] == '' ? require('@/assets/img/bg.jpg') : formField['row[bill_url]']} className={styles.bjImg} />
                <div
                    style={{
                        width: 60,
                        height: 60,
                        backgroundColor: 'green',
                        position: 'absolute',
                        left: this.state.needX,
                        top: this.state.needY
                    }}
                    onMouseDown={this.fnDown.bind(this)}
                >

                </div>
            </div>

        )
    }
}

/* drag 拖拽 组件 end */