<template>
    <div class="card-data hl30m">
        <el-card style="width:35%;margin-right:5%;">
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
                    是否上庄：{{tabledata.isDealer == 'true' ? '是' : '否'}}
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
                    当局输赢：{{tabledata.win}}
                </div>
                <div class="text item">
                    当局税收：{{tabledata.tax}}
                </div>
            </el-row>
        </el-card>
        <el-card style="width:50%;margin-right:5%;">
            <div slot="header" class="clearfix">
                <span>下注信息</span>
            </div>
            <el-table ref="dialogTable" :data="tabledata.betInfoList" style="width: 100%" size="medium" stripe :cell-style="{textAlign:'center'}"
            :header-cell-style="{textAlign:'center'}" v-loading='tableloading'>
                <el-table-column prop="betTarget" label="盘口" sortable  :formatter="displayHandicaps"></el-table-column>
                <el-table-column prop="odd" label="赔率" sortable></el-table-column>
                <el-table-column prop="me" label="金币数量" sortable>
                    <template slot-scope="scope">
                        <el-tag>{{ scope.row.me + ' 元' }}</el-tag>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <el-card>
            <div slot="header" class="clearfix">
                <span>开奖信息</span>
            </div>
            <el-table ref="dialogTable" :data="list1" style="width: 100%" size="medium" stripe :cell-style="{textAlign:'center'}"
            :header-cell-style="{textAlign:'center'}" v-loading='tableloading'>
                <el-table-column prop="type" label="身份" sortable></el-table-column>
                <el-table-column prop="cards" label="牌型" sortable :formatter="displayCards"></el-table-column>
                <el-table-column prop="result" label="结果" sortable>
                    <template slot-scope="scope">
                        <el-tag type="success" v-if="scope.row.result == 1">庄赢</el-tag>
                        <el-tag type="danger" v-else-if="scope.row.result == 2">闲赢</el-tag>
                        <el-tag v-else>平</el-tag>
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
            list1:[],
        }
    },
    created(){
        this.query()
    },
    methods:{
        //获取数据
        query(){
            this.tableloading = true
            request.getBaccaratDetails({
                id:this.id,
                siteId:this.siteId
            }).then(res => {
                this.tableloading = false
                if(res.code == '200'){
                    var list1 = res.data.openLotteryResult;
                    for (let k in list1) {
                        if (list1[k].hasOwnProperty('xian')) {
                            list1[k].cards = list1[k].xian;
                            list1[k].type = '闲'
                        }
                        if (list1[k].hasOwnProperty('zhuang')) {
                            list1[k].cards = list1[k].zhuang;
                            list1[k].type = '庄'
                        }
                    }
                    this.list1 = list1

                    for(var item of res.data.betInfoList){
                        item.me = parseInt(item.me/10)/100;
                    }

                    res.data.betMoney = parseInt(res.data.betMoney/10)/100;
                    res.data.lotteryMoney = parseInt(res.data.lotteryMoney/10)/100;
                    res.data.win = parseInt(res.data.win/10)/100;
                    res.data.tax = parseInt(res.data.tax/10)/100;
                    this.tabledata = res.data
                }
                else {
                    this.$notify.error({title:res.msg});
                }
            })
        },
        displayHandicaps(row) {
            // 1：庄 2：庄天王 3：同点平 4：闲天王 5：闲 6：闲对子 7：庄对子 8：平
            if (row.betTarget == 1) {
                return '庄'
            }
            if (row.betTarget == 2) {
                return '闲'
            }
            if (row.betTarget == 3) {
                return '平'
            }
            if (row.betTarget == 4) {
                return '庄对子'
            }
            if (row.betTarget == 5) {
                return '闲对子'
            }
        },
        displayCards(row) {
            let cards = '';
            for (let k in row.cards) {
                if (k > 0) {
                    cards += ', '
                }
                //花色
                if (row.cards[k][0] == 3) {
                    cards += '黑桃'
                }
                else if (row.cards[k][0] == 2) {
                    cards += '红桃'
                }
                else if (row.cards[k][0] == 1) {
                    cards += '梅花'
                }
                else if (row.cards[k][0] == 0) {
                    cards += '方块'
                }
                //A ~ K
                if (row.cards[k][1] == 1) {
                    cards += 'A';
                }
                else if (row.cards[k][1] == 11) {
                    cards += 'J';
                }
                else if (row.cards[k][1] == 12) {
                    cards += 'Q';
                }
                else if (row.cards[k][1] == 13) {
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

<style>
.hl30m{display: flex}
</style>


