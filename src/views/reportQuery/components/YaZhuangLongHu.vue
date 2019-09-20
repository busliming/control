<template>
    <div class="card-data yzlh" style="height:calc(100vh - 280px)">
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
                    是否上庄：{{tabledata.isDealer ? '是' : '否'}}
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
                    中奖总金额：{{tabledata.goal}}
                </div>
                <div class="text item">
                    当局输赢：{{tabledata.win}}
                </div>
                <div class="text item">
                    当局税收：{{tabledata.tax}}
                </div>
            </el-row>
        </el-card>
        <el-card style="width:65%">
            <div slot="header" class="clearfix">
                <span>下注信息</span>
                <span style="float: right; padding: 3px 0" type="text">开奖情况：{{str}}</span>
            </div>
            <el-table ref="dialogTable" :data="tabledata.detail" style="width: 100%" max-height="520" size="medium" stripe :cell-style="{textAlign:'center'}"
            :header-cell-style="{textAlign:'center'}" v-loading='tableloading'>
                <el-table-column prop="betTarget" label="盘口"  :formatter="displayHandicaps"></el-table-column>
                <el-table-column prop="odd" label="赔率"></el-table-column>
                <el-table-column prop="me" label="下注金额">
                    <template slot-scope="scope">
                        <el-tag>{{ scope.row.me + ' 元' }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="输赢">
                    <template slot-scope="scope">
                        <el-tag v-if="scope.row.isWin" type="success">赢</el-tag>
                        <el-tag v-if='!scope.row.isWin' type="danger">输</el-tag>
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
            str:'',
        }
    },
    created(){
        this.query()
    },
    methods:{
        //获取数据
        query(){
            this.tableloading = true
            request.getYZLHDetails({
                id:this.id,
                siteId:this.siteId
            }).then(res => {
                this.tableloading = false
                if(res.code == '200'){
                    res.data.betMoney = parseInt(res.data.betMoney/10)/100;
                    res.data.goal = parseInt(res.data.goal/10)/100;
                    res.data.win = parseInt(res.data.win/10)/100;
                    res.data.tax = parseInt(res.data.tax/10)/100;
                    for(var item of res.data.detail){
                        item.odd = parseInt(item.odd/10)/100;
                        item.me = parseInt(item.me/10)/100;
                    }
                    this.tabledata = res.data

                    var long = [res.data.controlPokerVo.pressLongColor,res.data.controlPokerVo.pressLongFace]
                    var hu = [res.data.controlPokerVo.pressHuColor,res.data.controlPokerVo.pressHuFace]
                    var data = [long,hu]
                    this.str = '龙：'+this.cardsFilter(data)
                }
                else {
                    this.$notify.error({title:res.msg});
                }
            })
        },
        displayHandicaps(row) {
            // 1：龙、2：压庄赢、3：压庄输、4：虎、5：龙黑、6：龙红、7：龙梅、8：龙方、9：和、10：虎黑、11：虎红、12：虎梅、13：虎方
            if (row.betTarget == 1) {
                return '龙'
            }
            if (row.betTarget == 2) {
                return '押庄赢'
            }
            if (row.betTarget == 3) {
                return '押庄输'
            }
            if (row.betTarget == 4) {
                return '虎'
            }
            if (row.betTarget == 5) {
                return '龙黑'
            }
            if (row.betTarget == 6) {
                return '龙红'
            }
            if (row.betTarget == 7) {
                return '龙梅'
            }
            if (row.betTarget == 8) {
                return '龙方'
            }
            if (row.betTarget == 9) {
                return '和'
            }
            if (row.betTarget == 10) {
                return '虎黑'
            }
            if (row.betTarget == 11) {
                return '虎红'
            }
            if (row.betTarget == 12) {
                return '虎梅'
            }
            if (row.betTarget == 13) {
                return '虎方'
            }
        },
        cardsFilter(value){ 
            let color = {
                0:'方块',
                1:'梅花',
                2:'红桃',
                3:'黑桃',
            }
            let num = {
                1:'A',
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
                13:'K'
            }
            let arr = [];
            value.map( item => {
                arr.push(color[item[0]]+num[item[1]]);
            })
            return arr.join(', 虎：');
        },
    }
}
</script>

<style>
.yzlh{display: flex}
</style>


