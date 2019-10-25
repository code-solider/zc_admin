import React, { Component } from 'react';
import { Row, Col, Tag, Button, Upload, Icon, message, Select, Radio, Input, DatePicker, Card } from 'antd';
import { connect } from 'dva';
import store from 'store';
import styles from './NeedEnterGroupComponent.less';
import { resolve } from 'path';
import { rejects } from 'assert';
const { Option } = Select;

@connect(({ active_info }) => ({ active_info }))
class SelectGroupComponent extends Component {

    state = {
        loading: false,
    };

    componentWillMount() {
        const { dispatch } = this.props;
        if (store.get('shUser')) {
            dispatch({
                type: 'active_info/get_wx_group_list',
                payload: {
                    wxid: store.get('shUser').wx_id,
                }
            })
        }

    }

    handleChange = (e) => {
        const { dispatch, active_info: { formField } } = this.props;
        dispatch({
            type: 'active_info/update',
            payload: {
                formField: {
                    ...formField,
                    'row[in_group_type]': e.target.value
                }
            }
        })
    }

    handleSelectChange = (e) => {
        const { dispatch, active_info: { wx_group_list } } = this.props;
        let arr = [];
        for (let i = 0; i < e.length; i++) {
            for (let j = 0; j < wx_group_list.length; j++) {
                if (wx_group_list[j].id == e[i]) {
                    arr.push(wx_group_list[j])
                }
            }
        }
        dispatch({
            type: 'active_info/update',
            payload: {
                wx_group_list_img: arr
            }
        })
    }

    handleSelectChange2 = (item, e) => {
        const { dispatch, active_info: { formField } } = this.props;
        let obj = {
            chatroomId: item.chatroomId,
            chatroomHeadPic: item.chatroomHeadPic,
            lable: e
        }
        dispatch({
            type: 'active_info/update',
            payload: {
                formField: {
                    ...formField,
                    'row[in_group_data]': [obj]
                }
            }
        })
    }

    beforeUpload = (file, fileList) => {
        const { dispatch, active_info: { formField } } = this.props;
        dispatch({
            type: 'active_info/upload',
            payload: file,
            callback: (e) => {
                let obj = {
                    "chatroomId": null,
                    "chatroomHeadPic": e,
                    "lable": "",
                    "num": 0,
                    "time": ""
                }
                let arr = [...formField['row[in_group_data]'], obj];
                dispatch({
                    type: 'active_info/update',
                    payload: {
                        formField: {
                            ...formField,
                            'row[in_group_data]': arr
                        }
                    }
                })
            }
        })
        return false;
    }

    delItem = (e) => {
        const { dispatch, active_info: { formField } } = this.props;
        let arr = [...formField['row[in_group_data]']];
        arr.splice(e, 1);
        dispatch({
            type: 'active_info/update',
            payload: {
                formField: {
                    ...formField,
                    'row[in_group_data]': arr
                }
            }
        })
    }

    handleChange1 = (e, item, key) => {
        const { dispatch, active_info: { formField } } = this.props;
        let obj = {
            ...item,
            num: e.target.value
        }
        let arr = [...formField['row[in_group_data]']];
        arr[key] = obj;
        dispatch({
            type: 'active_info/update',
            payload: {
                formField: {
                    ...formField,
                    'row[in_group_data]': arr
                }
            }
        })
    }

    handleSelectChange3 = (e, item, key) => {
        const { dispatch, active_info: { formField } } = this.props;
        let obj = {
            ...item,
            lable: e
        }
        let arr = [...formField['row[in_group_data]']];
        arr[key] = obj;
        dispatch({
            type: 'active_info/update',
            payload: {
                formField: {
                    ...formField,
                    'row[in_group_data]': arr
                }
            }
        })
    }

    timeChange = (e, item, key) => {
        const { dispatch, active_info: { formField } } = this.props;
        let obj = {
            ...item,
            time: e
        }
        let arr = [...formField['row[in_group_data]']];
        arr[key] = obj;
        dispatch({
            type: 'active_info/update',
            payload: {
                formField: {
                    ...formField,
                    'row[in_group_data]': arr
                }
            }
        })
    }

    render() {
        const { active_info: { formField, wx_group_list, wx_group_list_img } } = this.props;
        const selectChildren = [];
        for (let i = 0; i < wx_group_list.length; i++) {
            selectChildren.push(<Option key={wx_group_list[i].id}>{wx_group_list[i].nickName}</Option>);
        }
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        const { imageUrl } = this.state;
        return (
            <Row style={{ marginBottom: 40 }}>
                <Col span={2} style={{ marginRight: 20, textAlign: 'right' }}> <h3>需要进的群:</h3></Col>
                <Col span={21} style={{ marginBottom: 10 }}>
                    <Radio.Group value={formField['row[in_group_type]']} onChange={this.handleChange}>
                        <Radio style={{ marginRight: 20 }} value={0}>方式一:选择群</Radio>
                        <Radio value={1}>方式二:上传群二维码</Radio>
                    </Radio.Group>
                    {
                        formField['row[in_group_type]'] === 0 ? (
                            <SelectGroupComponent1
                                uploadButton={uploadButton}
                                imageUrl={imageUrl}
                                onChange={this.handleSelectChange}
                                selectChildren={selectChildren}
                                wx_group_list_img={wx_group_list_img}
                                label={formField['row[lable_data]']}
                                handleSelectChange2={this.handleSelectChange2}
                            />
                        ) : (
                                <SelectGroupComponent2
                                    uploadButton={uploadButton}
                                    imageUrl={imageUrl}
                                    beforeUpload={this.beforeUpload}
                                    data={formField['row[in_group_data]']}
                                    delItem={this.delItem}
                                    handleChange={this.handleChange1}
                                    label={formField['row[lable_data]']}
                                    handleSelectChange={this.handleSelectChange3}
                                    timeChange={this.timeChange}
                                />
                            )
                    }

                </Col>
            </Row>


        );
    }
}



const SelectGroupComponent1 = (props) => (
    <>
        <Row style={{ marginBottom: 20 }}>
            <Col span={1}>已选群：</Col>
            <Select
                mode="tags"
                style={{ width: 700 }}
                placeholder="点击添加群"
                // defaultValue={['a10', 'c12']}
                onChange={props.onChange}
                showArrow={true}
            >
                {props.selectChildren}
            </Select>
        </Row>
        <Row>
            <Col span={6} style={{ textAlign: 'center', display: 'flex' }}>
                {
                    props.wx_group_list_img.map((item, key) => {
                        return (
                            <div key={key} style={{ marginRight: 10 }} >
                                <img src={item.chatroomHeadPic} alt='img' /><br />
                                <div style={{ marginTop: 10 }}>
                                    所属标签:
                                    <Select style={{ width: 120, marginLeft: 15 }} onChange={(e) => props.handleSelectChange2(item, e)} >
                                        {
                                            props.label.map((item, key) => {
                                                return (<Option key={key} value={item}>{item}</Option>)
                                            })
                                        }
                                    </Select>
                                </div>
                            </div>
                        )
                    })
                }


            </Col>
        </Row>
    </>
)

const SelectGroupComponent2 = (props) => (
    <>
        <Row style={{ marginBottom: 20 }}>
            <Col span={11} style={{ color: '#bbb' }}>添加群二维码后请填写当前人数，官方限制群二维码只能进100人，有效期7天,展示次数=100减当前人数，且到达失效日期后自动删除到期二维码，请自行补码</Col>
            <Col span={2} offset={1}>
                <Upload
                    accept={'.jpg,.png,.gif,.jpeg'}
                    beforeUpload={props.beforeUpload}
                    showUploadList={false}
                >
                    <Button type='primary'>
                        <Icon type="upload" /> 点击上传
                    </Button>
                </Upload>
            </Col>
        </Row>
        <Row>
            {
                props.data && props.data.length > 0 && props.data.map((item, key) => {
                    return (
                        <Col key={key} span={6}>
                            <Card title={`群${key + 1}`} className={styles.card_item} extra={<Icon onClick={() => props.delItem(key)} type="close" />}>
                                <img className={styles.img} src={item.chatroomHeadPic} alt='img' />
                                <div className={styles.card_item_currentNum}>
                                    <div className={styles.label}>当前人数:</div>
                                    <Input className={styles.inp} type='number' onChange={(e) => props.handleChange(e, item, key)} />
                                </div>
                                <div className={styles.tags}>
                                    <div className={styles.label}>所属标签:</div>
                                    <Select className={styles.sel} onChange={(e) => props.handleSelectChange(e, item, key)}>
                                        {
                                            props.label.map((item, key) => {
                                                return (<Option key={key} value={item}>{item}</Option>)
                                            })
                                        }
                                    </Select>
                                </div>
                                <div className={styles.invalidTime}>
                                    <div className={styles.label}>失效日期:</div>
                                    <DatePicker className={styles.time} onChange={(e) => props.timeChange(e, item, key)} />
                                </div>
                            </Card>
                        </Col>
                    )
                })
            }
        </Row>
    </>
)

export default SelectGroupComponent;