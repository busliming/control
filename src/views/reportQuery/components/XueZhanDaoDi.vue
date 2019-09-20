<template>
    <div class="card-data sg">
        <el-card style="width:30%;margin-right:4.5%;">
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
                    游戏房间：
                </div>
                <div class="text item">
                    当局桌号：{{tabledata.tableNum}}
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
                    当局底分：
                </div>
                <div class="text item">
                    下注金额：{{tabledata.betMoney}}
                </div>
                <div class="text item">
                    中奖总金额：{{tabledata.lotteryMoney}}
                </div>
                <div class="text item">
                    当局输赢：{{tabledata.result}}
                </div>
                <div class="text item">
                    当局税收：{{tabledata.dutyAmount}}
                </div>
            </el-row>
        </el-card>
        <el-card style="width:65%">
            <div slot="header" class="clearfix">
                <span>对局详情</span>
            </div>
            <el-tabs type="border-card">
                <el-tab-pane label="用户管理">1</el-tab-pane>
                <el-tab-pane label="配置管理">2</el-tab-pane>
                <el-tab-pane label="角色管理">3</el-tab-pane>
                <el-tab-pane label="定时任务">4</el-tab-pane>
            </el-tabs>
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
            tabledata2:[],
        }
    },
    created(){
        this.query()
    },
    methods:{
        //获取数据
        query(){
            this.tableloading = true
            request.getSanGongDetails({
                id:this.id,
                siteId:this.siteId
            }).then(res => {
                console.log(res)
                this.tableloading = false
                if(res.code == '200'){
                    this.tabledata = res.data
                    this.tabledata2 = res.data.patterns
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
    }
}
</script>

<style>
.sg{display: flex}
</style>


