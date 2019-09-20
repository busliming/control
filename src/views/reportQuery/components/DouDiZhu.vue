<template>
    <div class="card-data">
        <el-card>
            <div slot="header" class="clearfix">
                <span>对局信息</span>
            </div>
            <el-row>
                <el-col :span="15">
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
                        当局底分：{{tabledata.baseScore}}
                    </div>
                    <div class="text item">
                        初始倍数：{{tabledata.initMul}}
                    </div>
                </el-col>
                <el-col :span="9">
                    <div class="text item">
                        开始时间：{{tabledata.startTime}}
                    </div>
                    <div class="text item">
                        结束时间：{{tabledata.endTime}}
                    </div>
                    <div class="text item">
                        叫地主：{{tabledata.landLord}}
                    </div>
                    <div class="text item">
                        下注金额：{{tabledata.betMoney}}
                    </div>
                    <div class="text item">
                        中奖总金额：{{tabledata.lotteryMoney}}
                    </div>
                    <div class="text item">
                        当局输赢：{{tabledata.winOrLose}}
                    </div>
                    <div class="text item">
                        当局税收：{{tabledata.taxValue}}
                    </div>
                </el-col>
            </el-row>
        </el-card>
        <el-card>
            <div slot="header" class="clearfix">
                <span>翻倍信息</span>
            </div>
            <el-row>
                <el-col :span="12">
                    <div class="text item">
                        炸弹：{{tabledata.boom}}
                    </div>
                    <div class="text item">
                        春天：{{tabledata.spring}}
                    </div>
                </el-col>
            </el-row>
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
            request.getDouDiZhuDetails({
                id:this.id,
                siteId:this.siteId
            }).then(res => {
                this.tableloading = false
                if(res.code == '200'){
                    res.data.baseScore = parseInt(res.data.baseScore/10)/100;
                    res.data.betMoney = parseInt(res.data.betMoney/10)/100;
                    res.data.lotteryMoney = parseInt(res.data.lotteryMoney/10)/100;
                    res.data.winOrLose = parseInt(res.data.winOrLose/10)/100;
                    res.data.taxValue = parseInt(res.data.taxValue/10)/100;
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

