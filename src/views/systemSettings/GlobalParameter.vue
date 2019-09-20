<template>
    <div class="card card-primary globalPar">
        <div class="card-header">
            <div class="card-text">
                <h3>全局参数</h3>
            </div>
        </div>
        <div class="card-body">
            <el-card class="box-card">
                <el-form ref="form" :model="form" label-width="150px" style="overflow:hidden">
                    <p class="tit">所有门户站点开网咨询邮箱</p>
                    <el-col :span="22">
                        <el-form-item label="开网咨询邮箱：">
                            <el-input v-model="form.email"></el-input>
                        </el-form-item>
                        <el-form-item label="" label-width="0">
                            <el-button type="primary" icon="el-icon-success" style="margin:20px 0 10px 40%;width:35%;" @click="save" :loading="form.loading">
                                保存
                            </el-button>
                        </el-form-item>
                    </el-col>
                </el-form>
            </el-card>
            <el-card class="box-card">
                <el-form ref="form" :model="form" label-width="150px" style="overflow:hidden">
                    <p class="tit">游戏记录补偿</p>
                    <el-col :span="22">
                        <el-form-item label="参数：">
                            <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="recordForm.textarea"></el-input>
                        </el-form-item>
                        <el-form-item label="" label-width="0">
                            <el-button type="primary" icon="el-icon-success" style="margin:20px 0 10px 40%;width:35%;" @click="recordSave" :loading="recordForm.loading">
                                保存
                            </el-button>
                        </el-form-item>
                    </el-col>
                </el-form>
            </el-card>
        </div>
    </div>
</template>

<script>
import request from '@/requests/systemSettings/GlobalParameter'

export default {
    data(){
        return{
            form:{
                email:'',//咨询邮箱 默认为wgqpcloud@gmail.com
                loading:false,
            },
            recordForm:{
                textarea:'',//游戏记录补偿
                loading:false,
            }
        }
    },
    mounted(){
        this.getparam()
    },
    methods:{
        //获取参数
        getparam(){
            request.getGlobalStockWeak().then(res => {
                if (res.code === '200') {
                    this.form.email = res.data.consulMailbox
                } else {
                    this.$notify.error({title:res.msg});
                }
            })
        },
        //修改保存按钮
        save(){
            try{
                if(this.form.email === ''){
                    throw '开户咨询邮箱不能为空'
                }
            }
            catch (e) {
                this.$message.error(e);
                return false
            }

            this.form.loading = true;
            request.editGlobalStockWeak({
                consulMailbox:this.form.email
            }).then(res => {
                this.form.loading = false;
                if (res.code === '200') {
                    this.$notify.success({title:res.msg});
                } else {
                    this.$notify.error({title:res.msg});
                }
            })
        },
        //游戏记录补偿
        recordSave(){
            try{
                if(this.recordForm.textarea === ''){
                    throw '游戏记录补偿参数不能为空'
                }
            }
            catch (e) {
                this.$message.error(e);
                return false
            }

            this.recordForm.loading = true;
            request.gameRecordMakeUp({
                record:this.recordForm.textarea
            }).then(res => {
                this.recordForm.loading = false;
                if (res.code === '200') {
                    this.$notify.success({title:res.msg});
                } else {
                    this.$notify.error({title:res.msg});
                }
            })
        },
    }
}
</script>

<style>
.globalPar .box-card{width:45%;margin: 20px 2% 50px 2%}
.globalPar .card-body .el-form-item__label{font-size: 15px;font-weight: 600;color: #606266}
.globalPar .tit{text-align: center;margin: 20px 0 30px 0;font-weight: 600;color: #606266;font-size: 18px}
</style>


