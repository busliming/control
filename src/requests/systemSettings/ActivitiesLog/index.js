import request from '@/requests'

export default {
    queryLog: data => request({//获取日志列表
        url: '/agentLogManage/queryLog',
        method: 'post',
        data: data
    }),
}