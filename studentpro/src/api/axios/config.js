/*
    封装axios中的配置信息
*/

import axios from "axios";
// 基础请求路径
// 后端的cors解决跨域的时候，需要添加请求头
axios.defaults.baseURL = 'http://localhost:3333'

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 判断是否有localstroage
    let token = localStorage.getItem('token');
    if (token) {
        // Authorization 大多数人约定俗成的名称
        // Bearer 大多数人约定俗成的名称【后面必须添加空格】
        config.headers.Authorization = 'Bearer ' + token;
    }
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    // let {data} = response;
    return response.data;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

// 导出
export default axios