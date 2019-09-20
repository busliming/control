<template>
    <div class="card card-primary">
        <div class="card-header">
            <div class="card-text">
                <h3>玩家单控</h3>
            </div>
        </div>
        <div class="card-body">
            <div class="toolbar">
                <el-form :inline="true" :model="queryParams" label-width="120px">
                    <el-form-item label="" class="chooseType">
                        <el-select size="small" v-model="queryParams.conditionsMap.accountType">
                            <el-option value="1" label="会员ID">会员ID</el-option>
                            <el-option value="2" label="账号">账号</el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="">
                        <el-input type="tel" size="small" v-model.number="queryParams.conditionsMap.accountId"
                        v-show='queryParams.conditionsMap.accountType == 1' maxlength="9" clearable></el-input>
                        <el-input size="small" v-model="queryParams.conditionsMap.account" v-show='queryParams.conditionsMap.accountType == 2' maxlength="16" clearable>
                        </el-input>
                    </el-form-item>
                    <el-form-item label=" " label-width="40px">
                        <el-button class="search-btn" type="primary" @click="queryTableData" size="small" style="width: 100px">
                            <i class="el-icon-search"></i>
                            搜索
                        </el-button>
                    </el-form-item>
                </el-form>
                <hr/>
                <el-form :inline="true">
                    <el-form-item>
                        <el-button type="primary" size="small" icon="el-icon-circle-plus" style="width: 100px" @click="addDialog.visible = true">添加</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="info" size="small" icon="el-icon-back" style="width: 100px" @click="$router.push('/controlSystem')">返回</el-button>
                    </el-form-item>
                    <el-form-item style="float:right">
                        <div style="font-size:16px;font-weight:bold">tips:调整会员输赢金额，代表玩家在游戏中派发或扣除奖励，调整的金额要收取费用，请谨慎调整!</div>
                    </el-form-item>
                </el-form>
            </div>
            <div class="card-data">
                <el-table :height="MAX_TABLE_HEIGHT" :data="tableData" style="width: 100%" size="medium" stripe :cell-style="{textAlign:'center'}"
                :header-cell-style="{textAlign:'center'}" v-loading='tableLoading'>
                    <el-table-column prop="account" label="游戏账号"></el-table-column>
                    <el-table-column prop="accountId" label="游戏ID"></el-table-column>
                    <el-table-column sortable prop="winRateBattleBet" label="对战类与下注类胜率">
                        <template slot-scope="scope">
                            <span v-if="scope.row.winRateBattleBet">{{scope.row.winRateBattleBet + '%'}}</span>
                            <span v-else>-</span>
                        </template>
                    </el-table-column>
                    <el-table-column sortable prop="winRateFish" label="捕鱼类胜率">
                        <template slot-scope="scope">
                            <span v-if="scope.row.winRateFish">{{scope.row.winRateFish + '%'}}</span>
                            <span v-else-if="scope.row.winRateFish == 0">0%</span>
                            <span v-else>-</span>
                        </template>
                    </el-table-column>
                    <el-table-column sortable prop="winLose" label="输赢">
                        <template slot-scope="scope">
                            <el-tag v-if="scope.row.winLose > 0" type="success">{{scope.row.winLose}}</el-tag>
                            <el-tag v-else-if="scope.row.winLose < 0" type="danger">{{scope.row.winLose}}</el-tag>
                            <el-tag v-else-if="scope.row.winLose == 0" type="info">{{scope.row.winLose}}</el-tag>
                            <span v-else>-</span>
                        </template>
                    </el-table-column>
                    <el-table-column sortable prop="leftWinLose" label="剩余输赢">
                        <template slot-scope="scope">
                            <el-tag v-if="scope.row.leftWinLose > 0" type="success">{{scope.row.leftWinLose}}</el-tag>
                            <el-tag v-else-if="scope.row.leftWinLose < 0" type="danger">{{scope.row.leftWinLose}}</el-tag>
                            <el-tag v-else-if="scope.row.leftWinLose == 0" type="info">{{scope.row.leftWinLose}}</el-tag>
                            <span v-else>-</span>
                        </template>
                    </el-table-column>
                    <el-table-column sortable prop="controlCount" label="历史控制次数">
                        <template slot-scope="scope">
                            <span v-if="scope.row.controlCount">{{scope.row.controlCount}}</span>
                            <span v-else>-</span>
                        </template>
                    </el-table-column>
                    <el-table-column sortable prop="totalWinLose" label="累计盈亏">
                        <template slot-scope="scope">
                            <el-tag v-if="scope.row.totalWinLose > 0" type="success">{{scope.row.totalWinLose}}</el-tag>
                            <el-tag v-else-if="scope.row.totalWinLose < 0" type="danger">{{scope.row.totalWinLose}}</el-tag>
                            <el-tag v-else-if="scope.row.totalWinLose == 0" type="info">{{scope.row.totalWinLose}}</el-tag>
                            <span v-else>-</span>
                        </template>
                    </el-table-column>
                    <el-table-column sortable prop="totalRecharge" label="总充值"></el-table-column>
                    <el-table-column sortable prop="totalWithdrawal" label="总取款"></el-table-column>
                    <el-table-column prop="updateBy" label="操作人">
                        <template slot-scope="scope">
                            <span v-if="scope.row.updateBy">{{scope.row.updateBy}}</span>
                            <span v-else>-</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="operatorDate" label="最新操作时间">
                        <template slot-scope="scope">
                            <span v-if="scope.row.operatorDate">{{scope.row.operatorDate}}</span>
                            <span v-else>-</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="" label="操作" fixed="right" width="150">
                        <template slot-scope="scope">
                            <el-button type="default" size="mini" @click="edit(scope.row)" v-if="scope.row.controlId">编辑</el-button>
                            <el-button type="danger" size="mini" @click="del(scope.row)" v-if="scope.row.controlId">删除</el-button>
                            <el-button type="success" size="mini" @click="add(scope.row)" v-if="!scope.row.controlId">新增</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="pagination">
                <el-pagination @size-change="sizeChangeHandle" @current-change="currentChangeHandle" :current-page="pageNum" :page-sizes="[10,20,50,100,200]"
                :page-size.sync="queryParams.limit" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
            </div>
            <!--添加弹框-->
            <el-dialog :visible.sync="addDialog.visible" width="500px" :close-on-click-modal="false">
                <div class="custom-dialog">
                    <div class="dialog-header">
                        <div class="card-text">
                            <h3>添加玩家单控</h3>
                        </div>
                    </div>
                    <div class="dialog-body">
                        <el-form label-width="150px" :model="formDataAdd">
                            <el-form-item label="请选择类型:">
                                <el-select v-model="formDataAdd.accountType" size="small" style="width:88%">
                                    <el-option value="1" label="会员ID"></el-option>
                                    <el-option value="2" label="账号"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="会员Id:" prop="" v-show="formDataAdd.accountType == 1">
                                <el-input type="tel" v-model.number="formDataAdd.accountId" size="small" clearable style="width:88%" maxlength="9">
                                </el-input>
                            </el-form-item>
                            <el-form-item label="账号:" prop="" v-show="formDataAdd.accountType == 2">
                                <el-input type="text" v-model="formDataAdd.account" size="small" clearable style="width:88%">
                                </el-input>
                            </el-form-item>
                            <el-form-item label="输赢:" prop="">
                                <el-input type="tel" v-model.number="formDataAdd.winLose" size="small" clearable style="width:88%"
                                placeholder="只可输入正负整数" :maxlength="formDataAdd.winLose > 0 ? 6 : 7">
                                </el-input>
                            </el-form-item>
                            <el-form-item label="对战类与下注类胜率:" prop="">
                                <el-select v-model="formDataAdd.winRateBattleBet" size="small" style="width:88%">
                                    <el-option value="50" label="50%"></el-option>
                                    <el-option value="60" label="60%"></el-option>
                                    <el-option value="70" label="70%"></el-option>
                                    <el-option value="80" label="80%"></el-option>
                                    <el-option value="90" label="90%"></el-option>
                                    <el-option value="100" label="100%"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="捕鱼类胜率:">
                                <el-input size="small" placeholder="0-1000%" style="width:88%;margin-right:10px" v-model="formDataAdd.winRateFish">
                                    <template slot="append">%</template>
                                </el-input>
                                <el-tooltip class="item" effect="dark" content="填写120时，代表玩家提升了20%的命中率，填写200代表玩家提升100%命中率" placement="right">
                                    <i class="el-icon-question" style="font-size:16px"></i>
                                </el-tooltip>
                            </el-form-item>
                            <p style="margin-top:20px">注：请谨慎填写“输赢”，建议多次少量的金额调整玩家的输赢金额</p>
                            <p>填写正数代表玩家需要赢到金额，填写负数代表玩家要输的金额</p>
                            <p>对战类与下注类游戏胜率：代表全部的对战类与下注类游戏</p>
                            <p>捕鱼类输赢胜率：代表全部的捕鱼类游戏</p>
                        </el-form>
                    </div>
                    <div class="dialog-footer">
                        <el-button type="danger" icon="el-icon-error" plain @click="clean">取消</el-button>
                        <el-button type="primary" icon="el-icon-success" :loading="addDialog.loading" @click="addSave">保存</el-button>
                    </div>
                </div>
            </el-dialog>
            <!--编辑弹框-->
            <el-dialog :visible.sync="editDialog.visible" width="500px" :close-on-click-modal="false">
                <div class="custom-dialog">
                    <div class="dialog-header">
                        <div class="card-text">
                            <h3>{{editDialog.type == 'add' ? '新增玩家单控' : '编辑玩家单控'}}</h3>
                        </div>
                    </div>
                    <div class="dialog-body">
                        <el-form label-width="150px" :model="formDataEdit">
                            <el-form-item label="输赢:" prop="">
                                <el-input type="tel" v-model.number="formDataEdit.winLose" size="small" clearable="" style="width:88%"
                                placeholder="可输入正数与负数" :maxlength="formDataEdit.winLose > 0 ? 6 : 7">
                                </el-input>
                            </el-form-item>
                            <el-form-item label="对战类与下注类胜率:" prop="">
                                <el-select v-model="formDataEdit.winRateBattleBet" size="small" style="width:88%">
                                    <el-option value="50" label="50%"></el-option>
                                    <el-option value="60" label="60%"></el-option>
                                    <el-option value="70" label="70%"></el-option>
                                    <el-option value="80" label="80%"></el-option>
                                    <el-option value="90" label="90%"></el-option>
                                    <el-option value="100" label="100%"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="捕鱼类胜率:">
                                <el-input size="small" placeholder="0-1000%" style="width:88%;margin-right:10px" v-model="formDataEdit.winRateFish">
                                    <template slot="append">%</template>
                                </el-input>
                                <el-tooltip class="item" effect="dark" content="填写120时，代表玩家提升了20%的命中率，填写200代表玩家提升100%命中率" placement="right">
                                    <i class="el-icon-question" style="font-size:16px"></i>
                                </el-tooltip>
                            </el-form-item>
                        </el-form>
                    </div>
                    <div class="dialog-footer">
                        <el-button type="danger" icon="el-icon-error" plain @click="editDialog.visible=false">取消</el-button>
                        <el-button type="primary" icon="el-icon-success" :loading="editDialog.loading" @click="editSave">保存</el-button>
                    </div>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import request from '@/requests/controlSystem'
import exp from '@/tools/regexp'

export default {
    props: ['MAX_TABLE_HEIGHT'],
    data(){
        return{
            queryParams: {
                conditionsMap: {
                    siteId:this.$route.params.siteId*1,
                    accountType: '1',
                    account: '',
                    accountId:'',
                },
                limit: 10,
                offset: 0,
                sort: "createDate",
                sortOrder: "desc",
            },
            // 列表属性
            tableData:[],
            tableLoading:false,
            controlId:[],//删除用ID数组

            //分页属性
            pageNum: 1,
            pageSize: 10,
            total: 0,

            //添加弹框属性
            addDialog: {
                visible: false,
                loading: false,
            },
            formDataAdd:{
                siteId:this.$route.params.siteId,
                updateBy:sessionStorage.getItem("username"),
                accountType:'1',
                account:'',
                accountId:'',
                winLose:'',
                winRateBattleBet:'60',
                winRateFish:'120',
            },

            //修改弹框属性
            editDialog: {
                visible: false,
                loading: false,
                type:'',
            },
            formDataEdit:{
                account: "",
                accountId: '',
                accountType: '',
                controlId: '',
                siteId:this.$route.params.siteId,
                updateBy: sessionStorage.getItem("username"),
                winLose:'',
                winRateBattleBet:'',
                winRateFish:'',
            },

        }
    },
    created(){
        this.queryTableData()
    },
    methods:{
        //列表查询
        queryTableData(){
            if(this.queryParams.conditionsMap.accountType == 1){ //查ID
                this.queryParams.conditionsMap.account = ''
            }
            if(this.queryParams.conditionsMap.accountType == 2){ //查账号
                this.queryParams.conditionsMap.accountId = ''
            }

            try{
                if(this.queryParams.conditionsMap.accountType == 1 && this.queryParams.conditionsMap.accountId !== ''
                && !exp.numberCheck.test(this.queryParams.conditionsMap.accountId)){
                    throw '会员id只能为数字'
                }
            }catch (e) {
                this.$message.error(e);
                return false
            }

            this.tableLoading = true
            request.selectControl(this.queryParams).then(res => {
                this.tableLoading = false
                this.total = res.total
                for(var item of res.rows){
                    if(item.leftWinLose){
                        item.leftWinLose = parseInt(item.leftWinLose/10)/100;
                    }
                    if(item.totalWinLose){
                        item.totalWinLose = parseInt(item.totalWinLose/10)/100;
                    }
                    if(item.totalRecharge){
                        item.totalRecharge = item.totalRecharge.toFixed(2)
                    }
                    if(item.totalWithdrawal){
                        item.totalWithdrawal = item.totalWithdrawal.toFixed(2)
                    }
                }
                this.tableData = res.rows
            })
        },
        //新增保存按钮
        addSave(){
            try{
                if(this.formDataAdd.winLose === '' || !this.formDataAdd.winRateFish){
                    throw '请完善表单信息!'
                }
                if(this.formDataAdd.accountType == 1){
                    if(this.formDataAdd.accountId === ''){
                        throw '请完善表单信息!'
                    }
                    if(!exp.numberCheck.test(this.formDataAdd.accountId)){
                        throw '会员id只能为数字!'
                    }
                }
                if(this.formDataAdd.accountType == 2 && !this.formDataAdd.account){
                    throw '请完善表单信息!'
                }
                if(!exp.zs.test(this.formDataAdd.winLose)){
                    throw '输赢只可输入正负整数，不可为0，最多6位数'
                }
                if(this.formDataAdd.winRateFish < 0 || this.formDataAdd.winRateFish > 1000 || !exp.ffzs.test(this.formDataAdd.winRateFish)){
                    throw '捕鱼类输赢胜率只能为0-1000的整数'
                }
            }catch (e) {
                this.$message.error(e);
                return false
            }

            if(this.formDataAdd.accountType == 1){
                this.formDataAdd.account = ''
            }
            if(this.formDataAdd.accountType == 2){
                this.formDataAdd.accountId = ''
            }

            this.addDialog.loading = true
            request.insetControl(this.formDataAdd).then(res => {
                this.addDialog.loading = false
                if(res.code == '200'){
                    this.$notify.success({title:res.msg});
                    this.clean();
                    this.queryTableData();
                }else{
                    this.$notify.error({title:res.msg})
                }
            })
        },
        //清除数据
        clean(){
            this.addDialog.visible = false
            this.formDataAdd.accountType = '1'
            this.formDataAdd.account = ''
            this.formDataAdd.accountId = ''
            this.formDataAdd.winLose = ''
            this.formDataAdd.winRateBattleBet = '60'
            this.formDataAdd.winRateFish = '120'
        },
        //删除
        del(row){
            let list = []
            list.push(row.controlId)

            this.$confirm("确定要删除该条数据吗？", '提示', {
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                center: true,
                type: "warning"
            }).then(() => {
                this.tableLoading = true;
                request.deleteControl({
                    controlId:list,
                    siteId:this.$route.params.siteId,
                }).then(res => {
                    this.tableLoading = false;
                    if (res.code === '200') {
                        this.$notify.success({title:res.msg});
                        this.queryTableData();
                    } else {
                        this.$notify.error({title:res.msg})
                    }
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消'
                });
            });
        },
        //列表新增
        add(row){
            this.editDialog.visible = true
            this.editDialog.type = 'add'
            this.formDataEdit.winRateBattleBet = '60'
            this.formDataEdit.winRateFish = '120'
            this.formDataEdit.winLose = ''
            this.formDataEdit.accountId = row.accountId
        },
        //列表编辑
        edit(row){
            this.editDialog.visible = true
            this.editDialog.type = 'edit'
            this.formDataEdit.winLose = row.winLose
            this.formDataEdit.winRateBattleBet = row.winRateBattleBet
            this.formDataEdit.winRateFish = row.winRateFish
            this.formDataEdit.account = row.account
            this.formDataEdit.accountId = row.accountId
            this.formDataEdit.accountType = row.accountType
            this.formDataEdit.controlId = row.controlId
        },
        //编辑/新增保存按钮
        editSave(){
            try{
                if(this.formDataEdit.winLose === '' || this.formDataEdit.winRateFish === ''){
                    throw '请完善表单信息!'
                }
                if(!exp.zs.test(this.formDataEdit.winLose)){
                    throw '输赢只可输入正负整数,不可为0，最多6位数'
                }
                if(this.formDataEdit.winRateFish < 0 || this.formDataEdit.winRateFish > 1000 || !exp.ffzs.test(this.formDataEdit.winRateFish)){
                    throw '捕鱼类输赢胜率只能为0-1000的整数'
                }
            }catch (e) {
                this.$message.error(e);
                return false
            }

            this.editDialog.loading = true
            if(this.editDialog.type == 'add'){ //新增状态
                request.insetControl({
                    siteId:this.$route.params.siteId,
                    updateBy:sessionStorage.getItem("username"),
                    accountType:'1',
                    account:'',
                    accountId:this.formDataEdit.accountId,
                    winLose:this.formDataEdit.winLose,
                    winRateBattleBet:this.formDataEdit.winRateBattleBet,
                    winRateFish:this.formDataEdit.winRateFish,
                }).then(res => {
                    this.editDialog.loading = false
                    if(res.code == '200'){
                        this.$notify.success({title:res.msg});
                        this.editDialog.visible = false
                        this.queryTableData();
                    }else{
                        this.$notify.error({title:res.msg})
                    }
                })
            }else{//编辑状态
                request.updateControl(this.formDataEdit).then(res => {
                    this.editDialog.loading = false
                    if(res.code == '200'){
                        this.$notify.success({title:res.msg});
                        this.editDialog.visible = false
                        this.queryTableData();
                    }else{
                        this.$notify.error({title:res.msg})
                    }
                })
            }
        },
        sizeChangeHandle(size) {  //表格显示条数改变
            this.queryParams.limit = size;
            this.queryTableData();
        },
        currentChangeHandle(activePage) {  //表格显示页数改变
            this.pageNum = activePage;
            this.queryParams.offset = (activePage - 1) * this.queryParams.limit;
            this.queryTableData();
        },
    }
}
</script>

<style>
.chooseType .el-input{width:120px!important}
/* chrome type为number移除箭头 */
input::-webkit-outer-spin-button,input::-webkit-inner-spin-button{
     -webkit-appearance:textfield;
}
</style>


