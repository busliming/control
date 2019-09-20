<template>
    <div class="card-data qznn">
        <el-card style="width:28%;margin-right:5%;">
            <div slot="header" class="clearfix">
                <span>对局信息</span>
            </div>
            <el-row>
                <div class="text item">
                    会员账号：{{tabledata.account}}
                </div>
                <div class="text item">
                    游戏名称：抢庄牛牛
                </div>
                <div class="text item">
                    游戏房间：{{tabledata.roomName}}
                </div>
                <div class="text item">
                    当局桌号：{{tabledata.tableNum}}
                </div>
                <div class="text item">
                    局号：{{tabledata.tableNum}}
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
                    中奖总金额：{{tabledata.awardAmount}}
                </div>
                <div class="text item">
                    当局输赢：{{tabledata.changeAmount}}
                </div>
                <div class="text item">
                    当局税收：{{tabledata.chargeValue}}
                </div>
            </el-row>
        </el-card>
        <el-card style="width:65%">
            <div slot="header" class="clearfix">
                <span>开奖信息</span>
            </div>
            <el-table ref="dialogTable" :data="tabledata2" style="width: 100%" size="medium" stripe :cell-style="{textAlign:'center'}"
            :header-cell-style="{textAlign:'center'}" v-loading='tableloading'>
                <el-table-column label="玩家" width="190">
                    <template slot-scope="{row}">
                        {{(row.isDealer?'庄家:':'玩家:') + (row.nickName) }}
                    </template>
                </el-table-column>
                <el-table-column label="牌型">
                    <template slot-scope="{row}">
                        {{row.pokers | cardsFilter}}
                    </template>
                </el-table-column>
                <el-table-column prop="odds" label="牌型倍数"></el-table-column>
                <el-table-column prop="callType" label="倍数"></el-table-column>
                <el-table-column prop="difen" label="底分"></el-table-column>
                <el-table-column prop="winCoins" label="输赢结果"></el-table-column>
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
            tabledata2:[]
        }
    },
    created(){
        this.query()
    },
    methods:{
        //获取数据
        query(){
            this.tableloading = true
            request.getQiangeZhuangDetails({
                id:this.id,
                siteId:this.siteId
            }).then(res => {
                this.tableloading = false
                if(res.code == '200'){
                    res.data.betMoney = parseInt(res.data.betMoney/10)/100;
                    res.data.awardAmount = parseInt(res.data.awardAmount/10)/100;
                    res.data.changeAmount = parseInt(res.data.changeAmount/10)/100;
                    res.data.chargeValue = parseInt(res.data.chargeValue/10)/100;
                    this.tabledata = res.data
                    
                    for(var item of res.data.patterns){
                        if(!item.isDealer){  //不是庄
                            item.callType = item.betOdds
                        }
                        item.difen = parseInt(res.data.difen/10)/100;
                        item.winCoins = parseInt(item.winCoins/10)/100;
                    }
                    this.tabledata2 = res.data.patterns
                }
                else {
                    this.$notify.error({title:res.msg});
                }
            })
        },
    },
    filters:{
        cardsFilter(value){ 
            let color = {
                0:'方块',
                1:'梅花',
                2:'红桃',
                3:'黑桃',
            }
            let num = {
                1:'A',
                2:'2',
                3:'3',
                4:'4',
                5:'5',
                6:'6',
                7:'7',
                8:'8',
                9:'9',
                10:'10',
                11:'J',
                12:'Q',
                13:'K',
            }
            let arr = [];
            value.map( item => {
                arr.push(color[item[0]]+num[item[1]]);
            })
            return arr.join(',');
        },
    }
}
</script>

<style>
.qznn{display: flex}
</style>


