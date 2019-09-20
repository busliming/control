<template>
    <div class="layout">
        <side-nav-bar :windowWidth="windowWidth"></side-nav-bar>
        <div class="right-section" :style="{width: rightWidth}">
            <header-nav-bar></header-nav-bar>
            <main-contents></main-contents>
        </div>
    </div>
</template>

<script>
    import headerNavBar from './LayoutComponents/HeaderNavBar';
    import sideNavBar from './LayoutComponents/SideNavBar';
    import mainContents from './LayoutComponents/MainContents'
    import setTableHeight from  '@/tools/tableHeight'
    import request from '@/requests/login'

    export default {
        name: 'layout',
        components: {
            headerNavBar, sideNavBar, mainContents
        },
        data() {
            return {
                windowWidth: 1600,
            }
        },
        computed: {
            rightWidth() {
                if (this.windowWidth > 1200) {
                    return (this.windowWidth < 1600) ? 'calc(100% - 64px)' : 'calc(100% - 220px)';
                } else {
                    return '1140px'
                }

            }
        },
        methods: {
            getWindowWidth() {
                this.windowWidth = document.documentElement.clientWidth;
            },
        },
        created() {
            this.getWindowWidth();
            this.$nextTick(function () {
                window.addEventListener('resize', this.getWindowWidth);
                setTableHeight(this)
            });
        }
    }
</script>

<style lang="scss">

    .layout {
        min-width: 1200px;
        display: -webkit-box;
        flex-flow: row wrap;
        background: url('~@/assets/bg-img.jpg') no-repeat;
        background-size: cover;
        .right-section {

        }
    }
</style>
