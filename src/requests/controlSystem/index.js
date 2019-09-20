import request from '@/requests'

export default {
    selectSiteControl: data => request({   //控制系统首页列表
        url: '/control/selectSiteControl',
        method: 'post',
        data: data
    }),

    /**********************日志*************************/

    selectStockWeakLog: data => request({   //库存衰减日志列表
        url: '/control/selectStockWeakLog',
        method: 'post',
        data: data
    }),
    selectControlLog: data => request({   //玩家单控日志列表
        url: '/control/selectControlLog',
        method: 'post',
        data: data
    }),

    /**********************库存档位*************************/

    selectGameName: data => request({   //查询游戏下拉框选项
        url: '/control/selectGameName',
        method: 'post',
        data: data
    }),
    selectGameRoom: data => request({   //查询房间下拉框选项
        url: '/control/selectGameRoom',
        method: 'post',
        data: data
    }),
    selectStockGear: data => request({   //查询档位列表
        url: '/control/selectStockGear',
        method: 'post',
        data: data
    }),
    insetStockGear: data => request({   //新增档位
        url: '/control/insetStockGear',
        method: 'post',
        data: data
    }),
    selectBetNumber: data => request({   //查询下注人数
        url: '/control/selectBetNumber',
        method: 'post',
        data: data
    }),
    betNumber: data => request({   //保存下注人数
        url: '/control/betNumber',
        method: 'post',
        data: data
    }),
    allUpdateStockGear: data => request({   //批量设置
        url: '/control/allUpdateStockGear',
        method: 'post',
        data: data
    }),
    deleteStockGear: data => request({   //删除
        url: '/control/deleteStockGear',
        method: 'post',
        data: data
    }),

    /**********************游戏控制*************************/

    selectStockWeak: data => request({   //游戏控制列表
        url: '/control/selectStockWeak',
        method: 'post',
        data: data
    }),
    insetOrUpdateStockWeak: data => request({   //游戏控制修改
        url: '/control/insetOrUpdateStockWeak',
        method: 'post',
        data: data
    }),
    selectStorage: data => request({   //库存值查询
        url: '/control/selectStorage',
        method: 'post',
        data: data
    }),
    allStockWeak: data => request({   //批量设置库存衰减
        url: '/control/allStockWeak',
        method: 'post',
        data: data
    }),

    /**********************玩家单控*************************/
    selectControl: data => request({  //单控列表
        url: '/control/selectControl',
        method: 'post',
        data: data
    }),
    insetControl: data => request({   //新增
        url: '/control/insetControl',
        method: 'post',
        data: data
    }),
    deleteControl: data => request({   //删除/批量删除
        url: '/control/deleteControl',
        method: 'post',
        data: data
    }),
    updateControl: data => request({   //编辑玩家单控
        url: '/control/updateControl',
        method: 'post',
        data: data
    }),
}