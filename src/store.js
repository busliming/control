import Vue from 'vue'
import Vuex from 'vuex'
import headerNav from '@/storeModules/headerNav'
import session from '@/storeModules/loginSession'

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        headerNav,
        session
    },
    state: {},
    getters: {
        navList: state => state.headerNav.navList,
        activeItem: state => state.headerNav.activeItem,
        token: state => state.session.token,
        sideBarMenuItems: () => JSON.parse(window.sessionStorage.getItem('sideBarMenu'))
    },
    mutations: {},
    actions: {}
})
