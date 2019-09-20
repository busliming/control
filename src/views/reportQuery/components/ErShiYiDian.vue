<template>
    <div class="card-data">
        <el-card style="width:35%">
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
                    当局输赢：{{tabledata.result | Upper}}
                </div>
                <div class="text item">
                    当局税收：{{tabledata.chargeValue | Upper}}
                </div>
            </el-row>
        </el-card>
        <el-card style="width:100%">
            <div slot="header" class="clearfix">
                <span>对局详情</span>
            </div>
            <el-table ref="dialogTable" :data="tabledata2" style="width: 100%" size="medium" :stripe='false' :cell-style="{textAlign:'center'}"
            :header-cell-style="{textAlign:'center'}" v-loading='tableloading' :highlight-current-row='true'  :row-class-name="tableRowClassName">
                <el-table-column label="玩家">
                      <template slot-scope="scope">
                            <span v-if="scope.row.type=='BANKER'">庄家</span>
                            <span v-else>{{scope.row.playerName}}{{scope.row.status | priceFmt}}</span>
                      </template>
                </el-table-column>
                <el-table-column label="牌型">
                        <template slot-scope="scope">
                              {{cardsFilter(scope.row.cards)}}
                        </template>
                </el-table-column>
                <el-table-column label="初始注">
                      <template slot-scope="scope">
                              {{scope.row.bet | Upper}}
                        </template>
                </el-table-column>
                <!-- <el-table-column prop="cardPre" label="倍数"></el-table-column> -->
                <!-- <el-table-column prop="win" label="胜负结算"></el-table-column> -->
                <!-- <el-table-column prop="playerName2" label="分牌"></el-table-column> -->
                <!-- <el-table-column prop="cards2" label="牌型"></el-table-column> -->
                <!-- <el-table-column prop="bet2" label="下注"></el-table-column> -->
                <el-table-column label="加倍">
                        <template slot-scope="scope">
                              {{scope.row.addDouble | Upper}}
                        </template>
                </el-table-column>
                <el-table-column  label="保险">
                       <template slot-scope="scope">
                              {{scope.row.buyBenefits | Upper}}
                        </template>
                </el-table-column>
                <el-table-column label="合计投注额">
                      <template slot-scope="scope">
                              {{scope.row.countBet | Upper}}
                        </template>
                </el-table-column>
                <el-table-column prop="cardPre" label="牌型倍数"></el-table-column>
                <el-table-column prop="win" label="胜负结算">
                     <template slot-scope="scope">
                              {{scope.row.win | Upper}}
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
            request.getBlackJackDetails({
                id:this.id,
                siteId:this.siteId
            }).then(res => {
                this.tableloading = false
                if(res.code == '200'){
                    console.log(res.data.players)
                    this.tabledata = res.data
                    this.tabledata2 = res.data.players
                }
                else {
                    this.$notify.error({title:res.msg});
                }
            })
        },
        cardsFilter(arr){
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
            let list = [];
            arr.map( item => { 
                list.push(color[item[0]]+num[item[1]]);
            })
            return list.join(',');
        },
        tableRowClassName({row}) {
            if (row.myself) {
              return 'warning-row';
            } 
        }
    },
    filters: {
      priceFmt(val) {
        switch(val) {
          case 1:
            return '（本家）'
          break
          case 2:
            return '（分牌）'
          break
          case 3:
            return '（多门）'
          break
          default:
          return val
        }
      },
      Upper(val){//当不需要返回加减号 需要除以1000 需要截取保留2位小数
          return (val/1000).toFixed(2)      //.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      },
    }
}
</script>
<style>
.el-table .warning-row {
    background:#9999FF!important;
    color:#fff;
  }
.el-table  .el-table__body  .warning-row:hover td{ background:#d8d8ec!important; color:#606266 }
</style>
