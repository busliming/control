import request from '@/requests'
// import formData from '@/tools/formData'

export default {
    getGames: data => request({   //获取站点列表
        url: '/gameManage/getGames',
        method: 'post',
        data: data
        // headers:{
        //     'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'
        // },
    }),
    addOrUpdateGame: data => request({   //更改游戏信息
        url: '/gameManage/addOrUpdateGame',
        method: 'post',
        data: data
    }),
    getGameSite: data => request({   //修改游戏站点信息
        url: '/gameManage/getGameSite',
        method: 'post',
        data: data
    }),
    setGameSite: data => request({   //更新游戏站点信息
        url: '/gameManage/setGameSite',
        method: 'post',
        data: data
    }),
    setGameMaintain: data => request({   //更新游戏维护状态
        url: '/gameManage/setGameMaintain',
        method: 'post',
        data: data
    }),
    deleteGame: data => request({   //删除游戏
        url: '/gameManage/deleteGame',
        method: 'post',
        data: data
    }),
    setBatchGameMaintain: data => request({   //批量维护/启用/关闭游戏
        url: '/gameManage/setBatchGameMaintain',
        method: 'post',
        data: data
    }),
    getRoomPage: data => request({   //查看游戏房间雷彪
        url: '/room/getRoomPage',
        method: 'post',
        data: data
    })
}
