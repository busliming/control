import request from '@/requests'
import formData from '@/tools/formData'

export default {
    getUsers: data => request({//获取账号列表
        url: '/accountManage/getUsers',
        method: 'post',
        data: data
    }),
    updateControlAccount: data => request({//修改账户信息
        url: '/accountManage/updateControlAccount',
        method: 'post',
        data: data
    }),
    addControlAccount: data => request({//增加账户信息
        url: '/accountManage/addControlAccount',
        method: 'post',
        data: data
    }),
    getRoles: data => request({//获取角色列表
        url: '/roleManage/getRoles',
        method: 'post',
        data: data
    }),
    deleteUser: data => request({//删除用户列表
        url: '/accountManage/deleteUser',
        method: 'post',
        data: data
    }),
}