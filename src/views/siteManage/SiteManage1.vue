<template>
  <div class="card card-primary site-manage">
    <div class="card-header">
      <div class="card-text">
          <h3>站点/列表</h3>
      </div>
    </div>
    <div class="card-body">
        <div class="toolbar">
            <el-form label-width="130px" :inline='true' size="medium" :model="queryParams">
                <el-form-item label="名称/网址:">
                  <el-input placeholder="请输入网址" v-model="queryParams.conditionsMap.siteName"></el-input>
                </el-form-item>
                <el-form-item label="所属厅主:">
                  <el-input placeholder="请输入厅主名字" v-model="queryParams.conditionsMap.account"></el-input>
                </el-form-item>
                <el-form-item label="维护状态:">
                  <el-select v-model="queryParams.conditionsMap.maintainStatus">
                    <el-option value="" label="全部"></el-option>
                    <el-option value="1" label="维护中"></el-option>
                    <el-option value="2" label="正常"></el-option>
                  </el-select>  
                </el-form-item>
                <el-form-item label="维护时间:">
                  <el-date-picker value-format='yyyy-MM' type="daterange" v-model="daterange" align='right' range-separator="~" start-placeholder="维护开始时间" end-placeholder="维护结束时间"></el-date-picker>
                </el-form-item>
                <el-form-item label="站点状态:">
                  <el-select v-model="queryParams.conditionsMap.status">
                    <el-option value="" label="全部"></el-option>
                    <el-option value="1" label="启用"></el-option>
                    <el-option value="2" label="禁用"></el-option>
                  </el-select>  
                </el-form-item>
                <el-form-item label="">
                  <el-button type="primary" style="margin-left:130px; width:180px;" icon="el-icon-search">搜索</el-button>
                </el-form-item>
            </el-form>
            <hr style="margin: 15px 0;">
            <el-form :inline="true" >
              <el-form-item size="small">
                <el-button  style="width:100px;">添加站点</el-button>
                <el-button  type="success" style="width:100px;">批量启用</el-button>
                <el-button  type="danger" style="width:100px;">批量禁用</el-button>
                <el-button  type="warning" style="width:100px;">批量维护</el-button>
                <el-button  type="primary" style="width:140px;">所有站点维护</el-button>
                <el-button  type="info" style="width:100px;">批量删除</el-button>       
              </el-form-item>
            </el-form>
        </div>
        <div class="card-data">
          <el-table height="440" stripe :data="tableData" size="medium" v-loading='tableLoading' ref="mainTable" style="width: 100%;" tooltip-effect="dark" >
            <el-table-column type="selection" align="center" width="55"></el-table-column>
            <el-table-column label="站点名称" align="center" prop='siteName'></el-table-column>
            <el-table-column label="网址" align="center" prop="wsUrl"></el-table-column>
            <el-table-column label="所属厅主" align="center" prop="account"></el-table-column>
            <el-table-column label="站点状态" align="center" prop="">
              <template slot-scope='scope'>
                <el-tag type='success' v-if="scope.row.status == '1'">启用</el-tag>
                <el-tag type='danger' v-else-if="scope.row.status == '0'">禁用</el-tag>
                <el-tag type='info' v-else>未知状态</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="维护状态" align="center" prop="">
              <template slot-scope='scope'>
                <el-tag type='warning' v-if="scope.row.maintainStatus == '1'">维护中</el-tag>
                <el-tag type='success' v-else-if="scope.row.maintainStatus == '0'">正常</el-tag>
                <el-tag type='info' v-else>未知状态</el-tag>
                <!-- <el-tag :type="scope.row.maintainStatus == '0'?'success':'danger' " >{{scope.row.maintainStatus == '0'?'正常':'维护中'}}</el-tag> -->
              </template>
            </el-table-column>
            <el-table-column label="预计维护时间(北京)" align="center" prop="eventStart" :formatter='displayMaintenance'></el-table-column>
            <el-table-column label="操作" align="center"  prop="" width="500" fixed="right">
              <template slot-scope="scope">
                <el-button size='small' @click="handleEdit(scope.row)">编辑</el-button>
                <el-button size='small' type="primary">域名绑定</el-button>
                <el-button size='small' type="danger">禁用</el-button>
                <el-button size='small' type="warning">维护</el-button>
                <el-button size='small' type="info" icon="el-icon-down">下载配置</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="pagination">
          <el-pagination @size-change='handleSizeChange' @current-change='handleCurrentChange' :page-size="queryParams.limit" :page-sizes="[10,15,20,50,100]" :current-page.sync="pageNum" layout='total,sizes,prev,pager,next,jumper' :total="total"></el-pagination>
        </div>
        <el-dialog width="820px" :visible.sync='dialog.show' >
          <div class="custom-dialog">
            <div class="dialog-header">
              <div class="card-text">
                <h3>编辑站点</h3>
              </div>
            </div>
            <div class="dialog-body">
              <el-form label-width="140px" :data='formData'  label-position="right">
                <el-card>
                  <el-row>
                    <el-col :span='16' :offset='4'>                      
                        <el-form-item label="站点名称: ">
                          <el-input clearable type='text' size='small' v-model="formData.siteName"></el-input>
                        </el-form-item>
                        <el-form-item label="站点账号: ">
                          <el-input clearable type='text' size='small' v-model="formData.account"></el-input>
                        </el-form-item>
                        <el-form-item label="站点文件夹: ">
                          <el-input clearable type='text' size='small' v-model="formData.siteFolder"></el-input>
                        </el-form-item>
                        <el-form-item label="站点域名: ">
                          <el-input clearable type='text' size='small' v-model="formData.domianUrl"></el-input>
                        </el-form-item>                      
                        <el-form-item label="代理长链接: ">
                          <el-input clearable type='text' size='small' v-model="formData.wsUrl"></el-input>
                        </el-form-item>                      
                        <el-form-item label="短信签名: ">
                          <el-input clearable type='text' size='small' v-model="formData.smsSignature"></el-input>
                        </el-form-item>                      
                        <el-form-item label="第三方下载AppKey: ">
                          <el-input clearable type='text' size='small' v-model="formData.appKey"></el-input>
                        </el-form-item>                      
                        <el-form-item label="AppID: ">
                          <el-input clearable type='text' size='small' v-model="formData.pushAppId"></el-input>
                        </el-form-item>                      
                        <el-form-item label="AppSecret: ">
                          <el-input clearable type='text' size='small' v-model="formData.pushAppSecret"></el-input>
                        </el-form-item>                      
                        <el-form-item label="AppKey: ">
                          <el-input clearable type='text' size='small' v-model="formData.pushAppKey"></el-input>
                        </el-form-item>                      
                        <el-form-item label="MasterSecret: ">
                          <el-input clearable type='text' size='small' v-model="formData.pushMasterSecret"></el-input>
                        </el-form-item>                      
                        <el-form-item label="站点状态: " size='small'>
                          <el-select v-model="formData.status">
                            <el-option value="0" label="启用">启用</el-option>
                            <el-option value="1" label="禁用">禁用</el-option>
                          </el-select>
                        </el-form-item>                      
                    </el-col>
                  </el-row>
                </el-card>
                <el-card style=" margin-top: 15px;">
                  <h3>游戏</h3>
                </el-card>
              </el-form>
            </div>
          </div>
        </el-dialog>
    </div>
  </div>
</template>

<script>
import request from '../../requests/siteManage'
export default {
  data () {
    return {
      // 查询条件
      queryParams: {
        conditionsMap: {
          siteName: '',
          account: '',
          maintainStatus: '',
          status: '',
          eventStart: '',
          eventEnd: ''
        },
        limit: 10,
        offset: 0,
        sort: 'createDate',
        sortOrder: 'desc'
      },
      daterange: '',
      // 表格属性
      tableData: [],
      tableLoading: false,
      // 分页属性
      pageNum: 1,
      pageSize: 10,
      total: 0,
      // 弹窗属性
      dialog: {
        show: false,
        type: ''
      },
      // 站点信息
      formData: {
        conditionsMap: {
          gameList: []
        },
        siteId: '',
        siteName: '',
        account: '',
        siteFolder: '',
        domains: [],
        domianUrl: '',
        wsUrl: '',
        stationMark: '',
        smsSignature: '',
        status: '',
        appKey: '',
        pushAppId: '',
        pushAppSecret: '',
        pushAppKey: '',
        pushMasterSecret: ''
      },
      // 编辑菜单中的gameList
      gameList: []
    }
  },
  created() {
    this.queryTableData()
  },
  methods: {
    queryTableData(){
      this.tableLoading = true
      request.siteList(this.queryParams).then(res => {
        this.tableLoading = false
        console.log(res.Pagination.rows)
        this.tableData = res.Pagination.rows
        this.total = res.Pagination.total
      })
    },
    handleSizeChange(size){
      this.queryParams.limit = size
      this.queryTableData()
    },
    handleCurrentChange(page){
      this.queryParams.offset = (page-1)*this.queryParams.limit
      this.queryTableData()
    },
    displayMaintenance(row){
      if(row.eventStart === null && row.eventEnd === null){
        return '-'
      } else if (row.eventStart === null){
        return '~' + row.eventEnd
      } else if (row.eventEnd === null) {
        return row.eventStart + '~'
      } else {
        return row.eventStart + '~' + row.eventEnd
      }
    },
    handleEdit(row){
      console.log(row)
      this.dialog.type = 'edit'
      this.dialog.show = true
      // for (const key in this.formData) {
      //   this.formData[key] === row[key]?row[key]: ''        
      // }
      let params = {sitedId: row.siteId}
      request.getPayTypeListAndGameList(params).then(res => {
        if (res.code === '200') {
          this.gameList = res.data.gameList
          this.setDialogData(row, res.data.gameList)
        } else {
          this.$notify.error(res.msg)
          this.dialog.show = false
        }

      })
      this.formData = row
      console.log('---------')
      console.log(this.formData)
    }
  },
  setDialogData(obj,gameList){
    for (const item in this.formData) {   
      if(item)
        
    }
  },
  components: {

  }
}
</script>

<style lang='scss'>
.site-manage {
    #site-add-edit {
        .el-input__inner {
            text-align: left;
        }
    }
}
.page-contents .el-input__inner{
  text-align: left;
}
</style>
