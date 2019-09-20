<template>
    <div :class="['tab-item',{'active':item.name === activeTab.name}]"
         @click="clickHandle(item)"
    >
        {{item.name}}
        <i @click.stop="closeHandle(item)"
           class="el-icon-circle-close"
           v-if="item.name!=='首页'||index>0"
        ></i>
    </div>
</template>

<script>
    export default {
        props: ['item', 'index'],
        data() {
            return {}
        },
        computed: {
            activeTab() {
                return this.$store.getters.activeItem
            }
        },
        methods: {
            clickHandle(item) {
                this.$router.push(item);
                this.$store.dispatch('addNavItem', item)
                    .catch();
            },
            closeHandle(item) {
                this.$store.dispatch('removeNavItem', item)
                    .catch();
            }
        },
        created() {
        }
    }
</script>
