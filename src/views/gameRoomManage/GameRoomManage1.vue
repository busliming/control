<template>
  <div class="card card-primary site-manage">
    <div class="card-header">
      <div class="card-text">
        <h3>厅主-列表</h3>
      </div>
    </div>
    <div class="card-body">
      <div class="toolbar">
        <el-form :model="queryParams" :inline="true" label-width="150px">
          <el-form-item label="状态：">
            <el-select size="small" v-model="queryParams.conditionsMap.state" placeholder="全部">
              <el-option label="全部" value=''></el-option>
              <el-option label="正常" value="1"></el-option>
              <el-option label="冻结" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="账号：">
            <el-input clearable label-width="180px;" size="small" v-model="queryParams.conditionsMap.account" placeholder="账号"></el-input>
          </el-form-item>
          <el-form-item label="真实姓名：">
            <el-input clearable size="small" v-model="queryParams.conditionsMap.realName" placeholder="真实姓名"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="queryTableData('search')" style="width: 180px; margin-left: 150px;" size="small" type="primary" icon="el-icon-search">查询</el-button>
          </el-form-item>
        </el-form>
        <hr />
        <el-button @click='handleAdd' style="width: 120px; margin-bottom: 15px;" type="primary" icon="el-icon-circle-plus" size="small">添加</el-button>
        <div class="card-data">
          <el-table
            height="620"
            :data="tableData"
            stripe
            :cell-style="{textAlign: 'center'}"
            :header-cell-style="{textAlign:'center', color: '#000'}"
            style="width: 100%; border-radius: 4px;"
            v-loading="loading"
            size='small'
          >
            <el-table-column type="index" label="序号"></el-table-column>
            <el-table-column prop="account" sortable label="账号">
              <template slot-scope="scope">
                <el-button type='text'>{{scope.row.account}}</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="realName" sortable label="真实姓名"></el-table-column>
            <el-table-column prop="siteName" sortable label="站点名称"></el-table-column>
            <el-table-column prop="state" label="状态">
              <template slot-scope="scope">
                <el-tag v-if="scope.row.state==1" type='success'>正常</el-tag>
                <el-tag v-else-if="scope.row.state==2" type='warning'>冻结</el-tag>
                <el-tag v-else type='info'>未知状态</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="createDate" sortable label="注册日期"></el-table-column>
            <el-table-column prop="" label="操作" fixed="right" width='220'>
              <template slot-scope="scope">
                <el-button size="small" @click='handleEdit(scope.$index, scope.row)'>编辑</el-button>
                <el-button size="small" type="warning">游戏</el-button>
                <el-button size="small" :type="scope.row.state == 1?'danger': 'success'" @click="handleTogglestate(scope.row)">{{scope.row.state == 1?'禁用': '启用'}}</el-button>
                <!-- <el-button size="small" type="success" v-else>启用</el-button> -->
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="pagination">
          <el-pagination @size-change="handleSizeChange" @current-change='handleCurrentChange' layout="total,sizes,prev,pager,next,jumper" :page-size.sync="queryParams.limit" :current-page="pageNum" :total='total' :page-sizes="[10,20,50,100,200]"></el-pagination>
        </div>
      </div>
      <el-dialog center :close-on-click-modal="false" :close-on-press-escape='false'  width="550px" top='20vh' :visible.sync='dialog.show'>
        <div class="custom-dialog">
          <div class="dialog-header">
            <div class="card-text">
              <h3>{{dialog.type === 'edit'?'编辑用户': '添加用户'}}</h3>
            </div>
          </div>
          <div class="dialog-body">
            <el-row>
              <el-form :model='formData' ref='dialogForm' label-width='80px' label-position="right">
                <el-col :span='24'>
                  <el-form-item label='厅主账号: ' prop='account' >
                    <el-input clearable type='text' v-model="formData.account" :disabled='dialog.accountDisabled'></el-input>
                  </el-form-item>
                  <el-form-item label='密码: ' prop='password' >
                    <el-input clearable type='password' v-model="formData.password"></el-input>
                  </el-form-item>
                  <el-form-item label='真实姓名: ' prop='realName'>
                    <el-input clearable type='text' v-model="formData.realName"></el-input>
                  </el-form-item>
                  <el-form-item label='手机号码: ' prop='phone'>
                    <el-input clearable type='text' v-model="formData.phone"></el-input>
                  </el-form-item>
                  <el-form-item label='QQ号码: ' prop='qq'>
                    <el-input clearable type='text' v-model="formData.qq"></el-input>
                  </el-form-item>
                  <el-form-item label='微信号码: ' prop='weixin'>
                    <el-input clearable type='text' v-model="formData.weixin"></el-input>
                  </el-form-item>
                  <el-form-item label='厅主状态:' prop='state'>
                    <el-select v-model="formData.state">
                      <el-option label='启用' value='1'>启用</el-option>
                      <el-option label='禁用' value='2'>禁用</el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-form>
            </el-row>
          </div>
          <div class="dialog-footer">
            <el-button type='danger' icon='el-icon-error' plain>取消</el-button>
            <el-button type='primary' @click='handleConfirm' icon='el-icon-success'>确认</el-button>
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import request from "../../requests/gameRoomManage/index";
import exp from '../../tools/regexp.js';
export default {
  data() {
    return {
      // 查询条件
      queryParams: {
        conditionsMap: {
          account: "",
          accountType: 1,
          state: "",
          realName: ""
        },
        limit: 10,
        offset: 0,
        sort: "createDate",
        sortOrder: "desc"
      },

      // 分页属性
      total: 0,
      pageNum: 1,
      pageSize: 10,

      // 表格属性
      tableData: [],
      loading: false,

      // 弹窗属性
      dialog: {
        show: false,
        type: 'edit',
        accountDisabled: true
      },
      formData: {
        id: '',
        account: '',
        password: '',
        realName: '',
        phone: '',
        qq: '',
        weixin: '',
        state: '1',
        accountType: '1',
        siteId: ''
      }
    };
  },
  created() {
    this.queryTableData()
  },
  methods: {
    queryTableData(type) {
      if(type === 'search'){
        this.pageNum = 1
        this.queryParams.limit = 10
        this.queryParams.offset = 0
      }
      this.loading = true
      request.getAccounts(this.queryParams).then(res => {
        this.loading = false
        res.rows.forEach(item => {
          item.state = String(item.state)
        })
        this.tableData = res.rows
        this.total = res.total
      })
    },
    handleSizeChange(size){
      this.queryParams.limit = size
      this.queryTableData()
    },
    handleCurrentChange(page){
      this.pageNum = page
      this.queryParams.offset = (page - 1)*this.queryParams.limit;
      this.queryTableData()
    },
    // 编辑数据
    handleEdit(index,row){
      this.dialog.type = 'edit';
      this.dialog.show = true;
      this.setDialog(row)
    },
    // 弹窗中的确认按钮
    handleConfirm(type){
      let str = this.dialog.type === 'edit' ? 'updateControlAccount' : 'addControlAccount'
      try {
        if( this.formData.account === ''){
          throw '请输入会员账号'
        } else if ( !exp.account.test(this.formData.account)) {
          throw '请输入6-14位字母加数字的用户账号'
        }
        if(this.formData.password === ''){
          throw '请输入密码'
        } else if (!exp.pwd.test(this.formData.password)){
          throw '请输入6-14位字母加数字的密码'
        }
        if(this.formData.phone !== '' && !exp.phone.test(this.formData.phone)){
          throw '手机号码不可用'
        }
        if(this.formData.qq !== '' && !exp.qq.test(this.formData.qq)){
          throw '请输入5-11位的QQ号码'
        }
        if(this.formData.weixin !== '' && !exp.weixin.test(this.formData.weixin)){
          throw '请输入6-20位的微信号码'
        }
      } catch (e) {
        this.$message.error(e)
        return false
      }
      
      request[str](this.formData).then(res => {      
        if(res.code === '200'){
          this.$notify.success(res.msg)
          this.queryTableData()
        } else {
          this.$notify.error({title: res.msg})
        }
      })
      this.dialog.show = false;
    },
    // 添加数据
    handleAdd(){
      this.dialog.type = 'add';
      this.dialog.show = true;
      this.dialog.accountDisabled = false;
      this.setDialog({
        state: '1',
        accountType: '1'
      })
    },
    // 切换启用和禁用按钮
    handleTogglestate(row){
      console.log(row)
      let msg = row.state == 1? '确定禁用吗?': '确定启用吗?';
      let msgType = row.state == 1 ? 'error' : 'warning';
      this.$confirm(msg,'温馨提示',{
        confirmButtonText: '确定',
        canleButtonText: '取消',
        type: msgType,
        center: true
      }).then(() => {
        const data = {
          id: row.id,
          account: row.account,
          state: row.state == 1? 2: 1,
          accountType: '1',
        }
        this.loading = true
        request.updateControlAccount(data).then(res => {
          if(res.code === '200'){
            this.queryTableData()
            this.$notify.success('设置成功')
          } else {
            this.$notify.error(res.msg)
          }
          this.loading = false;

        })
        
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    // 重置弹窗数据
    setDialog(obj){
      for (const key in this.formData) {
           this.formData[key]= obj[key] ? obj[key] : '';
      }
    }
  },
  components: {}
};
</script>

<style lang='scss'>

</style>
