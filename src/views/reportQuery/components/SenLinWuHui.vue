<template>
    <div class="card-data">
        <el-card style="width:30%;margin-right:4.5%;float:left">
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
                    当局输赢：{{tabledata.changeAmount}}
                </div>
                <div class="text item">
                    当局税收：{{tabledata.chargeValue}}
                </div>
            </el-row>
        </el-card>
        <el-card style="width:65%">
            <div slot="header" class="clearfix">
                <span>下注信息</span>
            </div>
            <el-table ref="dialogTable" :data="tabledata2" style="width: 100%" size="medium" stripe :cell-style="{textAlign:'center'}"
            :header-cell-style="{textAlign:'center'}" v-loading='tableloading'>
                <el-table-column prop="targetName" label="盘口"></el-table-column>
                <el-table-column prop="odds" label="赔率"></el-table-column>
                <el-table-column prop="allTargetBet" label="总下注"></el-table-column>
                <el-table-column prop="myTargetBet" label="我的下注"></el-table-column>
                <el-table-column prop="myTargetWin" label="我的输赢">
                    <template slot-scope="{row}">
                        <el-tag type="success" v-if="row.myTargetWin > 0">{{row.myTargetWin}}</el-tag>
                        <el-tag type="danger" v-else-if="row.myTargetWin < 0">{{row.myTargetWin}}</el-tag>
                        <el-tag type="info" v-else>{{row.myTargetWin}}</el-tag>
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
            request.getForestDanceDetails({
                id:this.id,
                siteId:this.siteId
            }).then(res => {
                console.log(res)
                this.tableloading = false
                if(res.code == '200'){
                    this.tabledata = res.data
                    this.tabledata2 = res.data.details
                }
                else {
                    this.$notify.error({title:res.msg});
                }
            })
        },
    }
}
</script>
