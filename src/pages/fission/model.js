/* 
    * create by 庞洋
    * createTime: 2019年8月31日10:15:49
    * /createActive 页面用到的 
    * lastUpdateTime:2019年8月31日10:15:49 BY 庞洋
*/
import { message } from 'antd';
import { get_member_list, wx_group_list, uploadFile, wx_list_friends, fission_add } from '@/services/api';
import router from 'umi/router';
import store from 'store';
import { parse } from 'querystring';

const Model = {
    namespace: 'active_info',
    state: {
        isUpdateState: false,//是否是更新状态
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
    },
    effects: {
        *fetch({ payload }, { call, put }) {
            let res = yield call(get_member_list, payload);
            if (res.code) {
                yield put({
                    type: 'update',
                    payload: {
                        data_list: res.data.rows,
                        data_list_total: res.data.total,
                        sqList: res.data.rows,
                    }
                });
            } else {
                message.error(res.msg, 1)
            }
        },
        *get_wx_group_list({ payload }, { call, put }) {
            let res = yield call(wx_group_list, payload);
            if (res.code) {
                yield put({
                    type: 'update',
                    payload: {
                        wx_group_list: res.data,
                    }
                });
            } else {
                message.error(res.msg, 1)
            }
        },
        *upload({ payload, callback }, { call }) {
            let res = yield call(uploadFile, payload);
            callback(res);
        },
        *handleGetWxFriends({ payload, callback }, { call, put }) {
            let res = yield call(wx_list_friends, payload);
            yield put({
                type: 'update',
                payload: {
                    wx_friends_list: res.data
                }
            })
        },
        *subForm({ payload, callback }, { call, put }) {
            payload['row[active_content]'] = payload['row[active_content]'].toString();
            payload['row[lable_data]'] = JSON.stringify(payload['row[lable_data]']).replace(/\"/g, "'") + '';
            payload['row[in_group_data]'] = JSON.stringify(payload['row[in_group_data]']).replace(/\"/g, "'") + '';
            payload['row[build_members]'] = JSON.stringify(payload['row[build_members]']).replace(/\"/g, "'") + '';
            payload['row[pay_price1]'] = JSON.stringify(payload['row[pay_price1]']).replace(/\"/g, "'") + '';
            payload['row[collect_data]'] = JSON.stringify(payload['row[collect_data]']).replace(/\"/g, "'") + '';
            let res = yield call(fission_add, payload);
            if (res.code) {
                message.success(res.msg, 1.5)
                callback && callback()
            } else {
                message.error(res.msg, 1.5)
            }
        },

    },
    reducers: {
        update(state, { payload }) {
            return { ...state, ...payload }
        },

    },
};
export default Model;