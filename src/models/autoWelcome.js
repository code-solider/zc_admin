/* 
    * create by 庞洋
    * createTime: 2019年8月16日14:00:29
    * /enter/autowelcome 页面用到
*/
import { welcome_add, uploadFile, welcome_list, welcome_del } from '@/services/api';
import { message } from 'antd';
import store from 'store';

const Model = {
    namespace: 'autoWelcome',
    state: {
        currentData: {},//添加 或修改 的数据
        data_list: [],
        data_list_total: 0,
        data_list_page: 1,
        data_list_pageSize: 10,
        WenziModalInitVal: {},
        ImgTextModalInitVal: {}
    },
    effects: {
        *fetch({ payload }, { call, put }) {
            let res = yield call(welcome_list, payload);
            for (let i = 0; i < res.data.rows.length; i++) {
                res.data.rows[i].switchTime = res.data.rows[i].switchTime === 1;
                res.data.rows[i].switchNum = res.data.rows[i].switchNum === 1;
            }
            yield put({
                type: 'update',
                payload: {
                    data_list: res.data.rows,
                    data_list_total: res.data.total
                }
            })
        },
        *uploadFile({ payload, callback }, { call, put }) {
            let res;
            if (payload.file) {
                res = yield call(uploadFile, payload.file);
            } else {
                res = payload.content;
            }
            let newData = { ...payload.currentData }
            if (newData.welcomeContents === undefined) {
                newData.welcomeContents = []
                newData.welcomeContents[0] = { content: res, title: payload.title, img: payload.img, type: payload.type, weight: 0, isOpen: payload.isOpen };
            } else {
                newData.welcomeContents.push({ content: res, title: payload.title, img: payload.img, type: payload.type, weight: newData.welcomeContents.length, isOpen: payload.isOpen })
            }
            yield put({
                type: 'update',
                payload: {
                    currentData: newData
                }
            })
            callback && callback(res.content)
        },
        *addData({ payload, callback }, { call, put }) {
            yield call(welcome_add, payload);
            callback && callback()
        },
        *del({ payload, callback }, { call, put }) {
            let res = yield call(welcome_del, payload);
            callback && callback();
        },
    },
    reducers: {
        update(state, { payload, callback }) {
            if (callback) {
                callback()
            }
            return { ...state, ...payload };
        },

    },
};
export default Model;
