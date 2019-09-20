<template>
    <div class="card-data hhdz" style="height:calc(100vh - 350px)">
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
                    是否上庄：{{tabledata.totalBet == 0  ? '是' : '否'}}
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
                    当局输赢：{{tabledata.mylose}}
                </div>
                <div class="text item">
                    当局税收：{{tabledata.tax}}
                </div>
            </el-row>
        </el-card>
        <div style="width:65%;height:100%">
            <el-card style="width:100%;height:35%">
                <div slot="header" class="clearfix">
                    <span>下注信息</span>
                </div>
                <el-table ref="dialogTable" :data="list1" style="width: 100%" size="medium" stripe :cell-style="{textAlign:'center'}"
                :header-cell-style="{textAlign:'center'}" v-loading='tableloading'>
                    <el-table-column prop="Cap" label="王子战士" sortable></el-table-column>
                    <el-table-column prop="Prin" label="公主战士" sortable></el-table-column>
                    <el-table-column prop="Lucky" label="幸运一击" sortable></el-table-column>
                </el-table>
            </el-card>
            <el-card style="width:100%;height:62%">
                <div slot="header" class="clearfix">
                    <span>开奖信息</span>
                </div>
                <el-table ref="dialogTable" :data="list2" style="width: 100%" size="medium" stripe :cell-style="{textAlign:'center'}"
                :header-cell-style="{textAlign:'center'}" v-loading='tableloading'>
                    <el-table-column prop="type" label="开奖源" sortable></el-table-column>
                    <el-table-column prop="cards" label="牌型" :formatter="displayCards" sortable></el-table-column>
                    <el-table-column prop="cardtype" label="倍数" sortable></el-table-column>
                    <el-table-column prop="result" label="结果" sortable>
                        <template slot-scope="scope">
                            <el-tag v-if="scope.row.result" type="success">中</el-tag>
                            <el-tag v-else type="danger">未中</el-tag>
                        </template>
                    </el-table-column>
                </el-table>
            </el-card>
        </div>
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
            list2:[],
        }
    },
    created(){
        this.query()
    },
    methods:{
        //获取数据
        query(){
            this.tableloading = true
            request.getRedBlackWarDetails({
                id:this.id,
                siteId:this.siteId
            }).then(res => {
                this.tableloading = false
                if(res.code == '200'){
                    res.data.betMoney = parseInt(res.data.betMoney/10)/100;
                    res.data.lotteryMoney = parseInt(res.data.lotteryMoney/10)/100;
                    res.data.mylose = parseInt(res.data.mylose/10)/100;
                    res.data.tax = parseInt(res.data.tax/10)/100;
                    res.data.playerInCaptian = parseInt(res.data.playerInCaptian/10)/100;
                    res.data.playerInPrinces = parseInt(res.data.playerInPrinces/10)/100;
                    res.data.playerInLucky = parseInt(res.data.playerInLucky/10)/100;

                    this.list1 = [{
                        Cap:res.data.playerInCaptian,
                        Prin:res.data.playerInPrinces,
                        Lucky:res.data.playerInLucky
                    }]
                    this.list2 = [
                        {type: '王子战士', cards: res.data.cardList.princeCard, result: '',cardtype:1},
                        {type: '公主战士', cards: res.data.cardList.princessCard, result: '',cardtype:1},
                        {type: '幸运一击', cards: res.data.cardList.luckyCardList, result: '',cardtype:res.data.cardType}
                    ]
                    for (let i in this.list2) {
                        this.list2[i].result = res.data.hitBetArea[0]-1 == i ? true : false
                    }
                    if (res.data.hitBetArea.length < 2) {
                        this.list2.splice(2,1) 
                    }

                    this.tabledata = res.data
                }
                else {
                    this.$notify.error({title:res.msg});
                }
            })
        },
        displayCards(row) {    
            let cards = '';    
            for (let k in row.cards) {        
                if (k > 0) {            
                    cards += ', '        
                }        
                //花色        
                if (row.cards[k][0] == 3) {            
                    cards += '黑桃'        
                } else if (row.cards[k][0] == 2) {            
                    cards += '红桃'        
                } else if (row.cards[k][0] == 1) {            
                    cards += '梅花'        
                } else if (row.cards[k][0] == 0) {            
                    cards += '方块'
                }        
                // A ~ K       
                if (row.cards[k][1] == 1) {            
                    cards += 'A';        
                }        
                else if (row.cards[k][1] == 11) {            
                    cards += 'J';        
                }        
                else if (row.cards[k][1] == 12) {            
                    cards += 'Q';        
                }        
                else if (row.cards[k][1] == 13) {            
                    cards += 'K';        
                } else {            
                    cards += row.cards[k][1]
                }    
            }    
            return cards;
        },
    }
}
</script>

<style>
.hhdz{display: flex}
</style>

