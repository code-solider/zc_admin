export default [
    // 用户登录
    {
        path: '/user',
        component: '../layouts/UserLayout',
        routes: [
            {
                path: '/user',
                component: './User'
            }
        ]
    },

    // 总授权后台
    {
        path: '/allempower',
        component: '../layouts/BasicLayout',
        routes: [
            {
                path: '/allempower',
                name: '总授权管理',
                icon: 'team',
                component: './AllEmpower'
            }
        ]
    },

    // 代理授权后台
    {
        path: '/agent',
        component: '../layouts/BasicLayout',
        routes: [
            {
                path: '/agent',
                name: '代理授权后台',
                icon: 'team',
                component: './Agent'
            }
        ]
    },

    //app
    {
        path: '/',
        component: '../layouts/BasicLayout',
        Routes: ['src/pages/Authorized'],
        routes: [
            { path: '/', redirect: '/enter/invite' },

            /* 进群助手 start */
            {
                path: '/enter',
                name: '进群助手',
                icon: 'team',
                routes: [
                    {
                        path: '/enter/invite',
                        name: '邀约进群得大奖',
                        icon: 'usergroup-add',
                        component: './EnterGroup/Invite'
                    },
                    {
                        path: "/enter/Keyword",
                        name: "关键词拉群",
                        icon: 'gold',
                        component: './EnterGroup/Keyword'
                    },
                    {
                        path: "/enter/pay",
                        name: "付费进群",
                        icon: 'property-safety',
                        component: './EnterGroup/Pay'
                    },
                    {
                        path: "/enter/autowelcome",
                        name: "进群自动欢迎",
                        icon: 'sound',
                        component: './EnterGroup/AutoWelcome'
                    },
                    {
                        path: "/enter/marketing",
                        name: "营销合集",
                        icon: 'team',
                        hideInMenu: true,
                        component: './EnterGroup/Invite'
                    },
                ]
            },
            /* 进群助手 end */

            /* 创群宝裂变 start */
            {
                path: '/fission',
                name: '创群宝裂变',
                icon: 'fullscreen',
                routes: [
                    {
                        path: '/fission/ActivityStatistics',
                        name: '活动统计',
                        icon: 'container',
                        component: './fission/ActivityStatistics'
                    },
                    {
                        path: '/fission/CustomerInfo',
                        name: '客户信息',
                        icon: 'profile',
                        component: './fission/CustomerInfo'
                    },
                    {
                        path: '/fission/CreateActivity',
                        name: '创建活动',
                        icon: 'retweet',
                        component: './fission/CreateActivity'
                    }
                ]
            },
            /* 创群宝裂变 end */

            /* 系统设置 start */
            {
                path: '/sysSetting',
                name: '系统设置',
                icon: 'setting',
                routes: [
                    {
                        path: '/sysSetting/EmpowerGZPT',
                        name: '公众平台授权',
                        icon: 'paper-clip',
                        // component: './sysSetting/EmpowerGZPT',
                        routes: [
                            {
                                path: '/sysSetting/EmpowerGZPT',
                                name: '公众平台授权',
                                hideInMenu: true,
                                component: './sysSetting/EmpowerGZPT'
                            },
                            {
                                path: '/sysSetting/EmpowerGZPT/addWarrant',
                                name: '新增授权',
                                hideInMenu: true,
                                component: './sysSetting/EmpowerGZPT/addWarrant'
                            }
                        ]
                    },
                    {
                        path: '/sysSetting/EmpowerWechatPay',
                        name: '微信支付授权',
                        icon: 'hourglass',
                        component: './sysSetting/EmpowerWechatPay'
                    },

                    {
                        path: '/sysSetting/PreventClose',
                        name: '域名防封',
                        icon: 'alert',
                        component: './sysSetting/PreventClose'
                    },
                ]
            },
            /* 系统设置 end */

            {
                path: '/authorize',
                name: '授权管理',
                icon: 'robot',
                component: './Empower'
            },
            {
                component: './404',
            },
        ],
    },
]
