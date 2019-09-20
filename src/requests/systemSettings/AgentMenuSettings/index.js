import request from '@/requests'

export default {
    permissionList: data => request({//获取菜单列表
        url: '/permission/permissionList',
        method: 'post',
        data: data
    }),
    addOrUpdateMenu: data => request({//新增/更新
        url: '/permission/addOrUpdateMenu',
        method: 'post',
        data: data
    }),
    deleteMenu: data => request({//删除菜单
        url: '/permission/deleteMenu',
        method: 'post',
        data: data
    }),
}