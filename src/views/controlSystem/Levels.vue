<template>
    <div class="card card-primary level">
        <div class="card-header">
            <div class="card-text">
                <h3>库存档位</h3>
            </div>
        </div>
        <div class="card-body">
            <div class="toolbar">
                <el-form :inline="true" :model="queryParams" label-width="120px">
                    <el-form-item label="游戏名称：">
                        <el-select  v-model="queryParams.conditionsMap.gameId" size="small">
                            <el-option v-for="(item,index) in games" :key="index" :label="item.gameName" :value="item.gameId"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="游戏房间：">
                        <el-select v-model="gameRoom" size="small" @change="callback">
                            <el-option v-for="(item,index) in rooms" :key="index" :label="item.gameId == 5 ? item.gameRoom + '-' + item.multiple + '倍场' : item.gameRoom"
                            :value="item.gameId == 5 ? item.gameRoom + '-' + item.multiple + '倍场' : item.gameRoom"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label=" " label-width="40px">
                        <el-button class="search-btn" type="primary" @click="queryTableData('search')" size="small" style="width: 100px">
                            <i class="el-icon-search"></i>
                            搜索
                        </el-button>
                    </el-form-item>
                    <el-form-item style="float:right;">
                        <el-tooltip effect="dark" content="游戏房间库存达到这个库存档位后，中奖的概率读取设置的概率" placement="left">
                            <i class="el-icon-question"></i>
                        </el-tooltip>
                    </el-form-item>
                </el-form>
                <hr/>
                <el-form :inline="true">
                    <el-form-item>
                        <el-button type="primary" size="small" icon="el-icon-circle-plus" style="width: 100px" @click="addDialog.visible = true">新增</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="success" size="small" @click="people">下注类人数设置</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="info" size="small" icon="el-icon-back" style="width: 100px" @click="$router.push('/controlSystem')">返回</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="card-data">
                <el-table :max-height="MAX_TABLE_HEIGHT" :data="tableData" style="width: 100%" size="medium" stripe :cell-style="{textAlign:'center'}"
                :header-cell-style="{textAlign:'center'}" v-loading='tableLoading' empty-text='请先选择搜索条件'>
                    <el-table-column prop="gameName" label="游戏名称"></el-table-column>
                    <el-table-column prop="gameRoom" label="游戏房间"></el-table-column>
                    <el-table-column prop="stockStart" label="起始库存"></el-table-column>
                    <el-table-column prop="stockGear" label="库存档位(元)"></el-table-column>
                    <el-table-column prop="probability" label="概率(%)"></el-table-column>
                    <el-table-column prop="" label="操作" fixed="right">
                        <template slot-scope="scope">
                            <el-button type="default" size="mini" @click="edit(scope.row)">修改</el-button>
                            <el-button type="danger" size="mini" @click="del(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="pagination">
                <el-pagination @size-change="sizeChangeHandle" @current-change="currentChangeHandle" :current-page="pageNum" :page-sizes="[10,20,50,100,200]"
                :page-size.sync="queryParams.limit" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
            </div>
            <!--新增弹框-->
            <el-dialog :visible.sync="addDialog.visible" width="500px" :close-on-click-modal="false">
                <div class="custom-dialog">
                    <div class="dialog-header">
                        <div class="card-text">
                            <h3>新增</h3>
                        </div>
                    </div>
                    <div class="dialog-body">
                        <el-form label-width="120px" :model="formDataAdd">
                            <el-form-item label="游戏名称:">
                                <el-select  v-model="formDataAdd.gameId" size="small" style="width:90%">
                                    <el-option v-for="(item,index) in games" :key="index" :label="item.gameName" :value="item.gameId"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="游戏房间:">
                                <el-select v-model="formDataAdd.gameRoom" size="small" style="width:90%">
                                    <el-option v-for="(item,index) in addRooms" :key="index" :label="item.gameRoom" :value="item.gameRoom"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="游戏倍场:" v-show="addDialog.multipleShow">
                                <el-select size="small" style="width: 90%" v-model="formDataAdd.multiple">
                                    <el-option value="4" label="4倍场">4倍场</el-option>
                                    <el-option value="10" label="10倍场">10倍场</el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="起始值:">
                                <el-input type="tel" v-model.number="formDataAdd.stockStart" size="small" clearable="" style="width:90%"></el-input>
                            </el-form-item>
                            <el-form-item label="库存档位(元):">
                                <el-input type="tel" v-model.number="formDataAdd.stockGear" size="small" clearable="" maxlength="8" style="width:90%"></el-input>
                            </el-form-item>
                            <el-form-item label="概率:">
                                <el-input type="tel" v-model.number="formDataAdd.probability" size="small" clearable="" style="width:90%">
                                    <template slot="append">%</template>
                                </el-input>
                            </el-form-item>
                        </el-form>
                    </div>
                    <div class="dialog-footer">
                        <el-button type="danger" icon="el-icon-error" plain @click="clean">取消</el-button>
                        <el-button type="primary" icon="el-icon-success" :loading="addDialog.loading" @click="addSave">保存</el-button>
                    </div>
                </div>
            </el-dialog>
            <!--修改弹框-->
            <el-dialog :visible.sync="allDialog.visible" width="500px" :close-on-click-modal="false">
                <div class="custom-dialog">
                    <div class="dialog-header">
                        <div class="card-text">
                            <h3>修改</h3>
                        </div>
                    </div>
                    <div class="dialog-body">
                        <el-form label-width="120px" :model="formDataAll">
                            <el-form-item label="起始值:" prop="">
                                <el-input type="tel" v-model.number="formDataAll.stockStart" size="small" clearable="" style="width:90%"></el-input>
                            </el-form-item>
                            <el-form-item label="库存档位(元):" prop="">
                                <el-input type="tel" v-model.number="formDataAll.stockGear" size="small" clearable="" maxlength="8" style="width:90%"></el-input>
                            </el-form-item>
                            <el-form-item label="概率:" prop="">
                                <el-input type="tel" v-model.number="formDataAll.probability" size="small" clearable="" style="width:90%">
                                    <template slot="append">%</template>
                                </el-input>
                            </el-form-item>
                        </el-form>
                    </div>
                    <div class="dialog-footer">
                        <el-button type="danger" icon="el-icon-error" plain @click="clean">取消</el-button>
                        <el-button type="primary" icon="el-icon-success" :loading="allDialog.loading" @click="editSave">保存</el-button>
                    </div>
                </div>
            </el-dialog>
            <!--下注类人数设置弹框-->
            <el-dialog :visible.sync="peopleDialog.visible" width="500px" :close-on-click-modal="false">
                <div class="custom-dialog">
                    <div class="dialog-header">
                        <div class="card-text">
                            <h3>下注类人数设置</h3>
                        </div>
                    </div>
                    <div class="dialog-body">
                        <el-form label-width="120px" :model="formDataPeople">
                            <el-form-item label="低于此人数:">
                                <el-input size="small" style="width:120px" v-model="formDataPeople.startNumber" type="number"></el-input>
                                <span style="padding: 0 8px;">至</span>
                                <el-input size="small" style="width:120px" v-model="formDataPeople.endNumber" type="number"></el-input>
                            </el-form-item>
                            <el-form-item label="触发概率:" prop="">
                                <el-input size="small" type="number" v-model="formDataPeople.probability" clearable="" maxlength="30" style="width:90%">
                                    <template slot="append">%</template>
                                </el-input>
                            </el-form-item>
                            <p style="margin-top:20px;margin-left:35px">注：下注类游戏房间低于多少人时，每局只有多少的概率触发库存档位</p>
                        </el-form>
                    </div>
                    <div class="dialog-footer">
                        <el-button type="danger" icon="el-icon-error" plain @click="peopleDialog.visible=false">取消</el-button>
                        <el-button type="primary" icon="el-icon-success" :loading="peopleDialog.loading" @click="peopleSave">保存</el-button>
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
                    gameId:'',
                    gameRoom:'',
                    siteId:this.$route.params.siteId,
                    multiple:'',
                },
                sort: "createDate",
                sortOrder: "desc",
                limit: 10,
                offset: 0,
            },

            // 列表属性
            tableData:[],
            tableLoading:false,
            rooms:[],//房间数据
            addRooms:[],//新增时的房间数据
            games:[],//游戏名数据
            gameRoom:'',//房间名字（搜索用）

            //分页属性
            pageNum: 1,
            pageSize: 10,
            total: 0,

            //添加弹框属性
            addDialog: {
                visible: false,
                loading: false,
                multipleShow:false
            },
            formDataAdd:{
                siteId:this.$route.params.siteId,
                gameId:'',
                gameRoom:'',
                multiple:'',  //百人牛牛倍场
                stockStart:'', //起始值
                stockGear:'',   //档位
                probability:'', //概率
            },

            //批量设置弹框属性
            allDialog: {
                visible: false,
                loading: false,
            },
            formDataAll:{
                siteId:this.$route.params.siteId,
                stockStart:'',
                stockGear:'',
                probability:'',
                gearId:[],
                gameId:'',
                multiple:'',
                roomName:'',
            },

            //人数弹框属性
            peopleDialog: {
                visible: false,
                loading: false,
            },
            formDataPeople:{
                id:'',
                siteId:this.$route.params.siteId,
                startNumber:'',
                endNumber:'',
                probability:'',
            },
        }
    },
    created(){
        this.getgame()
    },
    watch:{
        'queryParams.conditionsMap.gameId':{   //监听是否选择游戏
            deep:true,  //深度监控
            // immediate: true, // 第一次默认值也监听
            handler(val) {
                this.queryParams.conditionsMap.gameRoom = ''
                this.gameRoom = ''
                this.getroom(1)
            },
        },
        'formDataAdd.gameId':{   //监听是否选择游戏
            deep:true,  //深度监控
            // immediate: true, // 第一次默认值也监听
            handler(val) {
                this.addDialog.multipleShow = val == 5 ? true : false
                this.getroom(2)
            },
        },
    },
    methods:{
        //获取列表
        queryTableData(type){
            if(type == 'search'){ //切换游戏重置页数
                this.pageNum = 1
                this.queryParams.offset = 0
            }
            try{
                if(!this.queryParams.conditionsMap.gameId || this.queryParams.conditionsMap.gameRoom === ''){
                    throw '请先选择查询条件'
                }
            }catch (e) {
                this.$message.error(e);
                return false
            }

            this.tableLoading = true
            request.selectStockGear(this.queryParams).then(res => {
                this.tableLoading = false
                this.total = res.total
                if(this.queryParams.conditionsMap.gameId == 5){
                    for(var item of res.rows){
                        item.gameRoom = item.gameRoom + '-' + item.multiple + '倍场'
                    }
                }
                this.tableData = res.rows
            })
        },
        //百人牛牛搜索处理multiple gameRoom字段
        callback(val){
            this.queryParams.conditionsMap.multiple = this.queryParams.conditionsMap.gameId == 5 ? val.split('-')[1].split('倍场')[0] : ''
            this.queryParams.conditionsMap.gameRoom = this.queryParams.conditionsMap.gameId == 5 ? val.split('-')[0] : val
        },
        //获取游戏房间
        getroom(type){
            var str = type == 1 ? this.queryParams.conditionsMap.gameId : this.formDataAdd.gameId
            request.selectGameRoom({
                siteId:this.$route.params.siteId,
                gameId:str,
            }).then(res => {
                if(res.code == '200'){
                    if(type == 1){ //搜索
                        this.rooms = res.data
                    }
                    if(type == 2){ //新增
                        let obj = {}
                        res.data = res.data.reduce((cur,next) => {  //去重
                            obj[next.gameRoom] ? "" : obj[next.gameRoom] = true && cur.push(next);
                            return cur;
                        },[])
                        this.addRooms = res.data
                    }
                }else{
                    this.$notify.error({title:res.msg})
                }
            })
        },
        //获取游戏名称
        getgame(){
            request.selectGameName({
                siteId:this.$route.params.siteId
            }).then(res => {
                if(res.code == '200'){
                    this.games = res.data.filter(item => item.gameId != 3 && item.gameId != 13 && item.gameId != 19)
                }else{
                    this.$notify.error({title:res.msg})
                }
            })
        },
        //新增保存按钮
        addSave(){
            try{
                if(!this.formDataAdd.gameId || !this.formDataAdd.gameRoom || this.formDataAdd.stockGear === ''
                || this.formDataAdd.probability === '' || this.formDataAdd.stockStart === ''){
                    throw '请完善表单信息!'
                }
                if(this.formDataAdd.gameId == 5 && !this.formDataAdd.multiple){
                    throw '请完善表单信息!'
                }
                if(this.formDataAdd.stockGear <= this.formDataAdd.stockStart){
                    throw '库存档位的填写必须大于起始值'
                }
                if(!exp.zs0.test(this.formDataAdd.stockGear)){
                    throw '库存档位只可为正负整数或0'
                }
                if(!exp.zs0.test(this.formDataAdd.stockStart)){
                    throw '起始值只可为正负整数或0'
                }
                if(this.formDataAdd.probability < 1 || this.formDataAdd.probability > 100 || !exp.zzs.test(this.formDataAdd.probability)){
                    throw '概率只能填写1-100(包含)范围的整数'
                }
            }catch (e) {
                this.$message.error(e);
                return false
            }
            this.addDialog.loading = true
            request.insetStockGear(this.formDataAdd).then(res => {
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
        //新增弹框清空数据
        clean(){
            this.formDataAdd.gameId = ''
            this.formDataAdd.gameRoom = ''
            this.formDataAdd.multiple = ''
            this.formDataAdd.stockStart = ''
            this.formDataAdd.stockGear = ''
            this.formDataAdd.probability = ''
            this.addDialog.visible = false;

            this.formDataAll.stockGear = ''
            this.formDataAll.probability = ''
            this.formDataAll.stockStart = ''
            this.formDataAll.gearId = []
            this.allDialog.visible = false
        },
        //下注类人数设置按钮（查询）
        people(){
            this.peopleDialog.visible = true
            this.peopleDialog.loading = true
            request.selectBetNumber({
                siteId:this.$route.params.siteId
            }).then(res => {
                this.peopleDialog.loading = false
                if(res.code == '200'){
                    this.formDataPeople.startNumber = res.data.startNumber
                    this.formDataPeople.endNumber = res.data.endNumber
                    this.formDataPeople.probability = res.data.probability
                    this.formDataPeople.id = res.data.id
                }else{
                    this.$notify.error({title:res.msg})
                }
            })
        },
        //下注类人数设置保存
        peopleSave(){
            try{
                if(this.formDataPeople.startNumber === '' || this.formDataPeople.endNumber === '' || this.formDataPeople.probability === ''){
                    throw '请完善表单信息'
                }
                if(this.formDataPeople.endNumber < this.formDataPeople.startNumber){
                    throw '人数限制第二个值不得小于第一个值'
                }
                if(this.formDataPeople.startNumber < 0 || this.formDataPeople.endNumber > 99 || !exp.ffzs.test(this.formDataPeople.startNumber) 
                || !exp.ffzs.test(this.formDataPeople.endNumber)){
                    throw '人数限制区间应为0-99(包含)之间的整数'
                }
                if(this.formDataPeople.probability < 0 || this.formDataPeople.probability > 100 || !exp.ffzs.test(this.formDataPeople.probability)){
                    throw '触发概率区间应为0-100(包含)之间的整数'
                }
            }catch (e) {
                this.$message.error(e);
                return false
            }
            this.peopleDialog.loading = true
            request.betNumber(this.formDataPeople).then(res => {
                this.peopleDialog.loading = false
                if(res.code == '200'){
                    this.$notify.success({title:res.msg});
                    this.peopleDialog.visible = false
                }else{
                    this.$notify.error({title:res.msg})
                }
            })
        },
        //修改保存
        editSave(){
            try{
                if(this.formDataAll.stockGear === '' || this.formDataAll.probability === '' || this.formDataAll.stockStart === ''){
                    throw '请完善表单信息!'
                }
                if(this.formDataAll.stockGear <= this.formDataAll.stockStart){
                    throw '库存档位的填写必须大于起始值'
                }
                if(!exp.zs0.test(this.formDataAll.stockGear)){
                    throw '库存档位只可为正负整数或0'
                }
                if(!exp.zs0.test(this.formDataAll.stockStart)){
                    throw '起始值只可为正负整数或0'
                }
                if(this.formDataAll.probability < 1 || this.formDataAll.probability > 100 || !exp.zzs.test(this.formDataAll.probability)){
                    throw '概率只能填写1-100(包含)范围的整数'
                }
                if(!this.queryParams.conditionsMap.gameId || this.queryParams.conditionsMap.gameRoom === ''){
                    throw '请先选择查询条件'
                }
            }catch (e) {
                this.$message.error(e);
                return false
            }
            this.formDataAll.gameId = this.queryParams.conditionsMap.gameId
            this.formDataAll.multiple = this.queryParams.conditionsMap.multiple
            this.formDataAll.roomName = this.queryParams.conditionsMap.gameRoom
            this.allDialog.loading = true
            request.allUpdateStockGear(this.formDataAll).then(res => {
                this.allDialog.loading = false
                if(res.code == '200'){
                    this.$notify.success({title:res.msg});
                    this.clean();
                    this.queryTableData();
                }else{
                    this.$notify.error({title:res.msg})
                }
            })
        },
        //修改
        edit(row){
            this.allDialog.visible = true
            this.formDataAll.stockStart = row.stockStart
            this.formDataAll.stockGear = row.stockGear
            this.formDataAll.probability = row.probability
            this.formDataAll.gearId.push(row.id)
        },
        //删除
        del(row){
            var data = {
                gearId:row.id,
                siteId:row.siteId,
                gameId:row.gameId,
                roomName:row.gameRoom.split('-')[0],
                multiple:'',
                stockStart:row.stockStart
            }
            data.multiple = row.gameId == 5 ? row.multiple : ''

            this.$confirm("确定要删除该条数据吗？", '提示', {
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                center: true,
                type: "warning"
            }).then(() => {
                this.tableLoading = true;
                request.deleteStockGear(data).then(res => {
                    if (res.code === '200') {
                        this.tableLoading = false;
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
.level .el-icon-question{font-size:26px;vertical-align:middle}
/* chrome type为number移除箭头 */
input::-webkit-outer-spin-button,input::-webkit-inner-spin-button{
     -webkit-appearance:textfield;
}
</style>
