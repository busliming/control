import request from '@/requests'

export default {
    getGlobalStockWeak: data => request({   //查询全局参数
        url: '/global/getGlobalStockWeak',
        method: 'post',
        data: data
    }),
    editGlobalStockWeak: data => request({   //改变全局参数
        url: '/global/editGlobalStockWeak',
        method: 'post',
        data: data
    }),
    gameRecordMakeUp: data => request({   //游戏记录补偿
        url: '/gameManage/gameRecordMakeUp',
        method: 'post',
        data: data
    }),
}