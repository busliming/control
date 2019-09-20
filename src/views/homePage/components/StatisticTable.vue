<template>
    <el-card>
        <el-form>
            <el-row :gutter="12">
                <template v-for="(item,index) in tableContent">
                    <el-col :span="6" :key="index">
                        <el-card shadow="hover" :body-style="{ padding: '0 15px' }">
                            <el-form-item :label="item.label">
                                {{ item.val1 }}
                                <template v-if="item.val2">
                                    / {{ item.val2 }}
                                </template>
                            </el-form-item>
                        </el-card>
                    </el-col>
                </template>
            </el-row>
        </el-form>
    </el-card>
</template>

<script>
    import formatter from '@/tools/formatter'

    export default {
        props: ['data'],        // 后台返回的数据
        data() {
            return {}
        },
        methods: {
            toFixed2(val) {
                return parseFloat(val).toFixed(2) + ''
            }
        },
        computed: {
            tableData() {       // 处理后台返回的数据
                let expArr = ['People', 'Number', 'Count', 'time'];
                let data = this.data;
                for (let key in data) {
                    // let isMoney = expArr.every(exp => {
                    //     return key.indexOf(exp) === -1;             //是否金额
                    // });
                    let isDate = key.indexOf(expArr[3]) !== -1;     //是否日期
                    // if (isMoney) {      //处理金额显示
                    // data[key] = formatter.moneyFormatter(data[key])
                    // data[key] = parseFloat(data[key]).toFixed(2) + ''
                    // }
                    // else if (!isDate) {
                    //     data[key] = formatter.numberFormatter(data[key])
                    // }
                    // else
                    if (!data[key]) {
                        data[key] = isDate ? '---' : '0';
                    }
                }
                return data
            },

            tableContent() {         // 显示已处理的数据
                let d = this.tableData;
                return [
                    {
                        label: '充值金额:',
                        val1: formatter.toFixed2(d.rechargeAmount) + '元',
                        val2: d.rechargePeopleCount + '人'
                    },
                    {
                        label: '首次人数:',
                        val1: d.firstDepositPeople + '人',
                        val2: formatter.toFixed2(d.firstDepositAmount) + '元'
                    },
                    {label: '二次充值:', val1: d.twoCount + '人', val2: formatter.toFixed2(d.twoAmount) + '元'},
                    {label: '充值笔数:', val1: d.rechargeCount + '笔', val2: d.rechargePeopleCount + '人'},

                    {
                        label: '提现金额:',
                        val1: formatter.toFixed2(d.withdrawalAmount) + '元',
                        val2: d.withdrawalPeople + '人'
                    },
                    {label: '提现笔数:', val1: d.withdrawalCount + '笔', val2: d.withdrawalPeople + '人'},
                    {label: '拒绝出款:', val1: formatter.toFixed2(d.refuseAmount) + '元', val2: d.refuseNumber + '人'},
                    {
                        label: '会员余额/保险箱:',
                        val1: formatter.divideBy1000(d.memberBalance) + '元',
                        val2: formatter.divideBy1000(d.safeBalance) + '元'
                    },

                    {label: '下注金额:', val1: formatter.divideBy1000(d.betAmount2) + '元', val2: d.betAmount2Number + '人'},
                    {label: '有效下注金额:', val1: formatter.divideBy1000(d.betAmount) + '元', val2: d.betNumber + '人'},
                    {label: '下注人数:', val1: d.betNumber + '人', val2: d.betCount + '局'},
                    {label: '税收:', val1: formatter.divideBy1000(d.taxAmount) + '元', val2: d.taxNumber + '人'},

                    {label: '返利金额:', val1: formatter.divideBy1000(d.rebateAmount) + '元', val2: d.rebateNumber + '人'},
                    {
                        label: '活动优惠:',
                        val1: formatter.divideBy1000(d.activityAmount) + '元',
                        val2: d.activityNumber + '人'
                    },
                    {label: '充值时间:', val1: d.rechargetime},
                    {label: '取款时间:', val1: d.withdrawaltime}
                ]
            },
        },
    }
</script>
