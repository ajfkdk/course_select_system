import request from '../utils/request';

export const fetchData = query => {
    return request({
        url: './teacher',
        method: 'get',
        params: query
    });
};

export const toLogin = query => {
    return request({
        url: './login',
        method: 'POST',
        params: query
    });
}

export const fetchNotice = query => {
    return request({
        url: './notice/'+query,
        method: 'get',
    });
}

export const fetchUserData = (query, role) => {
    return request({
        url: './' + role + '/' + query,
        method: 'get'
    });
}
export const sendChooseTeacherData = (query) => {
    return request({
        url: '/select',
        method: 'POST',
        params: query
    });
}
