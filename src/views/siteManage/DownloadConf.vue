<template>
    <div class="card card-primary">
        <div class="card-header">
            <div class="card-text">
                <h3>下载配置</h3>
            </div>
        </div>
        <div class="card-body">
            <div class="toolbar">
                <el-row>
                    <el-col :span="4" :offset="20" style="text-align: right; margin-bottom: 20px">
                        <el-button type="info" size="small" icon="el-icon-back" style="width: 100px" @click="goBack">
                            返回站点
                        </el-button>
                    </el-col>
                </el-row>
            </div>
            <div class="card-data">
                <el-table
                        :data="tableData"
                        style="width: 100%"
                        size="medium"
                        stripe
                        empty-text="no data"
                        :cell-style="{textAlign:'center'}"
                        :header-cell-style="{textAlign:'center'}"
                        v-loading='tableLoading'>
                    <el-table-column
                            prop="apkType"
                            label="类型">
                    </el-table-column>
                    <el-table-column
                            prop="version"
                            label="当前版本">
                    </el-table-column>
                    <el-table-column
                            prop="supportOs"
                            label="系统支持">
                    </el-table-column>
                    <el-table-column
                            prop="fileSize"
                            label="文件大小">
                    </el-table-column>
                    <el-table-column
                            prop="fileUrl"
                            label="路径"
                            :formatter="displayUrl">
                    </el-table-column>
                    <el-table-column
                            prop="updateDateStr"
                            label="编辑时间">
                    </el-table-column>
                    <el-table-column
                            prop="updateBy"
                            label="操作人">
                    </el-table-column>
                    <el-table-column
                            prop=""
                            label="操作">
                        <template slot-scope="scope">
                            <el-button size="mini" type="default" plain
                                       @click="edit(scope.row)">
                                编辑
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="pagination">
            </div>
            <el-dialog :visible.sync="editDialog.visible" width="600px">
                <div class="custom-dialog">
                    <div class="dialog-header">
                        <div class="card-text">
                            <h3>编辑</h3>
                        </div>
                    </div>
                    <div class="dialog-body">
                        <el-form label-width="120px">
                            <el-form-item label="类型：">
                                <el-input type="text" readonly size="small"
                                          v-model="formData.apkType"></el-input>
                            </el-form-item>
                            <el-form-item label="绑定ID：" v-if="editDialog.type==='IOS'">
                                <el-input type="text" clearable size="small"
                                          v-model="formData.bundleId"></el-input>
                            </el-form-item>
                            <el-form-item label="当前版本：">
                                <el-input type="text" clearable size="small"
                                          v-model="formData.version"></el-input>
                            </el-form-item>
                            <el-form-item label="系统支持：">
                                <el-input type="text" clearable size="small"
                                          v-model="formData.supportOs"></el-input>
                            </el-form-item>
                            <el-form-item label="安装包名称：">
                                <el-input type="text" clearable size="small"
                                          :readonly="fileList.length>0"
                                          v-model="formData.fileName"></el-input>
                            </el-form-item>
                            <el-form-item label="上传安装包：">
                                <div class="form-group">
                                    <el-upload
                                            action='string'
                                            :http-request='fileUpload'
                                            :on-remove="handleChange"
                                            :on-change="handleChange"
                                            :file-list="fileList"
                                            list-type="text"
                                            :before-upload="beforeUpload"
                                            :disabled='fileList.length>0'
                                    >
                                        <el-button size="small" type="primary">上传文件</el-button>
                                        <el-button size="small" @click='handleRemove' type="danger"
                                                   v-if="fileList.length>0&&!editDialog.uploading"
                                                   style="margin-left:10px;"
                                        >删除已上传安装包
                                        </el-button>
                                    </el-upload>
                                    <el-tag type="primary" v-if='editDialog.uploading'>
                                        {{progressStr === 100 ? '请稍候...': (progressStr +'%')}}
                                    </el-tag>
                                </div>
                            </el-form-item>
                        </el-form>
                    </div>
                    <div class="dialog-footer">
                        <el-button type="danger" icon="el-icon-error" plain
                                   :loading="editDialog.loading"
                                   @click="editDialog.visible=false">
                            取消
                        </el-button>
                        <el-button type="primary" icon="el-icon-success"
                                   :loading="editDialog.loading"
                                   @click="updateConf">
                            保存
                        </el-button>
                    </div>
                </div>
            </el-dialog>
        </div>
    </div>
</template>
<script>
    import request from '@/requests/siteManage'

    export default {
        data() {
            return {
                //查询条件
                queryParams: {
                    apkType: '',
                    siteId: ''
                },
                // 域名列表属性
                tableData: [],
                tableLoading: false,
                // 编辑弹框的属性
                editDialog: {
                    type: '',
                    visible: false,
                    loading: false,
                    uploading: false
                },
                file: null,
                fileList: [],
                progressStr: '',
                formData: {
                    id: '',
                    bundleId: '',
                    apkType: '',
                    apkName: '',
                    version: '',
                    supportOs: '',
                    fileName: '',
                    fileSize: '',
                    fileUrl: '',
                },
            }
        },
        watch: {
            'editDialog.uploading'(val) {
                this.editDialog.loading = val;
            },
            fileList(val) {
                console.log(val)
            }
        },
        methods: {
            // 获取下载配置列表
            queryTableData() {
                this.tableLoading = true;
                request.getSiteDownloadSetList(this.queryParams).then(res => {
                    this.tableLoading = false;
                    if (res.code === '200') {
                        this.tableData = res.data;
                    } else {
                        this.$notify.error({title:res.msg})
                    }
                })
            },
            // 显示文件路径
            displayUrl(row) {
                if (row.fileUrl !== null && row.fileUrl !== undefined) {
                    return row.fileUrl.substr(row.fileUrl.lastIndexOf('/') + 1)
                } else {
                    return ''
                }
            },
            // 返回
            goBack() {
                this.$router.push('/siteManage')
            },
            // 编辑下载配置
            edit(row) {
                for (let i in this.formData) {
                    this.formData[i] = row[i];
                }
                if (row.fileUrl) {
                    this.fileList = [{
                        name: row.apkName.slice(row.apkName.lastIndexOf('/') + 1),
                        url: row.fileUrl
                    }]
                } else {
                    this.fileList = []
                }
                this.editDialog.type = row.apkType;
                this.editDialog.visible = true;
            },
            // 提交下载配置
            updateConf() {
                try {
                    if (!this.formData.fileUrl) throw '请上传文件！ ';
                    if (!this.formData.fileName) throw '请输入安装包名称！'
                }
                catch (e) {
                    this.$message.warning(e);
                    return
                }
                let self = this.formData.fileUrl;
                this.formData.fileUrl = self.substr(self.lastIndexOf('/') + 1);
                this.editDialog.loading = true;
                request.addOrUpdateSiteDownloadSet(this.formData).then(res => {
                    this.editDialog.loading = false;
                    if (res.code === '200') {
                        this.$notify.success({title:res.msg})
                        this.editDialog.visible = false;
                        this.queryTableData()
                    } else {
                        this.$notify.error({title:res.msg})
                    }
                })
            },
            //除上传文件事件
            beforeUpload(file) {
                this.file = file;
                let fileCheck = this.editDialog.type === 'Android' ? 'apk' : 'ipa';
                let extension = file.name.split('.').pop();
                if (this.editDialog.type === 'IOS') {
                    if (!this.formData.bundleId || this.formData.bundleId === '无') {
                        this.$message.warning('请输入绑定ID！');
                        return false;
                    }
                }
                if (!this.formData.fileName) {
                    this.$message.warning('请输入安装包名称！');
                    return false;
                }
                if (extension !== fileCheck) {
                    this.$message.warning('请上传' + fileCheck + '的文件！');
                    return false;
                }
            },
            handleChange(file, fileList) {
                this.fileList = fileList;
            },
            fileUpload(file) {    //文件上传
                this.file = file;
                this.uploadFile(file.file, 4, this.formData.fileName, this.formData.bundleId)
            },
            uploadFile(file, pathType, fileName, bundleId) {
                this.editDialog.uploading = true;
                let data = {
                    siteId: this.queryParams.siteId,
                    file: file,
                    pathType: pathType,
                    fileName: fileName,
                    bundleId: bundleId,
                    progcallback: e => {
                        this.progressStr = ((e.loaded / e.total) * 100 | 0);
                    }
                };
                request.uploadFile(data).then(res => {
                    if (res.code === '200') {
                        this.fileList[0].url = res.data.url;
                        this.fileList[0].name = res.data.url.slice(res.data.url.lastIndexOf('/') + 1);
                        this.formData.apkName = res.data.url.slice(res.data.url.lastIndexOf('/') + 1);
                        this.formData.fileUrl = res.data.url.slice(res.data.url.lastIndexOf('/') + 1);
                        this.formData.fileSize = res.data.fileSize;
                        this.$notify.success({title:res.msg});
                        this.editDialog.uploading = false;
                    } else {
                        this.fileList = [];
                        this.$notify.warning({title:res.msg});
                        this.editDialog.uploading = false;
                    }
                }).catch(err => {
                    console.log(err);
                    this.fileList = [];
                    this.editDialog.uploading = false;
                })
            },
            handleRemove(file, fileList) {
                file = null;
                fileList = null;
                this.fileList = [];
                this.formData.fileUrl = null;
            },
        },
        created() {
            this.queryParams.siteId = this.$route.params.siteId;
            this.queryTableData()
        }
    }
</script>
