import request from '@/requests'

export default {

    /*********************************投注记录**********************************/


    queryGameTotalReport: data => request({// 获取第一个页面的总表
        url: '/gameManage/queryGameTotalReport',
        method: 'post',
        data: data
    }),
    queryAllSiteReport: data => request({// 获取第一个页面的所有站点报表
        url: '/gameManage/queryAllSiteReport',
        method: 'post',
        data: data
    }),
    getSiteInfo: data => request({// 获取select的options
        url: '/siteManage/getSiteInfo',
        method: 'post',
        data: data
    }),
    queryAllUserReport: data => request({// 获取第2个页面的数据
        url: '/gameManage/queryAllUserReport',
        method: 'post',
        data: data
    }),
    getGameRecord: data => request({// 获取第3个页面的数据
        url: '/gameManage/getGameRecord',
        method: 'post',
        data: data
    }),
    getRoomTypeList: data => request({// 获游戏房间全部或具体游戏房间
        url: '/gameManage/getRoomTypeList',
        method: 'post',
        data: data
    }),
    getGameType: data => request({// 获取游戏类型列表
        url: '/gameManage/getGameType',
        method: 'post',
        data: data
    }),



/*********************************游戏详情**********************************/



    getBenzBmwDetails: data => request({// 查询奔驰宝马游戏详情
        url: '/gameManage/getBenzBmwDetails',
        method: 'post',
        data: data
    }),
    getBirdsAndBeastsDetails: data => request({// 查询飞禽走兽游戏详情
        url: '/gameManage/getBirdsAndBeastsDetails',
        method: 'post',
        data: data
    }),
    getBulletRecordList: data => request({// 查询金蟾捕鱼 李逵劈鱼游戏详情
        url: '/gameManage/getBulletRecordList',
        method: 'post',
        data: data
    }),
    getDouDiZhuDetails: data => request({// 查询斗地主游戏详情
        url: '/gameManage/getDouDiZhuDetails',
        method: 'post',
        data: data
    }),
    getBaiRenNiuNiuDetails: data => request({// 查询百人牛牛游戏详情
        url: '/gameManage/getBaiRenNiuNiuDetails',
        method: 'post',
        data: data
    }),
    getRedBlackWarDetails: data => request({// 查询红黑大战游戏详情
        url: '/gameManage/getRedBlackWarDetails',
        method: 'post',
        data: data
    }),
    getTwoPeopleTenDetails: data => request({// 查询二人拼十游戏详情
        url: '/gameManage/getTwoPeopleTenDetails',
        method: 'post',
        data: data
    }),
    getBaccaratDetails: data => request({// 查询欢乐30秒游戏详情
        url: '/gameManage/getBaccaratDetails',
        method: 'post',
        data: data
    }),
    getQiangeZhuangDetails: data => request({// 查询抢庄拼十游戏详情
        url: '/gameManage/getQiangeZhuangDetails',
        method: 'post',
        data: data
    }),
    getShakeOneShakeDetails: data => request({// 查询摇一摇游戏详情
        url: '/gameManage/getShakeOneShakeDetails',
        method: 'post',
        data: data
    }),
    getTexasPokerDetails: data => request({// 获取德州扑克游戏详情
        url: '/gameManage/getTexasPokerDetails',
        method: 'post',
        data: data
    }),
    getThirteenDetails: data => request({// 获取十三水游戏详情
        url: '/gameManage/getThirteenDetails',
        method: 'post',
        data: data
    }),
    getZJHDetails: data => request({// 获取扎金花游戏详情
        url: '/gameManage/getZJHDetails',
        method: 'post',
        data: data
    }),
    getTBNNDDetails: data => request({// 获取通比牛牛游戏详情
        url: '/gameManage/getTBNNDDetails',
        method: 'post',
        data: data
    }),
    getQZPJDetails: data => request({// 获取抢庄牌九游戏详情
        url: '/gameManage/getQZPJDetails',
        method: 'post',
        data: data
    }),
    getYZLHDetails: data => request({// 获取压庄龙虎游戏详情
        url: '/gameManage/getYZLHDetails',
        method: 'post',
        data: data
    }),
    getSanGongDetails: data => request({// 获取三公游戏详情
        url: '/gameManage/getSanGongDetails',
        method: 'post',
        data: data
    }),
    getEBGDetails: data => request({// 获取28杠游戏详情
        url: '/gameManage/getEBGDetails',
        method: 'post',
        data: data
    }),
    getBlackJackDetails: data => request({// 获取21点游戏详情
        url: '/gameManage/getBlackJackDetails',
        method: 'post',
        data: data
    }),
    getForestDanceDetails: data => request({// 获取森林舞会游戏详情
        url: '/gameManage/getForestDanceDetails',
        method: 'post',
        data: data
    }),



    /*********************************公司账单**********************************/


    siteList: data => request({   //获取站点列表
        url: '/siteManage/sitelist',
        method: 'post',
        data: data
    }),
    getBill: data => request({   //获取站点明细
        url: '/comBill/getBill',
        method: 'post',
        data: data
    }),
    updateBill: data => request({   //修改站点信息
        url: '/comBill/updateBill',
        method: 'post',
        data: data
    }),
    comBillExport: data => request({   //导出
        url: '/comBill/comBillExport',
        method: 'post',
        data: data,
        responseType: 'blob'
    }),
}