<template>
    <div class="card-data bcbm">
        <el-card style="width:25%;margin-right:5%;">
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
                    是否上庄：{{tabledata.isHost == 'true' ? '是' : '否'}}
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
        </el-card >
        <el-card style="width:65%">
            <div slot="header" class="clearfix">
                <span>下注信息</span>
                <span style="float: right; padding: 3px 0" type="text">开奖情况：{{tabledata.reward}}</span>
            </div>
            <el-table ref="dialogTable" :data="tabledata.betInfoList" style="width: 100%" size="medium" stripe :cell-style="{textAlign:'center'}"
            :header-cell-style="{textAlign:'center'}" v-loading='tableloading'>
                <el-table-column prop="num0" label="保时捷x40"></el-table-column>
                <el-table-column prop="num1" label="保时捷x5"></el-table-column>
                <el-table-column prop="num2" label="宝马x30"></el-table-column>
                <el-table-column prop="num3" label="宝马x5"></el-table-column>
                <el-table-column prop="num4" label="奔驰x20"></el-table-column>
                <el-table-column prop="num5" label="奔驰x5"></el-table-column>
                <el-table-column prop="num6" label="大众x10"></el-table-column>
                <el-table-column prop="num7" label="大众x5"></el-table-column>
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
        }
    },
    created(){
        this.query()
    },
    methods:{
        //获取数据
        query(){
            this.tableloading = true
            request.getBenzBmwDetails({
                id:this.id,
                siteId:this.siteId
            }).then(res => {
                this.tableloading = false
                if(res.code == '200'){
                    var list1 = ['保时捷x40','保时捷x5','宝马x30','宝马x5','奔驰x20','奔驰x5','大众x10','大众x5',]
                    res.data.reward = list1[res.data.reward]
                    var list2 = [{ num0:'',num1:'',num2:'',num3:'',num4:'',num5:'',num6:'',num7:''}]
                    for(var i = 0; i<res.data.betInfoList.length; i++){
                        list2[0]['num'+ i] = parseInt(res.data.betInfoList[i].selfBet/10)/100;
                    }
                    res.data.betInfoList = list2

                    res.data.betMoney = parseInt(res.data.betMoney/10)/100;
                    res.data.lotteryMoney = parseInt(res.data.lotteryMoney/10)/100;
                    res.data.selfResult = parseInt(res.data.selfResult/10)/100;
                    res.data.tax = parseInt(res.data.tax/10)/100;
                    this.tabledata = res.data
                }
                else {
                    this.$notify.error({title:res.msg});
                }
            })
        },
    }
}
</script>

<style>
.bcbm{display: flex}
</style>

