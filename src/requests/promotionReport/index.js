import request from '@/requests'

export default {
    getSiteInfo: data => request({// 获取select的options
        url: '/siteManage/getSiteInfo',
        method: 'post',
        data: data
    }),
    getPromotionReport: data => request({// 获取推广报表
        url: '/promotion/getPromotionReport',
        method: 'post',
        data: data
    }),
    dailyRecord:data => request({  //查找会员id是否存在
        url: '/promotion/dailyRecord',
        method:'post',
        data:data
    }),
}
