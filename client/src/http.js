import axios from 'axios'
import {
    Message,
    Loading
} from 'element-ui';

let loading;

function startLodading() {
    loading = Loading.service({
        lock: true,
        text: "拼命加载中...",
        background: 'rgba(0,0,0,0,7)'
    });
}

function endLoading() {
    loading.close();
}

// 请求拦截
axios.interceptors.request.use(config => {
    // if(config.method === 'post') {
    // config.headers['Content-Type'] = 'application/json; charset=UTF-8';
    // config.transformRequest = [function (data, headers) {
    //     // return qs.stringify(data);
    //     console.log(data)
    // }];
    // }
    // 加载动画
    startLodading();
    return config;
}, error => {
    return Promise.reject(error)
})
// 响应拦截
axios.interceptors.response.use(response => {
    // 结束加载动画
    endLoading();
    return response;
}, error => {
    // 错误提醒
    endLoading();
    Message.error(error.response.data);
    return Promise.reject(error);
})
export default axios;