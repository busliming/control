<template>
    <div class="card-data">
        <el-card>
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
                    局号：{{tabledata.officeNumber}}
                </div>
                <div class="text item">
                    开始时间：{{tabledata.startTime}}
                </div>
                <div class="text item">
                    结束时间：{{tabledata.endTime}}
                </div>
                <div class="text item">
                    是否上庄：
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
            </el-row>
        </el-card>
        <el-card>
            <div slot="header" class="clearfix">
                <span>下注信息</span>
            </div>
            <el-table ref="dialogTable" :data="tabledata2" style="width: 100%" size="medium" stripe :cell-style="{textAlign:'center'}"
            :header-cell-style="{textAlign:'center'}" v-loading='tableloading'>
                <el-table-column prop="" label="底注"></el-table-column>
                <el-table-column prop="" label="选线"></el-table-column>
                <el-table-column prop="" label="输赢"></el-table-column>
                <el-table-column prop="" label="比大小"></el-table-column>
                <el-table-column prop="" label="中奖信息"></el-table-column>
                <el-table-column prop="" label="赔率"></el-table-column>
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
            request.getDouDiZhuDetails({
                id:this.id,
                siteId:this.siteId
            }).then(res => {
                console.log(res)
                this.tableloading = false
                if(res.code == '200'){
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

