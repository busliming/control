import request from '@/requests'

export default {
    getPaySystemList: data => request({   //获取邮件列表
        url: '/paySystem/getPaySystemList',
        method: 'post',
        data: data
    }),
    availableChannel: data => request({   //获取select列表
        url: '/paySystem/availableChannel',
        method: 'get',
        data: data
    }),
    addOrUpdatePaySystem: data => request({   //添加/更新
        url: '/paySystem/addOrUpdatePaySystem',
        method: 'post',
        data: data
    }),
    queryAllBankList: data => request({   //添加/更新
        url: '/bankMapping/queryAllBankList',
        method: 'post',
        data: data
    }),
    addOrUpdateBankCode: data => request({   //添加/更新银行信息
        url: '/bankMapping/addOrUpdateBankCode',
        method: 'post',
        data: data
    }),
}