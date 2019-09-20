import router from '@/router'
import request from '@/requests/login'
import {Message} from 'element-ui';

const session = {
    state: {
        token: '',
        userName: '',
        sideBarMenu: []
    },
    mutations: {
        setToken(state, token) {
            state.token = token;
            window.sessionStorage.setItem('token', token)
        },
        setMenu(state, list) {
            window.sessionStorage.setItem('sideBarMenu', JSON.stringify(list));
        }
    },
    actions: {
        logIn({dispatch, commit}, data) {
            return new Promise((resolve, reject) => {
                request.login(data).then(res => {
                    if (res.code === '200') {
                        let token = res.data;
                        if (token) {
                            commit('setToken', token);
                            dispatch('queryMenu', token).then(() => {
                                console.log('获取菜单成功');
                                console.log('下一步：跳转页面');
                                resolve(res);
                            }).catch(e => {
                                console.log('获取菜单失败');
                                reject(e)
                            });
                        }
                    } else {
                        console.log('验证不通过');
                        reject(res);
                    }
                });
            });
        },
        queryMenu({commit, state}, data) {
            request.queryMenu(data).then(res => {
                window.sessionStorage.setItem('sideBarMenu', JSON.stringify(res));
                commit('setMenu', res);
            })
        },
        logout() {
            window.sessionStorage.clear();
            router.push('/login');
        }
    }
};

export default session
