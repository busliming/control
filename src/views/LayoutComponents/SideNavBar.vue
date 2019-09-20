<template>
    <div>
        <el-menu class="side-navBar" :default-active="$route.name" unique-opened @select='menuSelectHandle' :collapse="isCollapse">
            <div class="logo">
                <div class="photo">
                    <img src="../../assets/logo1.jpg" alt="">
                </div>
                <span class="shine" v-show="!isCollapse">总控系统</span>
            </div>
            <template v-for="level1 in menuItems">
                <template v-if="level1.list&&level1.list.length > 0">
                    <el-submenu class="submenu" :index="level1.menuName" :key="level1.id">
                        <template slot="title">
                            <i :class="level1.menuIcon"></i>
                            <span>{{level1.menuName}}</span>
                        </template>
                        <template v-for="level2 in level1.list">
                            <el-menu-item :key="level2.id" :index="level2.menuModule">{{level2.menuName}}</el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item class="alone" :index="level1.menuModule" :key="level1.id">
                        <i :class="level1.menuIcon"></i>
                        <template slot="title">
                            <span>{{level1.menuName}}</span>
                        </template>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    export default {
        props: ['windowWidth'],
        data() {
            return {
                isCollapse: false,
            }
        },
        watch: {
            windowWidth(val) {
                this.isCollapse = val < 1600;
            }
        },
        computed: {
            menuItems() {
                return JSON.parse(window.sessionStorage.getItem('sideBarMenu'))
            }
        },
        methods: {
            menuSelectHandle(key, keyPath) {
                // this.$router.push({
                //     name: key
                // });
                this.$router.push(`/${key}`);
            },
        },
        created() {
            this.isCollapse = this.windowWidth < 1600;
        }
    }
</script>

<style>
    .side-navBar {
        background: url('~@/assets/sidebar-bg.jpg') no-repeat;
        background-position: 25%;
        background-size: cover;
        height: 100vh;
        min-height: 545px;
        overflow-y: auto;
        overflow-x: auto;
        -webkit-box-shadow: 5px 0px 10px 1px rgba(61, 51, 61, 0.6);
        -moz-box-shadow: 5px 0px 10px 1px rgba(61, 51, 61, 0.6);
        box-shadow: 5px 0px 10px 1px rgba(61, 51, 61, 0.6);
    }
    .side-navBar::-webkit-scrollbar {
        display: none;
        width: 0;
        height: 0;
    }
    .side-navBar * {
        background: none;
        color: #fff;
        text-shadow: 0 1px 2px rgba(0, 0, 0, .1);
        font-weight: bold;
        letter-spacing: 2px;
    }

    .logo {
        height: 40px;
        padding: 0 15px 15px 20px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-top: 20px;
        border-bottom: 1px solid hsla(0, 0%, 100%, .3);
    }

    .photo {
        width: 40px;
        height: 40px;
        overflow: hidden;
        border-radius: 50%;
        float: left;
        margin-right: 30px;
        z-index: 5;
    }

    .photo img {
        float: left;
        width: 40px;
        height: 40px;
        overflow: hidden;
        border-radius: 50%;
        margin: 0;
        z-index: 5;
    }

    .shine {
        padding: 5px 0;
        display: inline-block;
        font-size: 18px;
        white-space: nowrap;
        font-weight: 800;
        line-height: 30px;
        overflow: hidden;
        color: #ffffff;
        text-shadow: 0 1px 2px rgba(0, 0, 0, .1);
        -webkit-mask-image: linear-gradient(-75deg, #ffffff 0%, rgb(255, 255, 255, 0.6) 30%, #ffffff 50%, rgba(255, 255, 255, 0.6) 70%, #ffffff 100%);
        -webkit-mask-size: 200%;
        animation: shine 4s infinite;
    }

    /* 所有 */

    /* 展开 */
    .side-navBar:not(.el-menu--collapse) {
        width: 220px;
        border: none;
    }

    .el-submenu__title, .el-menu-item {
        margin: 5px 15px 0 10px;
        border-radius: 4px;
        line-height: 30px;
        font-weight: 600;
        padding: 10px 15px;
        white-space: nowrap;
    }

    .el-submenu__title:hover, .el-menu-item:hover {
        opacity: 1;
        background: hsla(0, 0%, 100%, .23);
    }

    .side-navBar:not(.el-menu--collapse) .el-menu-item.is-active {
        color: #fff;
        opacity: 1;
        background: hsla(0, 0%, 100%, .23);
    }

    .el-submenu__title i {
        color: #fff;
        margin-right: 10px
    }

    .el-submenu__title {
        margin: 5px 10px 0 10px;
    }
    .alone i{
        color: #fff;
        margin-right: 10px
    }

    /* 折叠 */
    .side-navBar.el-menu--collapse {
        border: none;
    }

    .side-navBar.el-menu--collapse .el-submenu {
        height: 56px;
        width: 56px;
        padding: 0;
        margin-left: 4px;
    }

    .side-navBar.el-menu--collapse .el-submenu__title {
        height: 100%;
        width: 100%;
        padding: 0 !important;
        margin: 0;
        text-align: center;
        line-height: 56px;
    }

    .side-navBar.el-menu--collapse i {
        width: 20px;
        height: 20px;
        margin-right: 0
    }

    .side-navBar.el-menu--collapse .el-menu-item.is-active {
        color: #008080
    }

    .side-navBar.el-menu--collapse .photo {
        margin-right: 0
    }

    .side-navBar.el-menu--collapse .logo {
        padding-left: 12px
    }
    .side-navBar.el-menu--collapse .alone .el-tooltip{
        padding: 10px 18px!important;
    }
    .side-navBar.el-menu--collapse .alone {
        margin: 5px 5px 0 5px;
    }
</style>



