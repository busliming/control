import request from '@/requests'

export default {
    /**********************厅主管理*************************/


    getAccounts: data => request({   //获取账号列表
        url: '/accountManage/getAccounts',
        method: 'post',
        data: data
    }),
    updateControlAccount: data => request({   //更新账户信息
        url: '/accountManage/updateControlAccount',
        method: 'post',
        data: data
    }),
    addControlAccount: data => request({   //新建账户信息
        url: '/accountManage/addControlAccount',
        method: 'post',
        data: data
    }),


    /**********************游戏列表*************************/


    getSiteGames: data => request({   //获取游戏列表
        url: '/gameManage/getSiteGames',
        method: 'post',
        data: data
    }),
    addBetGameRoom: data => request({   //新增棋牌
        url: '/room/addBetGameRoom',
        method: 'post',
        data: data
    }),
    addFishTbGameRoom: data => request({   //新增捕鱼
        url: '/room/addFishTbGameRoom',
        method: 'post',
        data: data
    }),
    addFightTbGameRoom: data => request({   //新增电玩
        url: '/room/addFightTbGameRoom',
        method: 'post',
        data: data
    }),


    /**********************房间列表*************************/


    getRoomPage: data => request({   //获取房间列表
        url: '/room/getRoomPage',
        method: 'post',
        data: data
    }),
    editGameRoomConfig: data => request({   //查询
        url: '/room/editGameRoomConfig',
        method: 'post',
        data: data
    }),
    updateBetRoomConfig: data => request({   //更新棋牌
        url: '/room/updateBetRoomConfig',
        method: 'post',
        data: data
    }),
    updateFishRoomConfig: data => request({   //更新捕鱼
        url: '/room/updateFishRoomConfig',
        method: 'post',
        data: data
    }),
    updateDoudizhuRoomConfig: data => request({   //更新电玩
        url: '/room/updateDoudizhuRoomConfig',
        method: 'post',
        data: data
    }),
    deleteRoomConfig: data => request({   //删除
        url: '/room/deleteRoomConfig',
        method: 'post',
        data: data
    }),
    updateTbGameRoom: data => request({   //启用/禁用
        url: '/room/updateTbGameRoom',
        method: 'post',
        data: data
    }),


    /**********************下级列表*************************/

    queryUserDetails: data => request({   //查询基础/账户信息
        url: '/accountManage/queryUserDetails',
        method: 'post',
        data: data
    }),
    getUserGameList: data => request({   //查询游戏信息
        url: '/accountManage/getUserGameList',
        method: 'post',
        data: data
    }),
    getUserOperList: data => request({   //查询活动信息
        url: '/accountManage/getUserOperList',
        method: 'post',
        data: data
    }),
    getGlobalStockWeak: data => request({   //查询全局参数
        url: '/global/getGlobalStockWeak',
        method: 'post',
        data: data
    }),


    /**********************游戏记录*************************/

    findAccountQuery: data => request({   //查询全局参数
        url: '/accountManage/findAccountQuery',
        method: 'post',
        data: data
    }),

}
