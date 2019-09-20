<template>
    <div class="card-data zjh">
        <el-card style="width:25%;margin-right:5%;">
            <div slot="header" class="clearfix">
                <span>对局信息</span>
            </div>
            <el-row>
                <div class="text item">
                    会员账号：{{tabledata.account}}
                </div>
                <div class="text item">
                    会员id：{{tabledata.accountId}}
                </div>
                <div class="text item">
                    游戏名称：{{tabledata.gameName}}
                </div>
                <div class="text item">
                    游戏房间：{{tabledata.name}}
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
                    当局底分：{{tabledata.base}}
                </div>
                <div class="text item">
                    当局输赢：{{tabledata.win}}
                </div>
                <div class="text item">
                    当局税收：{{tabledata.tax}}
                </div>
                <div class="text item">
                    喜钱：{{tabledata.openMoney}}
                </div>
            </el-row>
        </el-card>
        <el-card style="width:70%">
            <div slot="header" class="clearfix">
                <span>对局详情</span>
            </div>
            <el-table ref="dialogTable" :data="tabledata.players" style="width: 100%" size="medium" stripe :cell-style="{textAlign:'center'}"
            :header-cell-style="{textAlign:'center'}" v-loading='tableloading'>
                <el-table-column prop="name" label="玩家名称" width="190"></el-table-column>
                <el-table-column label="牌型">
                    <template slot-scope="{row}">
                        {{row.cards | cardsFilter}}
                    </template>
                </el-table-column>
                <el-table-column prop="openMoney" label="喜钱"></el-table-column>
                <el-table-column prop="base" label="底分"></el-table-column>
                <el-table-column prop="coin" label="跟注金额"></el-table-column>
                <el-table-column label="状态">
                    <template slot-scope="{row}">
                        <el-tag v-if="row.state == 1" type="success">赢家</el-tag>
                        <el-tag v-if="row.state == 2" type="danger">比牌失败</el-tag>
                        <el-tag v-if="row.state == 3" type="info">弃牌</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="result" label="输赢结果"></el-table-column>
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
            request.getZJHDetails({
                id:this.id,
                siteId:this.siteId
            }).then(res => {
                this.tableloading = false
                if(res.code == '200'){
                    res.data.openMoney = 0
                    for(var item of res.data.players){
                        item.base = parseInt(item.base/10)/100;
                        item.coin = parseInt(item.coin/10)/100;
                        item.result = parseInt(item.result/10)/100;
                        item.openMoney = parseInt(item.openMoney/10)/100;
                        res.data.openMoney += item.openMoney
                        res.data.openMoney = parseInt(res.data.openMoney*1000)/1000
                    }
                    res.data.base = parseInt(res.data.base/10)/100;
                    res.data.win = parseInt(res.data.win/10)/100;
                    res.data.tax = parseInt(res.data.tax/10)/100;
                    this.tabledata = res.data
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
            return arr.join(',');
        },
    }
}
</script>

<style>
.zjh{display:flex}
</style>

