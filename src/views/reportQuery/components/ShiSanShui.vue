<template>
    <div class="card-data sss">
        <el-card style="width:32%;margin-right:5%;">
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
                    底分：{{tabledata.bottomScore}}
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
                    当局输赢：{{tabledata.selfResult}}
                </div>
                <div class="text item">
                    当局税收：{{tabledata.tax}}
                </div>
            </el-row>
        </el-card>
        <el-card style="width:63%">
            <div slot="header" class="clearfix">
                <span>牌型</span>
            </div>
            <el-table ref="dialogTable" :data="list1" style="width: 100%" size="medium" stripe :cell-style="{textAlign:'center'}"
            :header-cell-style="{textAlign:'center'}" v-loading='tableloading'>
                <el-table-column label="开奖源" sortable>
                    <template slot-scope="{row,$index}">
                        {{$index === 0?'我的':'玩家'}}
                    </template>
                </el-table-column>
                <el-table-column label="开奖牌型">
                    <template slot-scope="{row}">
                        <template v-if="row.specialCombination > -1">
                            <el-row>{{row.specialCombination | displayCards}}</el-row>
                            <el-row>{{row.totalScore}}</el-row>
                        </template>
                        <template v-else>
                            <el-row>头墩{{row.headCards.totalScore}}：{{row.headCards.cards | cardsFilter}}</el-row>
                            <el-row>中头墩{{row.middleCards.totalScore}}：{{row.middleCards.cards | cardsFilter}}</el-row>
                            <el-row>尾墩{{row.lastCards.totalScore}}：{{row.lastCards.cards | cardsFilter}}</el-row>
                            <el-row>总计{{row.totalScore}}</el-row>
                        </template>
                    </template>
                </el-table-column>
                <el-table-column label="结果">
                    <template slot-scope="{row,$index}">
                        <template v-if="$index > 0">{{row.result}}</template>
                        <template v-else>{{tabledata.selfResult}}</template>
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
            list1:[],
        }
    },
    created(){
        this.query()
    },
    methods:{
        //获取数据
        query(){
            this.tableloading = true
            request.getThirteenDetails({
                id:this.id,
                siteId:this.siteId
            }).then(res => {
                console.log(res)
                this.tableloading = false
                if(res.code == '200'){
                    this.tabledata = res.data
                    this.list1.push(res.data.myPokerInf);
                    this.list1 = this.list1.concat(res.data.otherInfo);
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
                0:'黑桃',
                1:'红桃',
                2:'梅花',
                3:'方块',
            }
            let num = {
                0:'A',
                1:'2',
                2:'3',
                3:'4',
                4:'5',
                5:'6',
                6:'7',
                7:'8',
                8:'9',
                9:'10',
                10:'J',
                11:'Q',
                12:'K',
            }
            let arr = [];
            value.map( item => {
                arr.push(color[item[0]]+num[item[1]]);
            })
            return arr.join(',');
        },
        displayCards(value) {  
            let num = {
                0:'三顺子',
                1:'三同花',
                2:'六对半',
                3:'五对四冲',
                4:'四套冲三',
                5:'全黑',
                6:'全红',
                7:'全小',
                8:'全大',
                9:'三套炸弹',
                10:'一条龙',
                11:'十二皇族',
                12:'一条龙',
                13:'清龙',
            }
            return num[value];
        },
    }
}
</script>

<style>
.sss{display: flex}
</style>


