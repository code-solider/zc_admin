import React, { Component } from 'react';
import { Card, Row, Col, Checkbox, Input, Upload, Icon, Button, Switch, Tag, message } from 'antd';
import router from 'umi/router';
import store from 'store';
import { connect } from 'dva';
import RichTextComponent from './RichTextComponent';
import NeedEnterGroupComponent from './NeedEnterGroupComponent';
import AutoCreateGroupComponent from './AutoCreateGroupComponent';
import PayEnterGroupComponent from './PayEnterGroupComponent';
import CollectInfoComponent from './CollectInfoComponent';
import ZaoshiComponent from './ZaoshiComponent';
import FxgnComponent from './FxgnComponent';
import ActivityPosterComponent from './ActivityPosterComponent';
import styles from './index.less'

@connect(({ active_info, loading }) => ({
    active_info, loading: loading.models.active_info
}))
class CreateActivityPage extends Component {

    state = {
        tagVal: ''
    }

    componentWillUnmount() {
        const { dispatch } = this.props;
        dispatch({
            type: 'active_info/update',
            payload: {
                isUpdateState: false,
                formField: {
                    'ids': undefined,//编辑时传 活动id

                    'row[active_name]': '',//活动名称
                    'row[active_img]': '',//活动头图
                    'row[active_content]': '',//活动介绍

                    'row[label_on]': 0,//是否按照标签进群 0关闭 1开启
                    'row[lable_data]': [],//存储标签 json格式 [{"id":1,"lable":"英语课程"}]
                    'row[in_group_type]': 0, //进群方式0选择群1上传群二维码
                    'row[in_group_data]': [],//进群数据json 方式1 [{"chatroomId":"26...

                    'row[build_on]': 0,//是否自动建群  0关闭 1开启
                    'row[build_name]': '',//创建群名
                    'row[build_num]': '',//创建群编号
                    'row[build_members]': [],//自动拉群成员json [{"wxid":"wxid_9fotosesr32c22"},

                    'row[pay_on]': 0,//是否付费进群 0关闭 1开启
                    'row[pay_type]': 0,//进群类型 0固定价格 1按标签收费
                    'row[pay_price0]': 0,//固定价格
                    'row[pay_price1]': [],//按标签收费json [{"语文课":399},{"语文课":399}]

                    'row[collect_on]': 0,//收集入群信息开关 0 关闭 1开启
                    'row[collect_data]': [],//信息收集表单 ["姓名", "手机"]

                    'row[zaoshi_on]': 0,//造势 0关闭 1开启
                    'row[zaoshi_num]': 0,//造势数量

                    'row[fx_on]': 0, //分销 0 关闭 1开启
                    'row[fx_type]': 0,//分销类型 0按比例 1按金额
                    'row[fx_num]': '',//分销比例/金额

                    'row[bill_on]': 0,//海报开关 0关闭 1开启
                    'row[bill_url]': '',//海报地址
                },//form 字段
                wx_group_list: [],
                wx_group_list_img: [],
                wx_friends_list: [],
            }
        })
    }

    handleChange = (key, e) => {
        const { dispatch, active_info: { formField } } = this.props;
        switch (key) {
            case 'active_name':
                dispatch({
                    type: 'active_info/update',
                    payload: {
                        formField: {
                            ...formField,
                            'row[active_name]': e.target.value
                        }
                    }
                })
                break;
            case 'label_on':
                dispatch({
                    type: 'active_info/update',
                    payload: {
                        formField: {
                            ...formField,
                            'row[label_on]': Number(formField['row[label_on]']) === 0 ? 1 : 0
                        }
                    }
                })
                break;
            case 'tagVal':
                this.setState({ tagVal: e.target.value })
                break;
            case 'addTagVal':
                let oldArr = formField['row[lable_data]'];
                dispatch({
                    type: 'active_info/update',
                    payload: {
                        formField: {
                            ...formField,
                            'row[lable_data]': [...oldArr, this.state.tagVal]
                        }
                    }
                })
                this.setState({ tagVal: '' })
                break;
        }
    }

    handleSub = () => {
        const { dispatch, active_info: { formField } } = this.props;
        dispatch({
            type: 'active_info/subForm',
            payload: {
                ...formField,
                'row[wxid]': store.get('shUser').wx_id
            },
            callback: () => {
                router.push('/fission/ActivityStatistics');
            }
        })
    }

    beforeUpload = (file, fileList) => {
        const { dispatch, active_info: { formField } } = this.props;
        const isLt2M = file.size / 1024 / 1024 < 1;
        console.log(isLt2M, 123);
        message.error('图片需小于 1MB!');
        if (!isLt2M) {
            message.error('图片需小于 1MB!');
        }
        dispatch({
            type: 'active_info/upload',
            payload: file,
            callback: (e) => {
                dispatch({
                    type: 'active_info/update',
                    payload: {
                        formField: {
                            ...formField,
                            'row[active_img]': e
                        }
                    }
                })
            }
        })
        return false;
    }

    render() {
        const { formField, isUpdateState } = this.props.active_info;
        const { loading } = this.props;
        return (
            <Card title={`${isUpdateState ? '编辑' : '创建'}活动`}>
                <Row style={{ marginBottom: 20 }}>
                    <Col span={2} style={{ marginRight: 20, textAlign: 'right' }}>
                        <h3>裂变活动类型:</h3>
                    </Col>
                    <Col span={10}>
                        <Checkbox defaultChecked disabled>群活码</Checkbox>(此功能暂时不可用)
                    </Col>
                </Row>
                <Row style={{ marginBottom: 20 }}>
                    <Col span={2} style={{ marginRight: 20, textAlign: 'right' }}>
                        <h3>活动名称:</h3>
                    </Col>
                    <Col span={10}>
                        <Input onChange={(e) => this.handleChange('active_name', e)} value={formField['row[active_name]']} />
                        <div>活动名称一旦设置不可修改</div>
                    </Col>
                </Row>
                <Row style={{ marginBottom: 40 }}>
                    <Col span={2} style={{ marginRight: 20, textAlign: 'right' }}> <h3>活动头图:</h3></Col>
                    <Col span={10}>
                        <Upload
                            accept={'.jpg,.png,.gif,.jpeg'}
                            beforeUpload={this.beforeUpload}
                            showUploadList={false}
                        >
                            {formField['row[active_img]'] !== '' ? <img src={formField['row[active_img]']} alt="avatar" style={{ width: '100%' }} /> : (
                                <div className={styles.uploadWrap}>
                                    <Icon type={loading ? 'loading' : 'plus'} />
                                    <div className="ant-upload-text">Upload</div>
                                </div>
                            )}
                        </Upload>
                        <div>建议尺寸：900*500，大小不超过300KB</div>
                    </Col>
                </Row>
                <Row style={{ marginBottom: 40 }}>
                    <Col span={2} style={{ marginRight: 20, textAlign: 'right' }}> <h3>活动介绍:</h3></Col>
                    <Col span={21}>
                        <RichTextComponent />
                    </Col>
                </Row>
                <Row style={{ marginBottom: 40 }}>
                    <Col span={2} style={{ marginRight: 20, textAlign: 'right' }}> <h3>是否按标签进群:</h3></Col>
                    <Col span={21}>
                        <Switch style={{ marginBottom: 10 }} onChange={() => this.handleChange('label_on')} checked={Number(formField['row[label_on]']) === 1} />
                        {
                            Number(formField['row[label_on]']) === 1 && (
                                <Row>
                                    <Col span={4}>
                                        <Input value={this.state.tagVal} onChange={(e) => this.handleChange('tagVal', e)} />
                                        <div>标签数最少2个或以上</div>
                                    </Col>
                                    <Col span={2} offset={1}><Button type='primary' onClick={(e) => this.handleChange('addTagVal')}>添加</Button></Col>
                                    <Col span={24} style={{ marginTop: 10 }}>
                                        {
                                            formField['row[lable_data]'].map((item, key) => (<Tag key={key} closable>{item}</Tag>))
                                        }
                                    </Col>
                                </Row>
                            )
                        }
                    </Col>
                </Row>

                {/* 需要进的群 */}
                <NeedEnterGroupComponent />

                {/* 是否自动建群 */}
                <AutoCreateGroupComponent />

                {/* 是否付费进群 */}
                <PayEnterGroupComponent />

                {/* 收集入群信息 */}
                <CollectInfoComponent />

                {/* 造势 组件 */}
                < ZaoshiComponent />

                {/* 分销功能 组件 */}
                <FxgnComponent />

                {/* 活动海报 组件 */}
                <ActivityPosterComponent />

                <Row style={{ textAlign: 'center' }}>
                    <Button type='primary' onClick={this.handleSub}>保存</Button>
                </Row>
            </Card >
        );
    }
}


export default CreateActivityPage;