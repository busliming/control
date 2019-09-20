<template>
    <div class="card-data yyy" style="height:calc(100vh - 300px)">
        <el-card style="width:25%;margin-right:5%;height:100%">
            <div slot="header" class="clearfix">
                <span>对局信息</span>
            </div>
            <el-row>
                <div class="text item">
                    会员账号：{{tabledata.account}}
                </div>
                <div class="text item">
                    游戏名称：{{tabledata.createBy}}
                </div>
                <div class="text item">
                    游戏房间：{{tabledata.roomName}}
                </div>
                <div class="text item">
                    当局桌号：{{tabledata.tableNumber}}
                </div>
                <div class="text item">
                    局号：{{tabledata.gameCode}}
                </div>
                <div class="text item">
                    是否上庄：{{tabledata.isDealer == 'true' ? '是' : '否' }}
                </div>
                <div class="text item">
                    开始时间：{{tabledata.startTime}}
                </div>
                <div class="text item">
                    结束时间：{{tabledata.endTime}}
                </div>
                <div class="text item">
                    下注金额：{{tabledata.betMoney}}
                </div>
                <div class="text item">
                    中奖总金额：{{tabledata.lotteryMoney}}
                </div>
                <div class="text item">
                    当局输赢：{{tabledata.win}}
                </div>
                <div class="text item">
                    当局税收：{{tabledata.tax}}
                </div>
            </el-row>
        </el-card>
        <el-card style="width:65%;height:100%">
            <div slot="header" class="clearfix">
                <span>下注信息</span>
                <span style="float: right; padding: 3px 0" type="text">开奖情况：{{tabledata.zhongjiang}}</span>
            </div>
            <el-table ref="dialogTable" :data="tabledata.detailList" style="width: 100%" max-height="520" size="medium" stripe :cell-style="{textAlign:'center'}"
            :header-cell-style="{textAlign:'center'}" v-loading='tableloading'>
                <el-table-column prop="chipPoolIndex" :formatter="displayChipPoolIndex" label="盘口" sortable></el-table-column>
                <el-table-column prop="odd" label="赔率" sortable></el-table-column>
                <el-table-column prop="me" label="金币数量" sortable></el-table-column>
                <el-table-column prop="result" label="结果" sortable>
                    <template slot-scope="scope">
                        <el-tag type="success" v-if="scope.row.result=='true'">中</el-tag>
                        <el-tag type="danger" v-else>未中</el-tag>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script>
import request from '@/requests/reportQuery'

export default {
    data(){
        return{
            id:this.$route.params.id,
            siteId:this.$route.params.siteId,
            tabledata:[],
            tableloading:false,
            chipPoolIndexExp:  [  
                '单', '111', '222', '333', '444', '555', '666', '双', '小', '任意豹子', '大', '总和4',
                '总和5', '总和6', '总和7', '总和8', '总和9', '总和10', '总和11', '总和12', '总和13', '总和14',
                '总和15', '总和16', '总和17', '出现1', '出现2', '出现3', '出现4', '出现5', '出现6'
            ],
        }
    },
    created(){
        this.query()
    },
    methods:{
        //获取数据
        query(){
            this.tableloading = true
            request.getShakeOneShakeDetails({
                id:this.id,
                siteId:this.siteId
            }).then(res => {
                console.log(res)
                this.tableloading = false
                if(res.code == '200'){
                    this.tabledata = res.data
                    var s2 = ''
                    for (let i in res.data.openLotteryInfo) {
                        if (i > 0) {
                            s2 += ', '
                        }
                        s2 += res.data.openLotteryInfo[i];
                    }
                    res.data.zhongjiang = s2
                }
                else {
                    this.$notify.error({title:res.msg});
                }
            })
        },
        displayChipPoolIndex(row) {
            let str = this.chipPoolIndexExp;
            for (let i in str) {
                if (row.chipPoolIndex == i) {
                    return str[i];
                }
            }
        },
    }
}
</script>

<style>
.yyy{display: flex}
</style>
