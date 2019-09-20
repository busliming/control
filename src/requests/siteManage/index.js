import request from '@/requests'
import formData from '@/tools/formData'

export default {
    /*********************************站点管理**********************************/
    siteList: data => request({   //获取站点列表
        url: '/siteManage/sitelist',
        method: 'post',
        data: data
    }),
    getPayTypeListAndGameList: data => request({    //获取站点游戏信息
        url: '/siteManage/getPayTypeListAndGameList',
        method: 'post',
        data: data
    }),
    upOrDownSite: data => request({      //启用，禁用站点
        url: 'siteManage/upOrDownSite',
        method: 'post',
        data: data
    }),
    preventiveAllSite: data => request({    //更改维护状态
        url: 'siteManage/preventiveAllSite',
        method: 'post',
        data: data
    }),
    preventiveAllSite2: data => request({    //修改维护时间
        url: 'siteManage/preventiveAllSite/event',
        method: 'patch',
        data: data
    }),
    preventive: data => request({    //维护所有站点
        url: 'siteManage/preventive/all',
        method: 'put',
        data: data
    }),
    getDomainsUpdateSite: data => request({      //获取站点域名
        url: 'siteManage/getDomainsUpdateSite',
        method: 'post',
        data: data
    }),
    querySiteAccount: data => request({     //查询站点厅主账号
        url: '/accountManage/querySiteAccount',
        method: 'post',
        data: data
    }),
    deleteSite: data => request({     //删除站点
        url: 'siteManage/deleteSite',
        method: 'post',
        data: data
    }),
    createSite: data => request({     //添加站点
        url: 'siteManage/createSite',
        method: 'post',
        data: data
    }),
    updateSite: data => request({     //更新站点
        url: 'siteManage/updateSite',
        method: 'post',
        data: data
    }),

    /*********************************域名绑定**********************************/
    getMainSiteDomainList: data => request({     //域名列表
        url: 'siteManage/getMainSiteDomainList',
        method: 'post',
        data: data
    }),
    addSiteDomainInfo: data => request({     //批量添加域名
        url: 'siteManage/addSiteDomainInfo',
        method: 'post',
        data: data
    }),
    delSiteDomainInfo: data => request({     //批量删除域名
        url: 'siteManage/delSiteDomainInfo',
        method: 'post',
        data: data
    }),
    getSiteAgentDomain: data => request({     //获取代理域名
        url: 'siteManage/getSiteAgentDomain',
        method: 'post',
        data: data
    }),
    addOrUpdateAgentDomain: data => request({     //更新代理域名
        url: 'siteManage/addOrUpdateAgentDomain',
        method: 'post',
        data: data
    }),
    editSiteDomainInfo: data => request({     //更改代理域名类表的域名
        url: 'siteManage/editSiteDomainInfo',
        method: 'post',
        data: data
    }),
    enabledSiteDomain: data => request({     //禁用启用域名
        url: 'siteManage/enabledSiteDomain',
        method: 'post',
        data: data
    }),
    getMainSiteDomainDetail: data => request({     //获取域名信息
        url: 'siteManage/getMainSiteDomainDetail',
        method: 'post',
        data: data
    }),

    /*********************************下载配置**********************************/
    getSiteDownloadSetList: data => request({     //获取下载列表
        url: 'dlset/getSiteDownloadSetList',
        method: 'post',
        data: data
    }),
    addOrUpdateSiteDownloadSet: data => request({     //更新配置
        url: 'dlset/addOrUpdateSiteDownloadSet',
        method: 'post',
        data: data
    }),
    uploadFile: data => request({
        url: data.bundleId ?
            '/upload/uploadFile?siteId=' + data.siteId + '&pathType=4&fileName=' + data.fileName
            + '&bundleId=' + data.bundleId :
            '/upload/uploadFile?siteId=' + data.siteId + '&pathType=4&fileName=' + data.fileName,
        method: 'post',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        data: formData({file: data.file}),
        onUploadProgress: data.progcallback
    }),


    /*********************************推广域名**********************************/
    getSitePopuDomains: data => request({     //查询列表
        url: 'siteManage/getSitePopuDomains',
        method: 'post',
        data: data
    }),
    addOrUpSitePopuDomains: data => request({     //新增/修改
        url: 'siteManage/addOrUpSitePopuDomains',
        method: 'post',
        data: data
    }),
    delSitePopuDomain: data => request({     //删除/批量删除
        url: 'siteManage/delSitePopuDomain',
        method: 'post',
        data: data
    }),
    enabledSitePopuDomain: data => request({     //启用/禁用
        url: 'siteManage/enabledSitePopuDomain',
        method: 'post',
        data: data
    }),
}
