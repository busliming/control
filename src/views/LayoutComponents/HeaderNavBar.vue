<template>
    <div class="header-nav">
        <div class="roll-left" @click="sroll('left')">
            <i class="el-icon-d-arrow-left"></i>
        </div>
        <div class="navctn">
            <ul class="tabs-container">
                <template v-for="(item, index) in navItems">
                    <header-nav-items
                            :key="index"
                            :item='item'
                            :index='index'
                    ></header-nav-items>
                </template>
            </ul>
        </div>

        <div class="right-btn-group">
            <div class="roll-right" @click="sroll('right')">
                <i class="el-icon-d-arrow-right"></i>
            </div>
            <div class="online-count">
                在线人数：
                <p style="color: #FF4949">{{ onlineCount }}</p>
            </div>
            <el-dropdown class="drop-down" @command="handleCommand" trigger="click">
                <span class="el-dropdown-link">
                    关闭操作
                    <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="closeAll" :disabled='$store.getters.navList.length<1'>关闭全部选项卡
                    </el-dropdown-item>
                    <el-dropdown-item command="closeOther" :disabled='$store.getters.navList.length<1'>关闭其他选项卡
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <div class="logout-btn" @click="logout">
                <i class="el-icon-error"></i>
                退出
            </div>
        </div>
    </div>
</template>

<script>
    import headerNavItems from './HeaderNavItems'
    import request from '@/requests/login'
    import index from '@/requests/homePage'

    export default {
        components: {
            headerNavItems
        },
        data() {
            return {
                onlineCount: 0
            }
        },
        computed: {
            navBar() {
                return document.querySelector('.tabs-container');
            },
            navItems() {
                return this.$store.getters.navList;
            }
        },
        watch: {
            '$route'(route) {
                if (route.name) {
                    this.$nextTick(function () {
                        this.scrollCurrentToView(); //显示标签卡
                    });
                }
            }
        },
        methods: {
            queryHomeOnlineNumber() {
                index.HomeOnlineNumber().then(res => {
                    this.onlineCount = res.data
                })
            },
            scrollRender(target, dir) { //滚动动画效果 target 目标距离 dir 滚动方向
                let el = this.navBar;
                let _render = function () {
                    let crt = el.scrollLeft;
                    if (dir === 'left') {
                        if (crt > target) {
                            el.scrollLeft -= 200;
                            window.requestAnimationFrame(_render)
                        }
                    }
                    if (dir === 'right') {
                        if (crt < target) {
                            el.scrollLeft += 200;
                            window.requestAnimationFrame(_render)
                        }
                    }
                };
                _render();
            },
            scrollCurrentToView() {
                let el = document.querySelector('.tab-item.active');
                let elparent = this.navBar;
                let eloffset = el.offsetLeft - elparent.offsetLeft; //当前元素元素相对父元素的偏移
                let elleftoffset = eloffset - elparent.scrollLeft; //当前元素左边缘距离可视区域左端距离
                let elrightoffset = elleftoffset + el.clientWidth - elparent.clientWidth; //当前元素右边缘距离可视区域右端距离
                if (
                    (el.offsetLeft - elparent.offsetLeft) >= elparent.scrollLeft &&
                    (el.offsetLeft + el.clientWidth - elparent.offsetLeft) < (elparent.scrollLeft + elparent.clientWidth)
                ) {
                    // console.log('元素位于可视范围');
                    return
                }
                if (elleftoffset > 0) { //元素在视口右侧
                    //元素右侧滚动至视口右端
                    this.scrollRender(Math.abs(elrightoffset) + elparent.scrollLeft, 'right')
                }
                if (elleftoffset < 0) { //元素在视口左侧
                    //元素左侧滚动至视口左端
                    this.scrollRender(elparent.scrollLeft - Math.abs(elleftoffset), 'left')
                }
            },
            sroll(d) {
                let navWidth = this.navBar.clientWidth;
                let scrollLeft = this.navBar.scrollLeft;
                if (d === 'right') {
                    this.scrollRender(scrollLeft + navWidth, 'right');
                    // this.navBar.scrollLeft += navWidth/3;
                } else {
                    this.scrollRender(scrollLeft - navWidth, 'left');
                    // this.navBar.scrollLeft -= navWidth/3;
                }
                // console.log(this.navBar.scrollLeft)
            },
            handleCommand(cmd) {
                if (cmd === 'closeAll') {
                    this.$store.dispatch('navRemoveAllItems').catch();
                }
                if (cmd === 'closeOther') {
                    this.$store.dispatch('navRemoveOtherItems').catch();
                }
            },
            logout() {
                this.$confirm(
                    '确认退出总控系统吗？',
                    '提示',
                    {
                        confirmButtonText: '确认退出',
                        type: 'warning'
                    }
                ).then(() => {
                    this.$store.dispatch('logout').catch();
                }).catch(() => {
                    this.$message.info('已取消！')
                })
            }
        },
        created() {
            this.queryHomeOnlineNumber()
        }
    }
</script>

<style lang="scss">
    .header-nav {
        display: flex;
        flex-flow: row wrap;
        justify-content: flex-start;
        align-content: center;

        height: 59px;
        /*display: flex;*/
        /*flex-flow: column wrap;*/
        letter-spacing: 2px;
        position: relative;
        overflow: hidden;
        z-index: 999;
        /*border-bottom: 1px solid hsla(0, 0%, 100%, .3);*/
        background-color: rgba(216, 223, 226, 0.5);
        box-shadow: inset 0 60px rgba(255, 255, 255, 0.2),
        inset 0 -10px 30px rgba(0, 0, 0, 0.4),
        0 5px 10px rgba(0, 0, 0, 0.5);
        .roll-left {
            /*position: absolute;*/
            /*left: 0;*/
            width: 45px;
            padding: 10px;
        }
        .navctn {
            /*width: calc(100% - 325px);*/
            width: calc(100% - 445px);
            height: 100%;
            overflow: hidden;
        }
        .tabs-container {
            /*position: absolute;*/
            /*left: 45px;*/
            /*width: calc(100% - 280px);*/
            /*overflow: hidden;*/
            display: flex;
            flex-flow: row nowrap;
            list-style: none;
            width: auto;
            height: 58px;
            white-space: nowrap;
            overflow-x: scroll;
            overflow-y: hidden;
            font-size: 0;
            &::-webkit-scrollbar {
                display: none;
                width: 0;
                height: 0;
            }
            > .tab-item {
                display: inline-block;
                position: relative;
                /*float: left;*/
                padding: 10px;
                margin: 0 1px;
                background: none;
                font-weight: 400;
                text-shadow: 0 1px 2px rgba(0, 0, 0, .1);
                font-size: 13px;
                border: none;
                transition: all 0.3s ease 0s;
                &:after {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    content: '';
                    display: block;
                    width: 0;
                    height: 2px;
                    background: #006eb4;
                    transition: width .3s;
                }
                /*&:hover:after,*/
                &.active:after {
                    left: 5%;
                    width: 90%;
                }
                &.active {
                    font-size: 16px;
                    font-weight: bolder;
                    color: #006eb4;
                }
                &.active {
                    text-shadow: 0 1px 2px rgba(0, 0, 0, .1);
                    -webkit-mask-image: linear-gradient(-75deg, rgba(255, 255, 255, 0.8) 30%, rgba(255, 255, 255, 0.4) 50%, rgba(255, 255, 255, 0.8) 70%);
                    -webkit-mask-size: 200%;
                    animation: shine 5s infinite;
                }
            }
        }
        .right-btn-group {
            position: absolute;
            right: 0;
            width: 400px;
            /*width: 280px;*/
            display: flex;
            flex-flow: column wrap;
            justify-content: flex-end;
            > * {
                padding: 10px;
            }
            .roll-right {
                width: 40px;
            }
            .drop-down {
                min-width: 100px;
            }
            .logout-btn {
                min-width: 70px;
            }
        }
        .el-dropdown-menu {
            width: 150px;
        }

        > *, .tabs-container > *, .right-btn-group > * {
            height: 58px;
        }
        .roll-left,
        .tabs-container .tab-item,
        .right-btn-group > * {
            display: flex;
            align-items: center;
            cursor: pointer;
            background: transparent;
            color: #4a4a4a;
            font-weight: 800;
            text-shadow: 0 1px 2px rgba(0, 0, 0, .1);
            font-size: 14px;
            transition: all 0.3s ease 0s;
            &:hover {
                font-size: 18px;
                /*background: rgba(31, 40, 62, 0.1);*/
                color: #006eb4;
            }
        }
        i {
            vertical-align: middle;
            margin-left: 3px;
            margin-top: 2px;
            &:hover {
                color: #006eb4
            }
        }
    }

    @-webkit-keyframes shine {
        from {
            -webkit-mask-position: 150%;
        }
        to {
            -webkit-mask-position: -50%;
        }
    }
</style>
