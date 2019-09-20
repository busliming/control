<template>
    <div class="card-data brnn" style="">
        <el-card style="width:30%;float:left;margin-right:5%">
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
                    是否上庄：{{tabledata.isBanker == 'true' ? '是' : '否'}}
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
                    当局输赢：{{tabledata.myAmount}}
                </div>
                <div class="text item">
                    当局税收：{{tabledata.dutyAmount}}
                </div>
            </el-row>
        </el-card>
        <div style="width:65%;float:left">
            <el-card style="width:100%;height:32%">
                <div slot="header" class="clearfix">
                    <span>下注信息</span>
                </div>
                <el-table ref="dialogTable" :data="tabledata.smallList" style="width: 100%" size="medium" stripe :cell-style="{textAlign:'center'}"
                :header-cell-style="{textAlign:'center'}" v-loading='tableloading'>
                    <el-table-column prop="num1" label="天" sortable></el-table-column>
                    <el-table-column prop="num2" label="地" sortable></el-table-column>
                    <el-table-column prop="num3" label="玄" sortable></el-table-column>
                    <el-table-column prop="num4" label="黄" sortable></el-table-column>
                </el-table>
            </el-card>
            <el-card style="width:100%;height:65%">
                <div slot="header" class="clearfix">
                    <span>开奖信息</span>
                </div>
                <el-table ref="dialogTable" :data="tabledata.openLotteryDayList" style="width: 100%" size="medium" stripe :cell-style="{textAlign:'center'}"
                :header-cell-style="{textAlign:'center'}" v-loading='tableloading'>
                    <el-table-column prop="word" label="开奖源" sortable></el-table-column>
                    <el-table-column prop="cards" label="牌型" :formatter="displayCards" sortable></el-table-column>
                    <el-table-column prop="fold" label="倍数" sortable></el-table-column>
                    <el-table-column prop="win" label="结果" sortable>
                        <template slot-scope="scope">    
                            <el-tag v-if="scope.row.win === true" type="success">赢</el-tag>
                            <el-tag v-else-if="scope.row.win === false" type="danger">输</el-tag>
                            <span v-else>-</span>
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
        }
    },
    created(){
        this.query()
    },
    methods:{
        //获取数据
        query(){
            this.tableloading = true
            request.getBaiRenNiuNiuDetails({
                id:this.id,
                siteId:this.siteId
            }).then(res => {
                this.tableloading = false
                if(res.code == '200'){
                    var list1 = ["庄","天","地","玄","黄"]
                    var list2 = [{
                        num1:'',num2:'',num3:'',num4:'',
                    }]
                    for(var i = 0; i<res.data.openLotteryDayList.length;i++){
                        res.data.openLotteryDayList[i].word = list1[i]
                        list2[0]['num'+ i] = parseInt(res.data.openLotteryDayList[i].myBet/10)/100;
                    }
                    res.data.smallList = list2

                    res.data.betMoney = parseInt(res.data.betMoney/10)/100;
                    res.data.lotteryMoney = parseInt(res.data.lotteryMoney/10)/100;
                    res.data.myAmount = parseInt(res.data.myAmount/10)/100;
                    res.data.dutyAmount = parseInt(res.data.dutyAmount/10)/100;
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
                if (row.cards[k][0] == 0) {            
                    cards += '方块'        
                }else if (row.cards[k][0] == 1) {
                    cards += '梅花'        
                }else if (row.cards[k][0] == 2) {            
                    cards += '红桃'        
                }else if (row.cards[k][0] == 3) {            
                    cards += '黑桃'        
                }        
                // A ~ K        
                if (row.cards[k][1] == 11) {            
                    cards += 'J';        
                }else if (row.cards[k][1] == 12) {            
                    cards += 'Q';        
                }else if (row.cards[k][1] == 13) {            
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



