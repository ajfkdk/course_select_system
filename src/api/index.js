import request from '../utils/request';

export const fetchData = query => {
    return request({
        url: './table.json',
        method: 'get',
        params: query
    });
};

export const toLogin = query =>{
    return request({
        url: './student',
        method: 'get',
        params: query
    });
}

export const fetchUserData = query =>{
    return request({
        url: './student/'+query,
        method: 'get'
    });
}
