import request from '@/requests'
import formData from '@/tools/formData'

export default {
    login: data => request({        //登陆
        url: '/login',
        method: 'post',
        data: formData(data),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
    }),
    logout: () => request({        //登陆
        url: '/logout',
        method: 'post',
    }),
    queryMenu: data => request({        //菜单
        headers: {
            'token': data,
        },
        url: '/queryMenu',
        method: 'post'
        // data: data
    })
}
