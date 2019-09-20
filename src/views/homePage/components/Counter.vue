<template>
    <div class="count" :class="classObj">
        <div class="inner">
            <p>
                {{title}}
                <el-tooltip
                        v-if="tips" :content="tips"
                        class="item" effect="dark"
                        placement="top"
                >
                    <i class="el-icon-info"/>
                </el-tooltip>
            </p>
            <p>￥{{value | moneyFormatter}}</p>
            <p>{{bottomLabel}} <span>¥{{average | moneyFormatter}}</span></p>
        </div>
    </div>
</template>

<script>
    // import formatter from '@/tools/formatter'

    export default {
        props: ['className', 'title', 'tips', 'value', 'average', 'bottomLabel'],
        data() {
            return {
                classObj: {}
            }
        },
        filters: {
            moneyFormatter(val) {
                val = parseFloat(val);
                return val ? val.toFixed(2) + '' : '0.00'
            }
        },
        created() {
            this.classObj[this.className] = true;
        }
    }
</script>
