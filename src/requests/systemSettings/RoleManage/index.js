import request from '@/requests'

export default {
    getRoles: data => request({   //获取角色列表
        url: '/roleManage/getRoles',
        method: 'post',
        data: data
    }),
    deleteRole: data => request({   //删除
        url: '/roleManage/deleteRole',
        method: 'post',
        data: data
    }),
    addOrUpdateRole: data => request({   //新增/修改/启用/禁用
        url: '/roleManage/addOrUpdateRole',
        method: 'post',
        data: data
    }),
    roleMenulist: data => request({   //权限列表
        url: '/roleManage/roleMenulist',
        method: 'post',
        data: data
    }),
    roleToMenu: data => request({   //修改权限
        url: '/roleManage/roleToMenu',
        method: 'post',
        data: data
    }),
}