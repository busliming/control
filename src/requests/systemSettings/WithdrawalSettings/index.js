import request from '@/requests'

export default {
    getDrawSystemList: data => request({   //获取邮件列表
        url: '/drawSystem/getDrawSystemList',
        method: 'post',
        data: data
    }),
    addOrUpdateDrawSystem: data => request({   //获取邮件列表
        url: '/drawSystem/addOrUpdateDrawSystem',
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