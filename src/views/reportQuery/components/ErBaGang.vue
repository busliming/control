<template>
    <div class="card-data ebg">
        <el-card style="width:30%;margin-right:5%;">
            <div slot="header" class="clearfix">
                <span>对局信息</span>
            </div>
            <el-row>
                <div class="text item">
                    会员账号：{{tabledata.account}}
                </div>
                <div class="text item">
                    会员id：{{tabledata.accountId}}
                </div>
                <div class="text item">
                    游戏名称：{{tabledata.createBy}}
                </div>
                <div class="text item">
                    游戏房间：{{tabledata.roomName}}
                </div>
                <div class="text item">
                    局号：{{tabledata.gameCode}}
                </div>
                <div class="text item">
                    开始时间：{{tabledata.startTime}}
                </div>
                <div class="text item">
                    结束时间：{{tabledata.endTime}}
                </div>
                <div class="text item">
                    当局底分：{{tabledata.bottomScore}}
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
                <span>开奖信息</span>
            </div>
            <el-table ref="dialogTable" :data="tabledata2" style="width: 100%" size="medium" stripe :cell-style="{textAlign:'center'}"
            :header-cell-style="{textAlign:'center'}" v-loading='tableloading'>
                <el-table-column label="玩家名称">
                    <template slot-scope="{row}">
                        {{(row.isDealer?'庄家:':'玩家:') + (row.playerName) }}
                    </template>
                </el-table-column>
                <el-table-column label="牌型">
                    <template slot-scope="{row}">
                        {{row.cards | cardsFilter}}
                    </template>
                </el-table-column>
                <el-table-column prop="callAmount" label="抢庄倍数"></el-table-column>
                <el-table-column prop="betAmount" label="下注倍数"></el-table-column>
                <el-table-column prop="winLose" label="输赢结果"></el-table-column>
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
            request.getEBGDetails({
                id:this.id,
                siteId:this.siteId
            }).then(res => {
                this.tableloading = false
                if(res.code == '200'){
                    res.data.bottomScore = parseInt(res.data.bottomScore/10)/100;
                    res.data.result = parseInt(res.data.result/10)/100;
                    res.data.chargeValue = parseInt(res.data.chargeValue/10)/100;
                    this.tabledata = res.data
                    
                    for(var item of res.data.details[0].playerInfo){
                        item.winLose = parseInt(item.winLose/10)/100;
                        item.callAmount = parseInt(item.callAmount/10)/100;
                        item.betAmount = parseInt(item.betAmount/10)/100;
                        if(!item.isDealer){
                            item.callAmount = 0
                        }else{
                            item.betAmount = '-'
                        }
                    }
                    this.tabledata2 = res.data.details[0].playerInfo
                }
                else {
                    this.$notify.error({title:res.msg});
                }
            })
        },
    },
    filters:{
        cardsFilter(value){
            let num = {
                0:'白板',
                1:'一筒',
                2:'二筒',
                3:'三筒',
                4:'四筒',
                5:'五筒',
                6:'六筒',
                7:'七筒',
                8:'八筒',
                9:'九筒',
            }
            let str = num[value[0]]+','+num[value[1]]
            return str
        },
    }
}
</script>

<style>
.ebg{display: flex}
</style>


