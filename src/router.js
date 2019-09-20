import Vue from 'vue'
import Router from 'vue-router'
import store from './store'

Vue.use(Router);

const router = new Router({
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/login',
            name: 'login',
            component: () => {
                return import('@/views/Login')
            }
        },
        {
            path: '/',
            name: '',
            component: () => {
                return import('@/views/Layout')
            },
            children: [
                {
                    path: '/index',
                    name: '首页',
                    component: () => {
                        return import('@/views/homePage/HomePage')
                    }
                },
                {
                    path: '/profileSettings',
                    name: '个人资料',
                    component: () => {
                        return import('@/views/profile/ProfileSettings')
                    }
                },
                {
                    path: '/siteManage',
                    name: '站点列表',
                    component: () => {
                        return import('@/views/siteManage/SiteManage')
                    },
                },
                {
                    path: '/siteManage1',
                    name: '站点列表1',
                    component: () => {
                        return import('@/views/siteManage/SiteManage1')
                    },
                },
                {
                    path: '/siteManage/domainBinding/siteId=:siteId',
                    name: '域名绑定',
                    component: () => {
                        return import('@/views/siteManage/DomainBinding.vue')
                    },
                    meta: {
                        parentRoute: '/siteManage'
                    }
                },
                {
                    path: '/siteManage/downloadConf/siteId=:siteId',
                    name: '下载配置',
                    component: () => {
                        return import('@/views/siteManage/DownloadConf.vue')
                    },
                    meta: {
                        parentRoute: '/siteManage'
                    }
                },
                {
                    path: '/siteManage/pushUrl/siteId=:siteId',
                    name: '推广域名',
                    component: () => {
                        return import('@/views/siteManage/PushUrl.vue')
                    },
                    meta: {
                        parentRoute: '/siteManage'
                    }
                },
                {
                    path: '/gameRoomManage',
                    name: '厅主列表',
                    component: () => {
                        return import('@/views/gameRoomManage/GameRoomManage')
                    }
                },
                {
                    path: '/accountManage1',
                    name: '厅主列表1',
                    component: () => {
                        return import('@/views/gameRoomManage/GameRoomManage1')
                    }
                },
                {
                    path: '/gameList/siteId=:siteId',
                    name: '厅主游戏管理',
                    component: () => {
                        return import('@/views/gameRoomManage/GameList')
                    },
                    meta: {
                        parentRoute: '/gameRoomManage'
                    }
                },
                {
                    path: '/roomList/siteId=:siteId&gameId=:gameId',
                    name: '厅主房间管理',
                    component: () => {
                        return import('@/views/gameRoomManage/RoomList')
                    },
                    meta: {
                        parentRoute: '/gameRoomManage'
                    }
                },
                {
                    path: '/childAccountList/AccountId=:accountId&name=:name&parentAccountId=:fatherId',
                    name: '下级列表',
                    component: () => {
                        return import('@/views/gameRoomManage/ChildAccountList')
                    },
                    meta: {
                        parentRoute: '/gameRoomManage'
                    }
                },
                {
                    path: '/gameRecord',
                    name: '游戏记录',
                    component: () => {
                        return import('@/views/gameRoomManage/GameRecord')
                    },
                    meta: {
                        parentRoute: '/gameRoomManage'
                    }
                },
                {
                    path: '/gameManage',
                    name: '游戏列表',
                    component: () => {
                        return import('@/views/gameManage/GameManage')
                    }
                },
                {
                    path: '/gameManage1',
                    name: '游戏列表1',
                    component: () => {
                        return import('@/views/gameManage/GameManage1')
                    }
                },
                {
                    path: '/gameManage/roomList/gameName=:gameName&gameId=:gameId',
                    name: '游戏房间列表',
                    component: () => {
                        return import('@/views/gameManage/RoomList')
                    },
                    meta: {
                        parentRoute: '/gameManage'
                    }
                },
                {
                    path: '/betRecord',
                    name: '投注记录',
                    component: () => {
                        return import('@/views/reportQuery/BetRecord')
                    },
                },
                {
                    path: '/memberReport/siteId=:siteId',
                    name: '会员报表',
                    component: () => {
                        return import('@/views/reportQuery/MemberReport')
                    },
                    meta: {
                        parentRoute: '/betRecord'
                    }
                },
                {
                    path: '/memberReportDetail/siteId=:siteId&account=:account',
                    name: '会员报表详情',
                    component: () => {
                        return import('@/views/reportQuery/MemberReportDetail')
                    },
                    meta: {
                        parentRoute: '/betRecord'
                    }
                },
                {
                    path: '/betDetail/siteId=:siteId&id=:id&gameId=:gameId',
                    name: '投注详情',
                    component: () => {
                        return import('@/views/reportQuery/BetDetail')
                    },
                    meta: {
                        parentRoute: '/betRecord'
                    }
                },
                {
                    path: '/companyBills',
                    name: '公司账单',
                    component: () => {
                        return import('@/views/reportQuery/CompanyBills')
                    }
                },
                {
                    path: '/billsDetail/siteId=:siteId',
                    name: '账单详情',
                    component: () => {
                        return import('@/views/reportQuery/BillsDetail')
                    },
                    meta: {
                        parentRoute: '/companyBills'
                    }
                },
                {
                    path: '/promotionReport',
                    name: '推广报表',
                    component: () => {
                        return import('@/views/reportQuery/promotionReport/PromotionReport')
                    }
                },
                {
                    path: '/promotionReport/dailyRecord/siteId=:siteId&id=:id/account=:account&playId=:playId',
                    name: '每日记录',
                    component: () => {
                        return import('@/views/reportQuery/promotionReport/DailyRecord')
                    },
                    meta: {
                        parentRoute: '/promotionReport'
                    }
                },
                {
                    path: '/siteInfoManage',
                    name: '消息列表',
                    component: () => {
                        return import('@/views/siteInfoManage/SiteInfoManage')
                    },
                },
                {
                    path: '/accountsManage',
                    name: '总控账号管理',
                    component: () => {
                        return import('@/views/systemSettings/AccountsManage')
                    }
                },
                {
                    path: '/menuSettings',
                    name: '总控菜单管理',
                    component: () => {
                        return import('@/views/systemSettings/MenuSettings')
                    }
                },
                {
                    path: '/agentMenuSettings',
                    name: '代理菜单管理',
                    component: () => {
                        return import('@/views/systemSettings/AgentMenuSettings')
                    }
                },
                {
                    path: '/activitiesLog',
                    name: '操作日志',
                    component: () => {
                        return import('@/views/systemSettings/ActivitiesLog')
                    },
                },
                {
                    path: '/roleManage',
                    name: '角色管理',
                    component: () => {
                        return import('@/views/systemSettings/RoleManage')
                    }
                },
                {
                    path: '/bankingControl',
                    name: '终端银行控制',
                    component: () => {
                        return import('@/views/systemSettings/BankingControl')
                    }
                },
                {
                    path: '/withdrawalSettings',
                    name: '支付出款设置',
                    component: () => {
                        return import('@/views/systemSettings/WithdrawalSettings')
                    }
                },
                {
                    path: '/globalParameter',
                    name: '全局参数',
                    component: () => {
                        return import('@/views/systemSettings/GlobalParameter')
                    }
                },
                {
                    path: '/paymentSettings',
                    name: '支付入款设置',
                    component: () => {
                        return import('@/views/systemSettings/PaymentSettings')
                    }
                },
                {
                    path: '/controlSystem',
                    name: '控制系统',
                    component: () => {
                        return import('@/views/controlSystem/ControlSystem')
                    }
                },
                {
                    path: '/playerControl/siteId=:siteId',
                    name: '玩家单控',
                    component: () => {
                        return import('@/views/controlSystem/PlayerControl')
                    },
                    meta: {
                        parentRoute: '/controlSystem'
                    }
                },
                {
                    path: '/gameControl/siteId=:siteId',
                    name: '游戏控制',
                    component: () => {
                        return import('@/views/controlSystem/GameControl')
                    },
                    meta: {
                        parentRoute: '/controlSystem'
                    }
                },
                {
                    path: '/levels/siteId=:siteId',
                    name: '库存档位',
                    component: () => {
                        return import('@/views/controlSystem/Levels')
                    },
                    meta: {
                        parentRoute: '/controlSystem'
                    }
                },
                {
                    path: '/logs/siteId=:siteId',
                    name: '库存日志',
                    component: () => {
                        return import('@/views/controlSystem/Logs')
                    },
                    meta: {
                        parentRoute: '/controlSystem'
                    }
                },
            ]
        },
    ],
});

const token = () => {
    return window.sessionStorage.getItem('token');
};
const menu = () => {
    return JSON.parse(window.sessionStorage.getItem('sideBarMenu'))
};

// router.beforeEach((to, from, next) => {
//     // console.log(to.name)
//     if (to.name === 'login') {
//         next();
//         return
//     }
//     if (token()) {
//         let permission = false; //是否有权限
//         let hasIndex = false;   //是否有首页
//         menu().forEach(item => {
//             if (item.list.length > 0) {
//                 // 二级菜单
//                 item.list.forEach(child => {
//                     if (child.menuName === to.name || child.menuName === to.meta.parentRouterName) {
//                         permission = true
//                     }
//                 })
//             } else if (item.menuName === to.name || item.menuName === to.meta.parentRouterName ) {
//                 //一级菜单
//                 permission = true
//             }
//             if (item.menuName === '首页') {
//                 hasIndex = true
//             }
//         });
//         if (to.name !== '') {
//             if (permission) {
//                 store.dispatch('addNavItem', {
//                     path: to.path,
//                     name: to.name,
//                     params: to.params
//                 }).catch();
//                 next();
//             } else {
//                 next(false)
//             }
//         } else if (hasIndex) {
//             next('/index');
//         } else
//             next();
//     } else {
//         //未登录，跳转登录
//         next('/login');
//     }
// });

/**使用menuModule字段来判断权限**/
router.beforeEach((to, from, next) => {
    const url = to.path.replace('/', '');   //路由名称
    const parentRoute = to.meta.parentRoute ? to.meta.parentRoute.replace('/', '') : null;  //上级页面

    if (to.meta.parentRoute) console.log(`上级路由：${to.meta.parentRoute}`);

    if (url === 'login') {
        next();
        return
    }

    if (token()) {  //是否登录状态
        let permission = false; //是否有权限
        let hasIndex = false;   //是否有首页权限

        /**菜单权限判断开始**/
        menu().forEach(item => {
            if (item.list.length > 0) {
                // 二级菜单或者子页面
                item.list.forEach(child => {
                    if (child.menuModule === url || child.menuModule === parentRoute) {
                        permission = true
                    }
                })
            } else if (item.menuModule === url || item.menuModule === parentRoute) {
                //一级菜单
                permission = true
            }
            if (item.menuModule === 'index') {
                hasIndex = true
            }
        });
        /**菜单权限判断结束**/

        if (url !== '') {
            if (permission) {
                console.log('Route changed!!!');
                store.dispatch('addNavItem', {...to})
                    .catch(e => {console.log(e)});
                next();
            } else {
                console.log('没权限!!!');
                return next(false)
            }
        } else if (hasIndex) {
            return next('/index');
        } else {
            return next();
        }
    } else {
        //未登录，跳转登录
        return next('/login');
    }
});

export default router;
