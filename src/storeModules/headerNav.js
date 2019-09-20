import router from '@/router'

export default {
    // name: 'headerNav',
    state: {
        navList: [],
        activeItem: {},
    },

    mutations: {
        ADD_ITEM: (state, item) => {
            let idx = state.navList.findIndex(
                function (val) {
                    return val.name === this.name
                },
                item
            );
            if (idx > -1) {
                state.activeItem = state.navList[idx];
            } else {
                state.navList.push(item);
                state.activeItem = item;
            }
        },
        REMOVE_ITEM: (state, item) => {
            if (state.navList.length === 1 && state.navList[0].name === '首页') {
                return;
            }
            let idx = state.navList.findIndex(
                function (val) {
                    return val.name === this.name
                },
                item
            );
            if (!state.activeItem) {
                state.navList = [];
            }
            else if (item.name === state.activeItem.name) {
                state.navList.splice(idx, 1);
                if (state.navList.length > 0) {
                    state.activeItem = state.navList[idx - 1];
                    router.push(state.activeItem);
                } else {
                    router.push('/');
                }
            } else {
                state.navList.splice(idx, 1);
            }
        },
        REMOVE_ALL: (state) => {
            if (!(state.navList.length === 1 && state.navList[0].name === '首页')) {
                state.navList = [];
                router.push('/');
            }
        },
        REMOVE_OTHER: (state) => {
            state.navList = [];
            state.navList.push(state.activeItem);
        },
    },
    actions: {
        addNavItem({commit}, item) {  //顶部导航添加新卡片
            commit('ADD_ITEM', item)
        },
        removeNavItem({commit}, item) {  //顶部导航关闭卡片
            commit('REMOVE_ITEM', item)
        },
        navRemoveAllItems({commit}) { //关闭所有卡片
            commit('REMOVE_ALL')
        },
        navRemoveOtherItems({commit}) { //关闭其他卡片
            commit('REMOVE_OTHER')
        },
    }
};
