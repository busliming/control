<template>
    <div class="card-data dz">
        <el-card style="width:25%;margin-right:5%;">
            <div slot="header" class="clearfix">
                <span>对局信息</span>
            </div>
            <el-row>
                <div class="text item">
                    会员账号：{{formdata.account}}
                </div>
                <div class="text item">
                    游戏名称：{{formdata.createBy}}
                </div>
                <div class="text item">
                    游戏房间：{{formdata.gameRoomName}}
                </div>
                <div class="text item">
                    当局桌号：{{formdata.tableNumber}}
                </div>
                <div class="text item">
                    局号：{{formdata.gameCode}}
                </div>
                <div class="text item">
                    底分：{{formdata.minBetBlind}}
                </div>
                <div class="text item">
                    开始时间：{{formdata.startTime}}
                </div>
                <div class="text item">
                    结束时间：{{formdata.endTime}}
                </div>
                <div class="text item">
                    下注金额：{{formdata.betMoney}}
                </div>
                <div class="text item">
                    中奖总金额：{{formdata.lotteryMoney}}
                </div>
                <div class="text item">
                    当局输赢：{{formdata.changeAmount}}
                </div>
                <div class="text item">
                    当局税收：{{formdata.tax}}
                </div>
            </el-row>
        </el-card>
        <el-card style="width:65%">
            <div slot="header" class="clearfix">
                <span>牌型</span>
                <span style="float: right; padding: 3px 0" type="text">底池牌型：{{formdata.s3}}</span>
            </div>
            <el-table ref="dialogTable" :data="tabledata" style="width: 100%" size="medium" stripe :cell-style="{textAlign:'center'}"
            :header-cell-style="{textAlign:'center'}" v-loading='tableloading'>
                <el-table-column label="开奖源">
                    <template slot-scope="{row}">
                        {{row.isMyself?'我的':'玩家'}}
                    </template>
                </el-table-column>
                <el-table-column label="牌型">
                    <template slot-scope="{row}">
                        {{row.playerPoker}}
                    </template>
                </el-table-column>
                <el-table-column prop="betMoney" label="下注金额" sortable></el-table-column>
                <el-table-column prop="winMoney" label="输赢金额" sortable></el-table-column>
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
            formdata:{}
        }
    },
    created(){
        this.query()
    },
    methods:{
        //获取数据
        query(){
            this.tableloading = true
            request.getTexasPokerDetails({
                id:this.id,
                siteId:this.siteId
            }).then(res => {
                console.log(res)
                this.tableloading = false
                if(res.code == '200'){
                    this.formdata = res.data
                    this.tabledata = res.data.playerRecordDetailed
                    var s3 = this.displayCards(res.data.tablePoker)
                    this.formdata.s3 = s3
                    for(var item of this.tabledata){
                        item.playerPoker = this.displayCards(item.playerPoker)
                    }
                }
                else {
                    this.$notify.error({title:res.msg});
                }
            })
        },
        displayCards(value) {
            let arr = [];
            let color = {
                1:'黑桃',
                2:'红桃',
                3:'梅花',
                4:'方块',
            }
            let num = {
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
                14:'A',
            }
            if(value){
                value.map(item => {
                    arr.push(color[item.color]+num[item.num])
                })
            }
            return arr.join(",");
        },
    }
}
</script>

<style>
.dz{display: flex}
</style>

