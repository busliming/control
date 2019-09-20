<template>
    <div class="card card-primary">
        <div class="card-header">
            <div class="card-text">
                <h3>游戏控制</h3>
            </div>
        </div>
        <div class="card-body">
            <el-button type="success" size="small" style="margin-bottom:20px" @click="allDialog.visible = true">批量设置库存衰减</el-button>
            <el-button type="info" size="small" icon="el-icon-back" style="width: 100px" @click="$router.push('/controlSystem')">返回</el-button>
            <el-tabs type="border-card" @tab-click="handleClick">
                <el-tab-pane label="下注类">
                    <div style="overflow:hidden;margin-bottom:20px">
                        <el-button type="primary" size="small" style="width: 100px;float:left;margin-left:20px"
                        v-for="(item,index) in gameList" :key="index" @click="queryTableData(item.gameId)">
                            {{item.gameName}}
                        </el-button>
                    </div>
                    <div class="card-data">
                        <el-table :max-height="500" :data="tableData" style="width: 100%" size="medium" stripe :cell-style="{textAlign:'center'}" v-loading='tableLoading'
                        :header-cell-style="{textAlign:'center'}">
                            <el-table-column prop="" label="房间名称">
                                <template slot-scope="scope">
                                    <span v-if="scope.row.gameId != 5">{{scope.row.gameName + '-' + scope.row.roomName}}</span>
                                    <span v-else>{{scope.row.gameName + '-' + scope.row.multiple + '倍场-' + scope.row.roomName}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="totalDayWinLose" label="房间总盈亏"></el-table-column>
                            <el-table-column prop="dayWinLose" label="今日房间盈亏"></el-table-column>
                            <el-table-column prop="roomWinRate" label="房间胜率">
                                <template slot-scope="scope">
                                    <span v-if="scope.row.roomWinRate == 0">不控制</span>
                                    <span v-else>{{scope.row.roomWinRate}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="" label="操作" fixed="right">
                                <template slot-scope="scope">
                                    <el-button type="primary" size="mini" @click="edit(scope.row)">修改</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="对战类">
                    <div style="overflow:hidden;margin-bottom:20px">
                        <el-button type="primary" size="small" style="width: 100px;float:left;margin-left:20px"
                        v-for="(item,index) in gameList" :key="index" @click="queryTableData(item.gameId)">
                            {{item.gameName}}
                        </el-button>
                    </div>
                    <div class="card-data">
                        <el-table :max-height="450" :data="tableData" style="width: 100%" size="medium" stripe :cell-style="{textAlign:'center'}" v-loading='tableLoading'
                        :header-cell-style="{textAlign:'center'}">
                            <el-table-column prop="" label="房间名称">
                                <template slot-scope="scope">{{scope.row.gameName + '-' + scope.row.roomName}}</template>
                            </el-table-column>
                            <el-table-column prop="totalDayWinLose" label="房间总盈亏"></el-table-column>
                            <el-table-column prop="dayWinLose" label="今日房间盈亏"></el-table-column>
                            <el-table-column prop="roomWinRate" label="房间胜率">
                                <template slot-scope="scope">
                                    <span v-if="scope.row.roomWinRate == 0">不控制</span>
                                    <span v-else>{{scope.row.roomWinRate}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="" label="操作" fixed="right">
                                <template slot-scope="scope">
                                    <el-button type="primary" size="mini" @click="edit(scope.row)">修改</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="捕鱼类">
                    <div style="overflow:hidden;margin-bottom:20px">
                        <el-button type="primary" size="small" style="width: 100px;float:left;margin-left:20px"
                        v-for="(item,index) in gameList" :key="index" @click="queryTableData(item.gameId)">
                            {{item.gameName}}
                        </el-button>
                    </div>
                    <div class="card-data">
                        <el-table :max-height="450" :data="tableData" style="width: 100%" size="medium" stripe :cell-style="{textAlign:'center'}" v-loading='tableLoading'
                        :header-cell-style="{textAlign:'center'}">
                            <el-table-column prop="" label="房间名称">
                                <template slot-scope="scope">{{scope.row.gameName + '-' + scope.row.roomName}}</template>
                            </el-table-column>
                            <el-table-column prop="totalDayWinLose" label="房间总盈亏"></el-table-column>
                            <el-table-column prop="dayWinLose" label="今日房间盈亏"></el-table-column>
                            <el-table-column prop="" label="操作" fixed="right">
                                <template slot-scope="scope">
                                    <el-button type="primary" size="mini" @click="edit(scope.row)">修改</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
        <!--批量弹框-->
        <el-dialog :visible.sync="allDialog.visible" width="500px" :close-on-click-modal="false">
            <div class="custom-dialog">
                <div class="dialog-header">
                    <div class="card-text">
                        <h3>批量设置库存衰减</h3>
                    </div>
                </div>
                <div class="dialog-body">
                    <el-form label-width="80px">
                        <el-form-item label="库存衰减:">
                            <el-input type="number" size="small" placeholder="填写0-5%" v-model.number="stockWeak">
                                <template slot="append">%</template>
                            </el-input>
                        </el-form-item>
                        <p style="margin-left:8px">注：设置所有房间的库存衰减</p>
                    </el-form>
                </div>
                <div class="dialog-footer">
                    <el-button type="danger" icon="el-icon-error" plain @click="cancel">取消</el-button>
                    <el-button type="primary" icon="el-icon-success" :loading="allDialog.loading" @click="editSave">保存</el-button>
                </div>
            </div>
        </el-dialog>
        <!--编辑弹框-->
        <el-dialog :visible.sync="editDialog.visible" width="500px" :close-on-click-modal="false">
            <div class="custom-dialog">
                <div class="dialog-header">
                    <div class="card-text">
                        <h3>修改</h3>
                    </div>
                </div>
                <div class="dialog-body">
                    <el-form label-width="120px" :model="formDataEdit">
                        <el-form-item label="房间胜率:" prop="" v-if="!isBuyu">
                            <el-select v-model="formDataEdit.roomWinRate" size="small">
                                <el-option :value="0" label="不控制"></el-option>
                                <el-option :value="10" label="10"></el-option>
                                <el-option :value="20" label="20"></el-option>
                                <el-option :value="30" label="30"></el-option>
                                <el-option :value="40" label="40"></el-option>
                                <el-option :value="50" label="50"></el-option>
                                <el-option :value="60" label="60"></el-option>
                                <el-option :value="70" label="70"></el-option>
                                <el-option :value="80" label="80"></el-option>
                                <el-option :value="90" label="90"></el-option>
                                <el-option :value="100" label="100"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="库存衰减:">
                            <el-input type="number" size="small" placeholder="填写0-5%" v-model="formDataEdit.stockWeak">
                                <template slot="append">%</template>
                            </el-input>
                        </el-form-item>
                        <el-form-item label="库存值:" prop="">{{kucun}}</el-form-item>
                        <el-form-item label="累计库存衰减:" prop="">{{formDataEdit.sumStockWeak}}</el-form-item>
                        <p class="tips">1.房间胜率，代表机器人在房间赢的概率</p>
                        <p class="tips">2.库存衰减：代表玩家玩家输的钱多少比例不进入库存</p>
                    </el-form>
                </div>
                <div class="dialog-footer">
                    <el-button type="danger" icon="el-icon-error" plain @click="editDialog.visible=false">取消</el-button>
                    <el-button type="primary" icon="el-icon-success" :loading="editDialog.loading" @click="save">保存</el-button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import request from '@/requests/controlSystem'
import exp from '@/tools/regexp'

export default {
    data(){
        return{
            //修改弹框属性
            allDialog: {
                visible: false,
                loading: false,
            },
            stockWeak:'',
            gameList:[],//游戏按钮列表
            tableData:[],
            tableLoading:false,
            gameId:1,//tab切换后id变化

            //修改弹框属性
            editDialog: {
                visible: false,
                loading: false,
            },
            formDataEdit:{
                gameId:'',
                gameName:'',
                id:'',
                multiple:'',
                roomName:'',
                roomWinRate:'',//房间胜率
                siteId:this.$route.params.siteId,
                stockWeak:'',//库存衰减
                sumStockWeak:'',//累计库存衰减
                updateBy:'',
            },
            kucun:'', //库存值
            leiji:'', //累计库存衰减
            isBuyu:false,
        }
    },
    created(){
        this.queryTableData(1)
        this.getgame(1)
    },
    methods:{
        //获取游戏名称
        getgame(num){
            request.selectGameName({
                siteId:this.$route.params.siteId,
                gameType:num
            }).then(res => {
                if(res.code == '200'){
                    this.gameList = res.data
                }else{
                    this.$notify.error({title:res.msg})
                }
            })
        },
        //批量设置库存衰减保存按钮
        editSave(){
            try{
                if(this.stockWeak === ''){
                    throw '请完善表单信息!'
                }
                if(this.stockWeak < 0 || this.stockWeak > 5 || !exp.ffzs.test(this.stockWeak)){
                    throw '库存衰减只能填写0-5的整数'
                }
            }catch (e) {
                this.$message.error(e);
                return false
            }

            this.allDialog.loading = true
            request.allStockWeak({
                siteId:this.$route.params.siteId,
                stockWeak:this.stockWeak,
                updateBy:sessionStorage.getItem("username")
            }).then(res => {
                this.allDialog.loading = false
                if(res.code == '200'){
                    this.$notify.success({title:res.msg});
                    this.cancel()
                    if(this.formDataEdit.gameId){
                        this.queryTableData(this.formDataEdit.gameId)
                    }else{ //什么都没点 直接修改批量库存衰减的情况 无gameid
                        this.queryTableData(this.gameId)
                    }
                }else{
                    this.$notify.error({title:res.msg})
                }
            })
        },
        //取消
        cancel(){
            this.allDialog.visible=false
            this.stockWeak = ''
        },
        //获取列表
        queryTableData(gameId){
            this.tableLoading = true
            request.selectStockWeak({
                siteId:this.$route.params.siteId,
                gameId:gameId,
            }).then(res => {
                this.tableLoading = false
                if(res.code == '200'){
                    this.tableData = res.data
                }else{
                    this.$notify.error({title:res.msg})
                }
            })
        },
        //修改
        edit(row){
            this.editDialog.visible = true
            this.formDataEdit.gameId = row.gameId
            this.formDataEdit.gameName = row.gameName
            this.formDataEdit.id = row.id
            this.formDataEdit.multiple = row.multiple
            this.formDataEdit.roomName = row.roomName
            this.formDataEdit.roomWinRate = row.roomWinRate
            this.formDataEdit.stockWeak = row.stockWeak
            this.formDataEdit.sumStockWeak = row.attenuation
            this.formDataEdit.updateBy = sessionStorage.getItem("username")
            this.searchkc(row)
        },
        //修改保存
        save(){
            try{
                if(this.formDataEdit.stockWeak === ''){
                    throw '请完善表单信息!'
                }
                if(this.formDataEdit.stockWeak < 0 || this.formDataEdit.stockWeak > 5 || !exp.ffzs.test(this.formDataEdit.stockWeak)){
                    throw '库存衰减只能填写0-5的整数'
                }
            }catch (e) {
                this.$message.error(e);
                return false
            }

            this.editDialog.loading = true
            request.insetOrUpdateStockWeak(this.formDataEdit).then(res => {
                this.editDialog.loading = false
                this.editDialog.visible = false
                if(res.code == '200'){
                    this.$notify.success({title:res.msg});
                    this.queryTableData(this.formDataEdit.gameId);
                }else{
                    this.$notify.error({title:res.msg})
                }
            })
        },
        //查询库存值
        searchkc(row){
            request.selectStorage({
                gameId:row.gameId,
                roomId: row.id,
                siteId:this.$route.params.siteId,
            }).then(res => {
                if(res.code == '200'){
                    this.kucun = res.data.storage
                }else{
                    this.$notify.error({title:res.msg})
                }
            })
        },
        //切换tab
        handleClick(tab, event) {
            this.isBuyu = tab.label == '捕鱼类' ? true : false
            if(tab.label == '下注类'){
                this.gameId = 1
                this.getgame(1)
                this.queryTableData(1)
            }
            if(tab.label == '对战类'){
                this.gameId = 9
                this.getgame(3)
                this.queryTableData(9)
            }
            if(tab.label == '捕鱼类'){
                this.gameId = 3
                this.getgame(2)
                this.queryTableData(3)
            }
        },
    },
}
</script>

<style>
.el-tabs__item{height:50px;line-height:50px;font-size: 15px}
.kz-xz .tips{margin-left: 20px}
/* chrome type为number移除箭头 */
input::-webkit-outer-spin-button,input::-webkit-inner-spin-button{
     -webkit-appearance:textfield;
}
</style>
