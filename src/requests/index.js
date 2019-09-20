import axios from 'axios'
import store from '@/store'
import router from '@/router'
import {Alert, Message, MessageBox} from 'element-ui';

//获取session里的token
const getToken = function () {
    return window.sessionStorage.getItem('token');
};
// 创建axios实例
const service = axios.create({
    baseURL: '/api',
    timeout: 0,
});

// request拦截器
service.interceptors.request.use(config => {
    // console.log('+++',config);
    if (getToken()) { //带上token
        config.headers['Authorization'] = getToken();
    }
    return config
}, error => {
    // console.log(error);
    return Promise.reject(error)
});

// respone拦截器
service.interceptors.response.use(response => {
        // console.log(response);
        if (response.data.msg === 'token异常' || response.data.code === '511') {
            store.dispatch('logout');
        } else {
            return response.data;
        }
    },
    error => {
        // Error
        console.log('error:', error);
        if (error.response) {
            console.log('response error:', error.response);
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            // console.log('1', error.response.data);
            // console.log('1',error.response.status);
            // console.log('1',error.response.headers);

            if (error.response.data.code === '511' || error.response.status === 511) { //token失效
                console.log('后台返回511，11111')
                store.dispatch('logout')
            }

            if (error.response.status === 404) {
                // Message.error('服务器连接失败！请等候再试');
                store.dispatch('logout');
            }
            else {
                return Promise.reject(error)
            }
        } else if (error.request) {
            console.log('request error:', error.request);
            store.dispatch('logout')
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            // console.log('2', error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            // console.log('Error', error.message);
        }
    }
);

export default service
