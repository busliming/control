<template>
    <div class="card card-primary childAcc">
        <div class="card-header">
            <div class="card-text">
                <h3>下级列表</h3>
            </div>
        </div>
        <div class="card-body">
            <div class="toolbar">
                <p class="childroomtit">{{name}}所属下级用户</p>
                <el-form :inline="true">
                    <el-form-item>
                        <el-button type="info" size="small" icon="el-icon-back" style="width: 100px" @click="back">返回</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="card-data">
                <el-table ref="mainTable" :height="MAX_TABLE_HEIGHT" :data="tableData" style="width: 100%" size="medium" stripe :cell-style="{textAlign:'center'}"
                :header-cell-style="{textAlign:'center',color:'#102858'}" v-loading='tableLoading'>
                    <el-table-column type="index" label="序号"></el-table-column>
                    <el-table-column prop="account" label="账号" sortable>
                        <template slot-scope="scope">
                            <el-button type="text" @click="godown(scope.row)">{{scope.row.account}}</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column prop="realName" label="真实姓名" sortable></el-table-column>
                    <el-table-column prop="siteName" label="站点名称" sortable></el-table-column>
                    <el-table-column prop="state" label="状态">
                        <template slot-scope="scope">
                            <el-tag type="success" v-if="scope.row.state =='1'">正常</el-tag>
                            <el-tag type="danger" v-else-if="scope.row.state =='2'">冻结</el-tag>
                            <el-tag type="info" v-else>未知状态</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="createDate" label="注册日期" sortable></el-table-column>
                    <el-table-column prop="totalWin" label="总输赢" sortable></el-table-column>
                    <el-table-column prop="" label="操作" width="180" fixed="right">
                        <template slot-scope="scope">
                            <el-button type="primary" size="mini" @click="seedetail(scope.row)">详情</el-button>
                            <template v-if="scope.row.state=='1'">
                                <el-button type="danger" size="mini" @click="changeSiteState(scope.row)">禁用</el-button>
                            </template>
                            <template v-if="scope.row.state=='2'">
                                <el-button type="success" size="mini" @click="changeSiteState(scope.row)">启用</el-button>
                            </template>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="pagination">
                <el-pagination @size-change="sizeChangeHandle" @current-change="currentChangeHandle" :current-page="pageNum" :page-sizes="[10,20,50,100,200]"
                :page-size.sync="queryParams.limit" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
            </div>
            <!-- 新建/更新弹框 -->
            <el-dialog :visible.sync="dialog.visible" width="800px" top="5vh" :close-on-click-modal="false">
                <div class="custom-dialog">
                    <div class="dialog-header">
                        <div class="card-text">
                            <h3>会员详情</h3>
                        </div>
                    </div>
                    <div class="dialog-body">
                        <el-card>
                            <div slot="header" class="clearfix">
                                <span>会员基础信息</span>
                            </div>
                            <el-row>
                                <el-col :span="12">
                                    <div class="text item">
                                        会员账户：{{dialog.data1.account}}
                                    </div>
                                    <div class="text item">
                                        会员类别：{{dialog.data1.levelName = dialog.data1.levelName ? dialog.data1.levelName: "会员"}}
                                    </div>
                                    <div class="text item" v-if="dialog.data1.state == 1">
                                        会员状态：正常
                                    </div>
                                    <div class="text item" v-if="dialog.data1.state == 2">
                                        会员状态：冻结
                                    </div>
                                    <div class="text item">
                                        手机号码：{{dialog.data1.phone = dialog.data1.phone ? dialog.data1.phone: "无"}}
                                    </div>
                                    <div class="text item">
                                        QQ号码：{{dialog.data1.qq = dialog.data1.qq ? dialog.data1.qq: "无"}}
                                    </div>
                                    <div class="text item">
                                        密码：
                                        <el-button type="text" @click="reset" size="mini">重置</el-button>
                                    </div>
                                </el-col>
                                <el-col :span="12">
                                    <div class="text item">
                                        上级：
                                        <el-tag type="primary" size="mini">{{dialog.data1.parentAccount}}</el-tag>
                                    </div>
                                    <div class="text item">
                                        真实姓名：{{dialog.data1.realName}}
                                    </div>
                                    <div class="text item">
                                        注册时间：{{dialog.data1.createDate}}
                                    </div>
                                    <div class="text item">
                                        E-mail：{{dialog.data1.email = dialog.data1.email ? dialog.data1.email: "无"}}
                                    </div>
                                    <div class="text item">
                                        微信号码：{{dialog.data1.weixin = dialog.data1.weixin ? dialog.data1.weixin: "无"}}
                                    </div>
                                    <div class="text item">
                                        最后登录时间：{{dialog.data1.lastLoginDate}}
                                    </div>
                                </el-col>
                            </el-row>
                        </el-card>
                        <el-card>
                            <div slot="header" class="clearfix">
                                <span>账户信息</span>
                            </div>
                            <el-row>
                                <el-col :span="12">
                                    <div class="text item">
                                        账户余额：
                                        <el-tag type="primary" size="mini">{{dialog.data1.money}}</el-tag>
                                    </div>
                                    <div class="text item">
                                        已绑定银行卡：{{dialog.data1.bankAccount = dialog.data1.bankAccount ? dialog.data1.bankAccount: "无"}}
                                    </div>
                                    <div class="text item">
                                        充值次数：{{dialog.data1.rechargeNum}}
                                    </div>
                                    <div class="text item">
                                        提现次数：{{dialog.data1.drawNum}}
                                    </div>
                                    <div class="text item">
                                        提现金额：
                                        <el-tag type="primary" size="mini">{{dialog.data1.drawMoney}}</el-tag>
                                    </div>
                                </el-col>
                                <el-col :span="12">
                                    <div class="text item">
                                        支付宝账户：{{dialog.data1.aliAccountId = dialog.data1.aliAccountId ? dialog.data1.aliAccountId: "无"}}
                                    </div>
                                    <div class="text item">
                                        银行卡名称：{{dialog.data1.bankName = dialog.data1.bankName ? dialog.data1.bankName: "无"}}
                                    </div>
                                    <div class="text item">
                                        充值金额：
                                        <el-tag type="primary" size="mini">{{dialog.data1.rechargeMoney}}</el-tag>
                                    </div>
                                    <div class="text item">
                                        返水金额：
                                        <el-tag type="primary" size="mini">{{parseFloat(dialog.data1.rebateMoney)}}</el-tag>
                                    </div>
                                </el-col>
                            </el-row>
                        </el-card>
                        <el-card>
                            <div slot="header" class="clearfix">
                                <span>会员游戏信息</span>
                            </div>
                            <el-table ref="dialogTable1" :data="dialog.data2" style="width: 100%" size="medium" stripe :cell-style="{textAlign:'center'}"
                            :header-cell-style="{textAlign:'center'}" v-loading='dialog.data2loading'>
                                <el-table-column prop="gameName" label="游戏" sortable></el-table-column>
                                <el-table-column prop="gameNum" label="游戏次数" sortable></el-table-column>
                                <el-table-column prop="money" label="输赢" sortable></el-table-column>
                                <el-table-column prop="lastGameDate" label="最后游戏时间" sortable>
                                    <template slot-scope="scope">
                                        <el-button type="primary" v-if="scope.row.gameName =='总计'" size="mini" @click="gamerecord(scope.row)">游戏明细</el-button>
                                        <span v-else>{{scope.row.lastGameDate}}</span>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-card>
                        <el-card>
                            <div slot="header" class="clearfix">
                                <span>会员活动信息</span>
                            </div>
                            <el-table ref="dialogTable2" :data="dialog.data3" style="width: 100%" size="medium" stripe :cell-style="{textAlign:'center'}"
                            :header-cell-style="{textAlign:'center'}" v-loading='dialog.data3loading'>
                                <el-table-column prop="operDate" label="操作时间" sortable></el-table-column>
                                <el-table-column prop="ip" label="登陆IP" sortable></el-table-column>
                                <el-table-column prop="operation" label="行为" sortable></el-table-column>
                            </el-table>
                        </el-card>
                    </div>
                    <div class="dialog-footer">
                        <el-button type="info" icon="el-icon-back" plain :loading="dialog.loading" @click="dialog.visible=false">返回</el-button>
                    </div>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import request from '@/requests/gameRoomManage'

export default {
    props: ['MAX_TABLE_HEIGHT'],
    data(){
        return{
            level: 1,
            accountId:'',  //ID
            name:'',  //账户名
            fatherId:'', //父级ID
            fatherName:'', // 父级账户名
            grandfaId:'',// 父父级id

            // 查询条件
            queryParams: {
                conditionsMap: {
                    accountType:2,
                    identity:1,
                    parentAccountId:'',
                },
                limit: 10,
                offset: 0,
                sort: 'createDate',
                sortOrder: 'desc',
            },

            //弹框属性
            dialog: {
                visible: false,
                loading: false,
                data1:{}, //会员基础信息
                data2:[], //会员游戏信息
                data2siteId:'',//点击游戏明细需要siteId
                data2acc:'',//点击游戏明细需要accout
                data2loading:false,
                data3:[], //会员活动信息
                data3loading:false
            },

            // 列表属性
            tableData: [],
            tableLoading: false,

            //分页属性
            pageNum: 1,
            pageSize: 10,
            total: 0,
        }
    },
    created(){
        this.accountId = this.$route.params.accountId
        this.name = this.$route.params.name
        this.fatherId = this.$route.params.fatherId

        this.queryParams.conditionsMap.parentAccountId = this.accountId
        this.queryTableData();
    },
    methods:{
        //获取列表
        queryTableData() {
            this.tableLoading = true
            request.getAccounts(this.queryParams).then(res => {
                this.tableLoading = false
                this.tableData = res.rows;
                this.total = res.total;
            })
        },
        //启用/禁用
        changeSiteState(row){
            let msg = row.state == '1' ? '确定禁用账号' : '确定启用账号';
            let msgType = row.state == '1' ? 'error' : 'warning';
            this.$confirm(msg, '提示', {
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                center: true,
                type: msgType
            }).then(() => {
                var data = {
                    state: row.state == 1 ? 2 : 1,
                    account: row.account,
                    id: row.id,
                    accountType: 2,
                    isFlag: 1
                }
                this.tableLoading = true;
                request.updateControlAccount(data).then(res => {
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
        //查看详情按钮
        seedetail(row){
            this.dialog.data2siteId = row.siteId
            this.dialog.data2acc = row.account
            this.getinfo(row.account,row.siteId)
            this.getgameinfolist(row.account,row.siteId)
            this.getOperinfolist(row.account,row.siteId)
        },
        //获取基础信息
        getinfo(account,id){
            request.queryUserDetails({
                account:account,
                siteId:id
            }).then(res => {
                if(res.code == "200"){
                    this.dialog.data1 = res.data
                    this.dialog.visible = true
                }else{
                    this.$notify.error({title:res.msg});
                }
            })
        },
        //获取游戏信息
        getgameinfolist(account,id){
            this.dialog.data2loading = true
            request.getUserGameList({
                conditionsMap: {
                    account:account,
                    siteId:id
                },
                limit: 10,
                offset: 0,
                sort: "lastGameDate",
                sortOrder: 'desc',
            }).then(res => {
                this.dialog.data2loading = false
                this.dialog.data2 = res.rows
                this.dialog.visible = true
            })
        },
        //获取活动信息
        getOperinfolist(account,id){
            this.dialog.data3loading = true
            request.getUserOperList({
                conditionsMap: {
                    userName:account,
                    siteId:id
                },
                limit: 10,
                offset: 0,
                sort: "createDate",
                sortOrder: 'desc',
            }).then(res => {
                this.dialog.data3loading = false
                this.dialog.data3 = res.rows
                this.dialog.visible = true
            })
        },
        //游戏明细页面
        gamerecord(row){
            this.$router.push({
                path: '/gameRecord',
                name: '游戏记录',
                params: {
                    siteId: this.dialog.data2siteId,
                    account: this.dialog.data2acc
                }
            })
        },
        //重置密码
        reset(){

        },
        //返回按钮
        back(){
            if (this.level === 1) {
                this.$router.push({path: '/gameRoomManage'})
            } else {
                this.queryParams.conditionsMap.parentAccountId = this.$route.params.fatherId
                this.name = this.fatherName
                this.queryTableData();
                this.$router.push({
                    path: `/childAccountList/AccountId=${this.fatherId}&name=${this.fatherName}&parentAccountId=${this.grandfaId}`
                });
                // this.$router.push({
                //     name: '下级列表',
                //     params: {
                //         accountId: this.fatherId,
                //         name:this.fatherName,
                //         fatherId:this.grandfaId
                //     }
                // });
            }
            this.level--
        },
        //点击账号 跳转下级页面
        godown(row){
            this.level++
            this.queryParams.conditionsMap.parentAccountId = row.id
            this.grandfaId = this.fatherId
            this.fatherId = row.parentAccountId
            this.fatherName = this.name
            this.name = row.account
            this.queryTableData()
            // this.$router.push({
            //     name: '下级列表',
            //     params: {
            //         accountId: row.id,
            //         name:row.account,
            //         fatherId:row.parentAccountId
            //     }
            // });
            this.$router.push({
                path: `/childAccountList/AccountId=${row.id}&name=${row.account}&parentAccountId=${row.parentAccountId}`
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

<style lang="scss">
.childroomtit{margin-bottom: 10px;font-weight: 600}
.childAcc{
    .el-card{
        margin-bottom: 15px;
        .el-card__header{

            color: #fff;
            font-weight: 600
        }
        .text {
            font-size: 14px;
        }
        .item {
            padding: 10px 0;
            font-weight: 600;
            color: #676a6c;
        }
    }
    .el-card:nth-child(1) .el-card__header,.el-card:nth-child(2) .el-card__header{
        background: #008afb;
    }
    .el-card:nth-child(3) .el-card__header,.el-card:nth-child(4) .el-card__header{
        background: #23c6c8;
    }
}

</style>




