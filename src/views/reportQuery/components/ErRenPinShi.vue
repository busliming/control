<template>
    <div class="card-data erps">
        <el-card style="width:35%;margin-right:5%;">
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
                    当局底分：{{tabledata.antBets}}
                </div>
                <div class="text item">
                    叫庄倍数：{{tabledata.betOdd}}
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
                    中奖金额：{{tabledata.lotteryMoney}}
                </div>
                <div class="text item">
                    当局输赢：{{tabledata.win ? '赢' : '输'}}
                </div>
                <div class="text item">
                    当局税收：{{tabledata.tax}}
                </div>
            </el-row>
        </el-card>
        <el-card>
            <div slot="header" class="clearfix">
                <span>牌型信息</span>
            </div>
            <el-table ref="dialogTable" :data="list1" style="width: 100%" size="medium" stripe :cell-style="{textAlign:'center'}"
            :header-cell-style="{textAlign:'center'}" v-loading='tableloading'>
                <el-table-column prop="type" label="开奖源"></el-table-column>
                <el-table-column prop="cards" label="牌型" :formatter="displayCards"></el-table-column>
                <el-table-column prop="odds" label="倍数"></el-table-column>
                <el-table-column prop="isWin" label="结果">
                    <template slot-scope="scope">
                        <el-tag v-if="scope.row.isWin == true" type="success">赢</el-tag>
                        <el-tag v-else-if="scope.row.isWin == false" type="danger">输</el-tag>
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
            request.getTwoPeopleTenDetails({
                id:this.id,
                siteId:this.siteId
            }).then(res => {
                this.tableloading = false
                if(res.code == '200'){
                    this.list1 = [
                        {type:'我的', pokers:res.data.myPokerList.pokers, odds:res.data.myPokerList.odds, isWin:res.data.myPokerList.win},
                        {type:'对家', pokers:res.data.otherPokerList.pokers, odds:res.data.otherPokerList.odds, isWin:res.data.otherPokerList.win}
                    ]
                    res.data.win = res.data.myPokerList.win
                    
                    res.data.betMoney = parseInt(res.data.betMoney/10)/100;
                    res.data.lotteryMoney = parseInt(res.data.lotteryMoney/10)/100;
                    res.data.tax = parseInt(res.data.tax/10)/100;
                    this.tabledata = res.data
                }
                else {
                    this.$notify.error({title:res.msg});
                }
            })
        },
        displayCards(row) {    
            let cards = '';    
            for (let k in row.pokers) {        
                if (k > 0) {            
                    cards += ', '        
                }        
                //花色        
                if (row.pokers[k][0] == 0) {            
                    cards += '方块'        
                }        
                else if (row.pokers[k][0] == 1) {            
                    cards += '梅花'        
                }        
                else if (row.pokers[k][0] == 2) {            
                    cards += '红桃'        
                }        
                else if (row.pokers[k][0] == 3) {            
                    cards += '黑桃'        
                }        
                //A ~ K 
                if (row.pokers[k][1] == 11) {            
                    cards += 'J';        
                }        
                else if (row.pokers[k][1] == 12) {            
                    cards += 'Q';        
                }        
                else if (row.pokers[k][1] == 13) {            
                    cards += 'K';        
                } 
                if (row.cards[k][1] == 1) {            
                    cards += 'A';        
                } else {            
                    cards += row.pokers[k][1]    
                }    
            }    
            return cards;
        },
    }
}
</script>

<style>
.erps{display: flex}
</style>


