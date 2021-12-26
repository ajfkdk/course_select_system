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

//删除用户
export const deleteUser=(query,role)=>{
    return request({
        url: '/'+role+'?'+role+"Name="+query,
        method: 'delete',
    });
}

//更新用户信息
export const updateUser=(query,role)=>{
    return request({
        url: '/'+role+'/',
        method: 'patch',
        params : query
    });
}


//管理员获取全部通知信息
export const getAllNoticeInfo=()=>{
    return request({
        url: '/notice',
        method: 'get'
    });
}

//添加一个通知功能
export const addNotice=(content,jsonName)=>{
    return request({
        url: '/notice',
        method: 'POST',
        params: {
            content:content,
            nameJson:jsonName
        }
    });
}

//删除通知
export const deleteNoticeById=(id,name)=>{
    return request({
        url: '/notice',
        method: 'delete',
        params:{
            id,
            name
        }
    });
}

//获取系统参数
export const getSystemConfig=(id,name)=>{
    return request({
        url: '/system',
        method: 'get',
    });
}
//初始化系统
export const initialSystem=(form)=>{
    return request({
        url: '/system',
        method: 'post',
        params:form
    });
}
//初始化系统
export const getWhen=()=>{
    return request({
        url: '/system/when',
        method: 'get',
    });
}
//提前截止时间段
export const deadLine=(timeQuantum)=>{
    return request({
        url: '/system',
        method: 'patch',
        params:{
            timeQuantum
        }
    });
}
//获取全部的学生
export const getAllStateStudent=(teacherName)=>{
    return request({
        url: '/select/student',
        method: 'patch',
        params:{
            teacherName
        }
    });
}







