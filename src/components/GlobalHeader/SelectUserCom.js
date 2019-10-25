import React, { Component } from 'react';
import { Button, Menu, Dropdown, Icon, message, Select } from 'antd';
import { connect } from 'dva';
import store from 'store';

const { Option } = Select;

@connect(({ sh }) => ({
    sh
}))
class SelectUserCom extends Component {

    //初次加载页面会发送一个网络请求拿到数据
    componentWillMount() {
        const { dispatch } = this.props;
        dispatch({
            type: 'sh/fetch'
        })
        if (store.get('shUser')) {
            dispatch({
                type: 'sh/update',
                payload: {
                    shUser: store.get('shUser')
                }
            })
        }
    }

    //把当前选择的用户存到store里
    handleChange = (e) => {
        const { dispatch, sh: { sqList } } = this.props;
        for (let item in sqList) {
            if (sqList[item].name === e) {
                store.set('shUser', sqList[item]);
                if (sqList[item].wx_id === '') {
                    message.error('选择的用户未激活(未绑定微信id),不能选择', 2)
                    return;
                }
                dispatch({
                    type: 'sh/update',
                    payload: {
                        shUser: sqList[item]
                    }
                })
                break
            }
        }

    }

    render() {
        const { sh: { sqList } } = this.props;
        return (

            <Select defaultValue={store.get('shUser') && (store.get('shUser').name + '-' + store.get('shUser').wx_name) || '请选择'} style={{ width: 200 }} onChange={this.handleChange}>
                {
                    sqList.map((item, key) => {
                        return (
                            <Option value={item.name} disabled={item.wx_id === ''} key={key}>{`${item.name}-${item.wx_name || '未绑定微信'}`}</Option>
                        )
                    })
                }
            </Select>

        )
    }
}



export default SelectUserCom
