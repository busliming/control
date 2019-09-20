import request from '@/requests'

export default {
    getNotices: data => request({   //获取邮件列表
        url: '/noticeManage/getNotices',
        method: 'post',
        data: data
    }),
    getSiteList: data => request({   //获取站点列表
        url: '/noticeManage/getSiteList',
        method: 'post',
        data: data
    }),
    addOrUpdateNotice: data => request({   //更新或添加信息
        url: '/noticeManage/addOrUpdateNotice',
        method: 'post',
        data: data
    }),
    deleteNotice: data => request({   //删除信息
        url: '/noticeManage/deleteNotice',
        method: 'post',
        data: data
    }),

}