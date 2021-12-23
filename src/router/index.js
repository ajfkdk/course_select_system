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
                    roles: ['student','admin','teacher']
                },
                component: () => import ( /* webpackChunkName: "tabs" */ "../views/Tabs.vue")
            },
            {
                path: "/dashboard",
                name: "dashboard",
                meta: {
                    title: '系统首页',
                    requireAuth: true,
                    roles: ['student','admin','teacher']
                },
                component: () => import ( /* webpackChunkName: "dashboard" */ "../views/Dashboard.vue")
            }, {
                path: "/table",
                name: "basetable",
                meta: {
                    title: '表格',
                    requireAuth: true,
                    roles: ['student','admin','teacher']
                },
                component: () => import ( /* webpackChunkName: "table" */ "../views/BaseTable.vue")
            }, {
                path: "/charts",
                name: "basecharts",
                meta: {
                    title: '图表',
                    requireAuth: true,
                    roles: ['student','admin','teacher']
                },
                component: () => import ( /* webpackChunkName: "charts" */ "../views/BaseCharts.vue")
            }, {
                path: "/form",
                name: "baseform",
                meta: {
                    title: '表单',
                    requireAuth: true,
                    roles: ['student','admin','teacher']
                },
                component: () => import ( /* webpackChunkName: "form" */ "../views/BaseForm.vue")
            },
            {
                path: "/user",
                name: "一个不知道什么东西的name",
                meta: {
                    title: '我的信息',
                    requireAuth: true,
                    roles: ['student','admin','teacher']
                },
                component: () => import ( /* webpackChunkName: "form" */ "../views/User.vue")
            },
            {
                path: "/donate",
                name: "donate",
                meta: {
                    title: '鼓励作者',
                    requireAuth: true,
                    roles: ['student','admin','teacher']
                },
                component: () => import ( /* webpackChunkName: "donate" */ "../views/Donate.vue")
            }, {
                path: "/permission",
                name: "permission",
                meta: {
                    title: '权限管理',
                    requireAuth: true,
                    roles: ['student','admin','teacher']
                },
                component: () => import ( /* webpackChunkName: "permission" */ "../views/Permission.vue")
            }, {
                path: "/i18n",
                name: "i18n",
                meta: {
                    title: '国际化语言',
                    requireAuth: true,
                    roles: ['student','admin','teacher']
                },
                component: () => import ( /* webpackChunkName: "i18n" */ "../views/I18n.vue")
            }, {
                path: "/upload",
                name: "upload",
                meta: {
                    title: '上传插件',
                    requireAuth: true,
                    roles: ['student','admin','teacher']
                },
                component: () => import ( /* webpackChunkName: "upload" */ "../views/Upload.vue")
            }, {
                path: "/icon",
                name: "icon",
                meta: {
                    title: '自定义图标',
                    requireAuth: true,
                    roles: ['student','admin','teacher']
                },
                component: () => import ( /* webpackChunkName: "icon" */ "../views/Icon.vue")
            }, {
                path: '/404',
                name: '404',
                meta: {
                    title: '找不到页面',
                    requireAuth: true,
                    roles: ['student','admin','teacher']
                },
                component: () => import (/* webpackChunkName: "404" */ '../views/404.vue')
            }, {
                path: '/403',
                name: '403',
                meta: {
                    title: '没有权限',
                    requireAuth: true,
                    roles: ['student','admin','teacher']
                },
                component: () => import (/* webpackChunkName: "403" */ '../views/403.vue')
            }, {
                path: '/user',
                name: 'user',
                meta: {
                    title: '个人中心',
                    requireAuth: true,
                    roles: ['student','admin','teacher']
                },
                component: () => import (/* webpackChunkName: "user" */ '../views/User.vue')
            }, {
                path: '/editor',
                name: 'editor',
                meta: {
                    title: '富文本编辑器',
                    requireAuth: true,
                    roles: ['student','admin','teacher']
                },
                component: () => import (/* webpackChunkName: "editor" */ '../views/Editor.vue')
            }
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
    console.log(routes);
    const role = localStorage.getItem('my_role');
    /*是否已经登录，且跳转来自登录界面*/
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