<template>
    <div class="card-data">
        <el-card style="width:30%;margin-right:5%;float:left">
            <div slot="header" class="clearfix">
                <span>对局信息</span>
            </div>
            <el-row>
                <div class="text item">
                    会员账号：{{fishdata.account}}
                </div>
                <div class="text item">
                    游戏名称：{{fishdata.createBy}}
                </div>
                <div class="text item">
                    游戏房间：{{fishdata.roomName}}
                </div>
                <div class="text item">
                    当局桌号：{{fishdata.tableNumber}}
                </div>
                <div class="text item">
                    局号：{{fishdata.gameCode}}
                </div>
                <div class="text item">
                    下注金额：{{fishdata.betMoney}}
                </div>
                <div class="text item">
                    开始时间：{{fishdata.startTime}}
                </div>
                <div class="text item">
                    结束时间：{{fishdata.endTime}}
                </div>
                <div class="text item">
                    中奖总金额：{{fishdata.lotteryMoney}}
                </div>
                <div class="text item">
                    当局输赢：
                    <span v-if="fishdata.changeAmount>0">-{{fishdata.changeAmount}}</span>
                    <span v-else-if="fishdata.changeAmount<0">{{Math.abs(fishdata.changeAmount)}}</span>
                    <span v-else>0</span>
                </div>
                <div class="text item">
                    当局税收：{{fishdata.changeValue}}
                </div>
            </el-row>
        </el-card>
        <el-card style="width:65%;" v-loading='tableloading'>
            <div slot="header" class="clearfix">
                <span>投注信息</span>
            </div>
            <el-table ref="dialogTable" :data="tabledata" style="width: 100%" size="medium" stripe :cell-style="{textAlign:'center'}"
            :header-cell-style="{textAlign:'center'}" max-height="480">
                <el-table-column prop="launchTimeStr" label="射击时间"></el-table-column>
                <el-table-column prop="consumeCoin" label="炮弹消耗"></el-table-column>
                <el-table-column prop="fishName" label="鱼名称"></el-table-column>
                <el-table-column prop="score" label="鱼倍数"></el-table-column>
                <el-table-column prop="profitCoin" label="盈利"></el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination @size-change="sizeChangeHandle" @current-change="currentChangeHandle" :current-page="pageNum" :page-sizes="[10,20,50,100,200]"
                :page-size.sync="pageSize" layout="total, sizes, prev, next" :total="total"></el-pagination>
            </div>
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
            gameId:this.$route.params.gameId,

            fishdata:{},
            pageNum: 1,
            pageSize: 10,
            total: 0,
            index:'',
            timeStamp:'',
            uniqueId:'',
        }
    },
    created(){
        this.query()
    },
    methods:{
        //获取数据
        query(){
            var fish = sessionStorage.getItem("fishdata")
            this.fishdata = JSON.parse(fish)
            this.uniqueId = JSON.parse(this.fishdata.dataDetails).uniqueId
                
            this.tableloading = true
            request.getBulletRecordList({
                index: this.index,    
                timeStamp: this.timeStamp,    
                gameId: this.gameId,    
                page: this.pageNum,    
                pageSize: this.pageSize,
                tableNumber: this.fishdata.tableNumber,
                uniqueId: this.uniqueId
            }).then(res => {
                this.tableloading = false
                if(res.code == '200'){
                    for(var item of res.data.datas){
                        item.consumeCoin = parseInt(item.consumeCoin/10)/100;
                        item.profitCoin = parseInt(item.profitCoin/10)/100;
                    }
                    this.tabledata = res.data.datas
                    this.total = res.data.totalCount
                }
                else {
                    this.$notify.error({title:res.msg});
                }
            })
        },
        sizeChangeHandle(size) {  //表格显示条数改变    
            this.pageSize = size;    
            this.index = '';    
            this.timeStamp = '';    
            this.query();
        },
        currentChangeHandle(crtpage) { //表格显示页数改变    
            if (crtpage - this.pageNum == 1) {        
                this.index = 1;        
                this.timeStamp = this.tabledata[this.pageSize-1].launchTime;
            }else if (crtpage - this.pageNum == -1) {        
                this.index = 0;        
                this.timeStamp = this.tabledata[0].launchTime;
            }else {        
                return; 
            }    
            this.pageNum = crtpage;    
            this.query();
        },
    }
}
</script>
