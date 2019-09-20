<template>
    <div class="card-data qzpj">
        <el-card style="width:30%;margin-right:4.5%;">
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
                    当局桌号：{{tabledata.tableNumber}}
                </div>
                <div class="text item">
                    局号：{{tabledata.gameCode}}
                </div>
                <div class="text item">
                    下注金额：{{tabledata.betMoney}}
                </div>
                <div class="text item">
                    开始时间：{{tabledata.startTime}}
                </div>
                <div class="text item">
                    结束时间：{{tabledata.endTime}}
                </div>
                <div class="text item">
                    中奖总金额：{{tabledata.lotteryMoney}}
                </div>
                <div class="text item">
                    当局输赢：{{tabledata.result}}
                </div>
                <div class="text item">
                    当局税收：{{tabledata.chargeValue}}
                </div>
            </el-row>
        </el-card>
        <el-card style="width:65%">
            <div slot="header" class="clearfix">
                <span>对局详情</span>
            </div>
            <el-table ref="dialogTable" :data="tabledata2" style="width: 100%" size="medium" stripe :cell-style="{textAlign:'center'}"
            :header-cell-style="{textAlign:'center'}" v-loading='tableloading'>
                <el-table-column label="玩家名称">
                    <template slot-scope="{row}">
                        {{(row.dealer ? '庄家:':'玩家:') + (row.playerName) }}
                    </template>
                </el-table-column>
                <el-table-column label="牌型">
                    <template slot-scope="{row}">
                        {{row.pokers[0].name +','+ row.pokers[1].name}}
                    </template>
                </el-table-column>
                <el-table-column prop="roomField" label="底分" sortable></el-table-column>
                <el-table-column prop="multiple" label="抢庄倍数" sortable>
                    <template slot-scope="{row}">
                        <span v-if="row.dealer">{{row.multiple}}</span>
                        <span v-else>-</span>
                    </template>
                </el-table-column>
                <el-table-column prop="betOdds" label="下注倍数" sortable>
                    <template slot-scope="{row}">
                        <span v-if="!row.dealer">{{row.multiple}}</span>
                        <span v-else>-</span>
                    </template>
                </el-table-column>
                <el-table-column prop="result" label="输赢结果" sortable></el-table-column>
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
            tabledata2:[],
        }
    },
    created(){
        this.query()
    },
    methods:{
        //获取数据
        query(){
            this.tableloading = true
            request.getQZPJDetails({
                id:this.id,
                siteId:this.siteId
            }).then(res => {
                this.tableloading = false
                if(res.code == '200'){
                    res.data.lotteryMoney = parseInt(res.data.lotteryMoney/10)/100;
                    res.data.result = parseInt(res.data.result/10)/100;
                    res.data.chargeValue = parseInt(res.data.chargeValue/10)/100;
                    this.tabledata = res.data
                    var arr = []
                    arr.push(res.data.selfInfo)
                    this.tabledata2 = arr.concat(res.data.otherInfos)
                    for(var item of this.tabledata2){
                        item.roomField = parseInt(item.roomField/10)/100;
                        item.result = parseInt(item.result/10)/100;
                    }
                }
                else {
                    this.$notify.error({title:res.msg});
                }
            })
        },
    },
}
</script>

<style>
.qzpj{display: flex}
</style>


