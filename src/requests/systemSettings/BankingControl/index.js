import request from '@/requests'
import formData from '@/tools/formData'

export default {
    getAllBankList: data => request({   //获取银行列表
        url: '/bank/getAllBankList',
        method: 'post',
        data: data
    }),
    addOrUpdateBank: data => request({   //新增/修改
        url: '/bank/addOrUpdateBank',
        method: 'post',
        data: data
    }),
    deleteByBankId: data => request({   //删除
        url: '/bank/deleteByBankId',
        method: 'post',
        data: formData(data)
    }),
}