import {createRouter, createWebHashHistory} from "vue-router";
import Home from "../views/Home.vue";

const routes = [
    {
        path: '/',
        redirect: '/tabs'
    }, {
        path: "/",
        name: "Home",
        component: Home,
        children: [
            {
                path: "/tabs",
                name: "tabs",
                meta: {
                    title: '消息通知',
                    requireAuth: true,
                    roles: ['student', 'admin', 'teacher']
                },
                component: () => import ( /* webpackChunkName: "tabs" */ "../views/Tabs.vue")
            }, {
                path: "/table",
                name: "basetable",
                meta: {
                    title: '表格',
                    requireAuth: true,
                    roles: ['student', 'admin', 'teacher']
                },
                component: () => import ( /* webpackChunkName: "table" */ "../views/BaseTable.vue")
            }, {
                path: "/form",
                name: "baseform",
                meta: {
                    title: '表单',
                    requireAuth: true,
                    roles: ['student', 'admin', 'teacher']
                },
                component: () => import ( /* webpackChunkName: "form" */ "../views/BaseForm.vue")
            },
            {
                path: "/user",
                name: "一个不知道什么东西的name",
                meta: {
                    title: '我的信息',
                    requireAuth: true,
                    roles: ['student', 'admin']
                },
                component: () => import ( /* webpackChunkName: "form" */ "../views/User.vue")
            }, {
                path: "/teacherInfo",
                name: "teacherInfo",
                meta: {
                    title: '我的信息',
                    requireAuth: true,
                    roles: ['admin', 'teacher']
                },
                component: () => import ( /* webpackChunkName: "form" */ "../views/teacherInfo.vue")
            },{
                path: "/adminUser",
                name: "adminUser",
                meta: {
                    title: '管理用户',
                    requireAuth: true,
                    roles: ['admin']
                },
                component: () => import ( /* webpackChunkName: "form" */ "../views/adminUser.vue")
            },{
                path: "/adminN",
                name: "adminN",
                meta: {
                    title: '管理通知',
                    requireAuth: true,
                    roles: ['admin']
                },
                component: () => import ( /* webpackChunkName: "form" */ "../views/adminN.vue")
            },{
                path: "/adminSystem",
                name: "adminNotice",
                meta: {
                    title: '选导师系统管理',
                    requireAuth: true,
                    roles: ['admin']
                },
                component: () => import ( /* webpackChunkName: "form" */ "../views/adminSystem.vue")
            },{
                path: "/TeacherTable",
                name: "TeacherTable",
                meta: {
                    title: '选学生',
                    requireAuth: true,
                    roles: ['teacher']
                },
                component: () => import ( /* webpackChunkName: "form" */ "../views/TeacherTable.vue")
            },
        ]
    }, {
        path: "/login",
        name: "Login",
        meta: {
            title: '登录',
            requireAuth: false,
        },
        component: () => import ( /* webpackChunkName: "login" */ "../views/Login.vue")
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});


/*权限管理：学生权限，老师权限，管理员权限*/
router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title} | SSM架构课设`;
    const role = localStorage.getItem('my_role');
    /*是否已经登录，且跳转来自登录界面*/
    // if (!role && from.path !== '/login') {
    if (!role && to.path !== '/login') {
        next('/login');
    } else if (to.meta.requireAuth) {
        // 如果页面需要权限控制，进入下面这个代码段

        if (to.meta.roles.length !== 0) {
            for (let i = 0; i < to.meta.roles.length; i++) {
                if (role === to.meta.roles[i]) {
                    next()
                    break
                } else if (i === to.meta.roles.length - 1) {
                    next("/403")
                }
            }
        }
    } else {
        next();
    }
});

export default router;

/*

router.beforeEach((to, from, next) => {
    console.log('上一个页面：', from)
    console.log('下一个页面：', to)
    let userToken = localStorage.getItem('userToken')
    let role = localStorage.getItem('role')
    if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
        console.log('main-token：', userToken)
        if (userToken) { // 判断本地是否存在token
            if (to.meta.roles.length !== 0) {
                for (let i = 0; i < to.meta.roles.length; i++) {
                    if (role === to.meta.roles[i]) {
                        next()
                        break
                    } else if (i === to.meta.roles.length - 1) {
                        next({
                            path: '/Error'
                        })
                    }
                }
            } else {
                next()
            }
        } else {
            next({
                path: '/Login'
            })
        }
    } else {
        next()
    }
    /!* 如果本地存在token,则不允许直接跳转到登录页面 *!/
    if (to.fullPath === '/Login') {
        if (userToken) {
            next({
                path: from.fullPath
            })
        } else {
            next()
        }
    }
})
*/
/* role === 'admin'
            ? next()
            : next('/403');
        if (role ==="admin"){

        }else if (role === "teacher") {

        }else if (role === "student") {

        }
        else{
            console.log(role, "角色有误");
        }*/