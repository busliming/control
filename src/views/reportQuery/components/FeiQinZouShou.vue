<template>
    <div class="card-data fqzs">
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
                    是否上庄：{{tabledata.isBank == 'true' ? '是' : '否' }}
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
                    中奖总金额：{{tabledata.lotterMoney}}
                </div>
                <div class="text item">
                    当局输赢：{{tabledata.selfWinScore}}
                </div>
                <div class="text item">
                    当局税收：{{tabledata.tax}}
                </div>
            </el-row>
        </el-card>
        <el-card style="width:65%">
            <div slot="header" class="clearfix">
                <span>下注信息</span>
                <span style="float: right; padding: 3px 0" type="text">开奖情况：{{tabledata.rewardPosition}}</span>
            </div>
            <el-table ref="dialogTable" :data="tabledata.betInfoList" style="width: 100%" size="medium" stripe :cell-style="{textAlign:'center'}"
            :header-cell-style="{textAlign:'center'}" v-loading='tableloading'>
                <el-table-column prop="betTarget" label="盘口" sortable></el-table-column>
                <el-table-column prop="odd" label="倍数" sortable></el-table-column>
                <el-table-column prop="selfAmount" label="金币数量" sortable></el-table-column>
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
            request.getBirdsAndBeastsDetails({
                id:this.id,
                siteId:this.siteId
            }).then(res => {
                console.log(res)
                this.tableloading = false
                if(res.code == '200'){
                    var list1 = ['孔雀','鸽子','燕子','老鹰','熊猫','猴子','兔子','狮子','蓝鲨鱼','金鲨鱼','通赔','通吃']
                    res.data.rewardPosition = list1[res.data.rewardPosition*1 - 1]
                    var list2 = ['孔雀','鸽子','燕子','老鹰','熊猫','猴子','兔子','狮子','飞禽','走兽','鲨鱼']
                    for(var item of res.data.betInfoList){
                        item.betTarget = list2[item.betTarget - 1]
                        item.selfAmount = parseInt(item.selfAmount/10)/100;
                    }

                    res.data.betMoney = parseInt(res.data.betMoney/10)/100;
                    res.data.lotterMoney = parseInt(res.data.lotterMoney/10)/100;
                    res.data.selfWinScore = parseInt(res.data.selfWinScore/10)/100;
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
.fqzs{display: flex}
</style>


