import request from '../utils/request';

//获取老师数据
export const fetchData = query => {
    return request({
        url: './teacher',
        method: 'get',
        params: query
    });
};

//登录请求
export const toLogin = query => {
    return request({
        url: './login',
        method: 'POST',
        params: query
    });
}

//获取通知
export const fetchNotice = query => {
    return request({
        url: './notice/'+query,
        method: 'get',
    });
}

//获取用户信息
export const fetchUserData = (query, role) => {
    return request({
        url: './' + role + '/' + query,
        method: 'get'
    });
}

//发送确定导师的数据
export const sendChooseTeacherData = (query) => {
    return request({
        url: '/select',
        method: 'POST',
        params: query
    });
}

//管理员获取全部用户信息
export const getAllUserInfo=()=>{
    return request({
        url: '/student/all',
        method: 'get'
    });
}




