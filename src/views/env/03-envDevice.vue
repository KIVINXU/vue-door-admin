<template>
  <div>
    <el-row class="el-table-margin">
      <el-col :md="12" :offset="6">
        <el-select v-model="listQuery.key"
                   style="width: 100px"
                   @focus="handleFocus"
                   placeholder="查询对象">
          <el-option
            v-for="item in searchOption"
            :key="item.key"
            :label="item.label"
            :value="item.key">
          </el-option>
        </el-select>
        <el-input placeholder="请输入查询内容"
                  style="width: 30%;"
                  clearable
                  :disabled="listQuery.key === ''"
                  v-model.trim="listQuery.value"
                  @clear="getList()"
                  @keyup.enter.native="handleFilter(1)">
        </el-input>
        <el-button
          type="info" plain
          @click="handleFilter(1)"
          :disabled="listQuery.key === ''
            || listQuery.value === ''"
          icon="el-icon-search">查询
        </el-button>
        <el-button
          icon="el-icon-search"
          type="info" plain
          @click="handleExtFilter(1)"
          :disabled="listQuery.key === ''
            || listQuery.value === ''">相似</el-button>
      </el-col>
      <el-col :md="6">
        <el-button-group>
          <el-button type="primary" icon="el-icon-plus"
                     @click="handleCreate"></el-button>
          <el-button type="primary" icon="el-icon-edit"
                     @click="handleUpdate(list[currentRowIndex])"
                     :disabled="currentRowIndex === -1"></el-button>
          <el-button type="primary" icon="el-icon-delete"
                     @click="handleDelete(currentRowIndex)"
                     :disabled="currentRowIndex === -1"></el-button>
        </el-button-group>
        <el-dropdown>
          <el-button type="primary" icon="el-icon-share">
            <i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <el-button type="text" icon="el-icon-upload">
                导入
              </el-button>
            </el-dropdown-item>
            <el-dropdown-item>
              <el-button type="text" icon="el-icon-download">
                导出
              </el-button>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-table :data="list" border
                  ref="equipmentsTable"
                  highlight-current-row
                  @current-change="handleCurrentChange"
                  @row-dblclick="handleUpdate">
          <el-table-column prop="id" :show-overflow-tooltip="true" label="编号"></el-table-column>
          <el-table-column prop="name" :show-overflow-tooltip="true" label="名称"></el-table-column>
          <el-table-column prop="ip" :show-overflow-tooltip="true" label="IP地址"></el-table-column>
          <el-table-column prop="port" :show-overflow-tooltip="true" label="端口号"></el-table-column>
          <el-table-column prop="place" :show-overflow-tooltip="true" label="位置"></el-table-column>
          <el-table-column prop="flag" :show-overflow-tooltip="true" label="状态"></el-table-column>
          <el-table-column prop="descr" :show-overflow-tooltip="true" label="说明"></el-table-column>
        </el-table>
      </el-col>
      <!-- /.表格结束 -->
    </el-row>
    <el-row>
      <el-col :xs="18" :sm="18" :md="10" :lg="8">
        <!--分页条-->
        <el-pagination
          style="margin-top: 10px;margin-left: -9px;"
          background
          @size-change="handleSizeChange"
          @current-change="handlePageChange"
          :current-page.sync="listQuery.page"
          :page-sizes="[20,50,100]"
          :page-size="listQuery.limit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </el-col>
    </el-row>
    <!--删除-->
    <el-dialog title="提示" :visible.sync="deleteDialogVisible" width="30%">
      <span><i class="el-icon-warning"></i>是否确认删除编号为【{{deleteName}}】的数据？确认删除后，将不能恢复！</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="rowDelete(currentRowIndex, list)">确 定</el-button>
      </span>
    </el-dialog>
    <!--添加/修改-->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogVisible" top="10px">
      <el-form ref="dataForm"
               :rules="rules"
               :model="temp"
               style="margin-top: -30px"
               label-position="right"
               label-width="100px">
        <el-row>
          <el-col :sm="24" :md="12">
            <el-form-item label="编号" prop="id">
              <el-input v-model.trim="temp.id" :maxlength="16"
                        :readonly="dialogStatus == 'update'"></el-input>
            </el-form-item>
            <el-form-item label="IP地址" prop="ip">
              <el-input v-model.trim="temp.name" :maxlength="16"></el-input>
            </el-form-item>
            <el-form-item label="位置" prop="place">
              <el-input v-model.trim="temp.ip" :maxlength="16"></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="24" :md="12">
            <el-form-item label="名称" prop="name">
              <el-input v-model.trim="temp.place" :maxlength="48"></el-input>
            </el-form-item>
            <el-form-item label="端口号" prop="port">
              <el-input v-model.trim="temp.port" :maxlength="5"></el-input>
            </el-form-item>
            <el-form-item label="状态" prop="flag">
              <el-input v-model.trim="temp.flag" :maxlength="5"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="说明" prop="descr">
          <el-input type="textarea" :maxlength="128"
                    v-model.trim="temp.descr"
                    :autosize="{ minRows: 1, maxRows: 4 }">
          </el-input>
          <span style="font-size: 12px" v-show="leftLength">剩余可输入{{leftLength()}}个字</span>
        </el-form-item>
      </el-form>
      <div slot="footer" style="height: 0; margin-top: -50px">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" v-if="dialogStatus === 'create'" @click="createData">保 存</el-button>
        <el-button type="primary" v-else @click="updateData">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { fetchList, SubmitTable, fetchSearchOption } from '@/api/table'
  import { cryptoPass } from '@/api/login'
  import { isvalidUsername, isvalidPassword, validateOther, validateNum } from '@/utils/validate'
  import ElButtonGroup from "../../../node_modules/element-ui/packages/button/src/button-group.vue";
  export default {
    components: {ElButtonGroup},
    data() {
      //编号验证
      const checkID = (rule, value, callback) => {
        if (!validateOther(value)) {
          callback(new Error('只能输入数字、英文字母和下划线'));
        } else {
          callback();
        }
      };
      //端口限制
      const checkPort = (rule, value, callback) => {
        if (!validateNum(value)) {
          callback(new Error('只能输入纯数字'));
        } else if(value < 80 || value > 65535){
          callback(new Error('限制80-65535,默认80'))
        }else{
          callback();
        }
      };
      return {
        //搜索内容
        listQuery: {
          method: '',
          page: 1,
          limit: 20,
          ext: undefined,
          key: '',  //查询对象的key值
          value: ''  //查询对象内容
        },
        //总条目数
        total: 0,
        searchOption: [],
        list: [],
        //行数
        currentRowIndex: -1,
        //-----添加/修改对话框--------
        //对话框状态
        dialogVisible: false,
        //对话框状态
        dialogStatus: '',
        //对话框标题
        textMap: {
          create: '添加设备',
          update: '修改设备'
        },
        //对话框内容
        temp: {
          id: '',
          name: '',
          ip: '',
          port: '',
          place: '',
          flag: '',
          descr: ''
        },
        //-----删除对话框----
        //对话框状态
        deleteDialogVisible: false,
        deleteName: '',
        //内容验证规则
        rules: {
          id: [
            {required: true, message: '设备编号不能为空', trigger: 'blur'},
            {validator: checkID, trigger: 'change'}
          ],
          name: [{required: true, message: '设备名称不能为空', trigger: 'blur'}],
          port: [
            {required: true, message: '端口不能为空', trigger: 'blur'},
            {validator: checkPort, trigger: 'change'}
          ]
        }
      }
    },
    created () {
      this.getList();
    },
    watch: {
      $route() {
        this.getList();
      }
    },
    methods: {
      
      //请求后台
      requestList (List){
        fetchList('/equipments', List).then( response => {
          const data = response.data;
          if(data.msg && data.msg !== ''){
            this.$message({
              showClose: true,
              message: data.msg,
              type: 'error',
              duration: 2000
            });
          }
          if(data.data){
            this.list = data.data;
            this.total = data.total;
          }else {
            this.list = [];
            this.total = 0;
          }
        })
      },
      //获取列表
      getList () {
        this.listQuery.ext = undefined;
        this.listQuery.method = 'List';
        this.requestList(this.listQuery);
      },
      //直接查询
      handleFilter(val) {
        this.listQuery.ext = undefined;
        this.listQuery.method = 'Query';
        this.listQuery.page = val;
        this.requestList(this.listQuery);
      },
      //相似查询
      handleExtFilter(val) {
        this.listQuery.ext = 'like';
        this.listQuery.method = 'Query';
        this.listQuery.page = val;
        this.requestList(this.listQuery);
      },
      //改变显示条目
      handleSizeChange(size) {
        this.listQuery.limit = size;
        if(this.listQuery.ext === 'like') {
          this.handleExtFilter(1);
        }else if(this.listQuery.method === 'Query') {
          this.handleFilter(1);
        }else if(this.listQuery.method === 'List') {
          this.listQuery.page = 1;
          this.getList();
        }
      },
      //改变页面事件
      handlePageChange(val) {
        if(this.listQuery.ext === 'like') {
          this.handleExtFilter(val);
        }else if(this.listQuery.method === 'Query') {
          this.handleFilter(val);
        }else if(this.listQuery.method === 'List') {
          this.getList();
        }
      },
      //select获取焦点后请求数据
      handleFocus() {
        if(this.searchOption.length === 0) {
          fetchSearchOption('/equipments',{method: 'FieldQuery'})
            .then(response => {
              const data = response.data;
              if(data.msg && data.msg !== ''){
                this.$message({
                  showClose: true,
                  message: data.msg,
                  type: 'error',
                  duration: 2000
                });
              }
              if(data.data){
                let keys = Object.keys(data.data);
                let values = Object.values(data.data);
                for(let i = 0; i < keys.length; i++) {
                  let optionObj = {};
                  optionObj.key = keys[i];
                  optionObj.label = values[i];
                  this.searchOption.push(optionObj);
                }
              }
            })
        }
      },
      resetTemp() {
        this.temp = {
          id: '',
          name: '',
          ip: '',
          port: '',
          place: '',
          flag: '',
          descr: ''
        }
      },
      //添加对话框
      handleCreate() {
        this.resetTemp();
        this.dialogStatus = 'create';
        this.dialogVisible = true;
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate();
        })
      },
      //添加完毕上传
      createData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            var temp = Object.assign({method: 'Insert'}, this.temp);
            SubmitTable('/equipments', temp).then(response => {
              const data = response.data;
              if(data.msg && data.msg !== ''){
                this.$message({
                  showClose: true,
                  message: data.msg,
                  type: 'info',
                  duration: 2000
                });
              }
              if(data.id === '00000') {
                this.list.unshift(this.temp);
                this.dialogVisible = false;
                this.$notify({
                  title: '成功',
                  message: '创建成功',
                  type: 'success',
                  duration: 2000
                });
                this.total += 1;
              }
            });
          }
        })
      },
      //修改对话框
      handleUpdate(row) {
        this.temp = Object.assign({}, row);
        this.dialogStatus = 'update';
        this.dialogVisible = true;
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate();
        });
      },
      //修改完毕上传
      updateData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            let temp = Object.assign({method: 'Update'}, this.temp);
            SubmitTable('/equipments', temp).then(response => {
              const data = response.data;
              if(data.msg && data.msg !== ''){
                this.$message({
                  showClose: true,
                  message: data.msg,
                  type: 'info',
                  duration: 2000
                });
              }
              if(data.id === '00000') {
                for (const v of this.list) {
                  if (v.id === this.temp.id) {
                    const index = this.list.indexOf(v);
                    this.list.splice(index, 1, this.temp);
                    break;
                  }
                }
                this.dialogVisible = false;
                this.$notify({
                  title: '成功',
                  message: '更新成功',
                  type: 'success',
                  duration: 2000
                });
              }
            });
          }
        })
      },
      
      //获取index
      handleCurrentChange(val) {
        this.currentRowIndex = this.list.indexOf(val);
      },
      //descr剩余长度计算
      leftLength() {
        if (this.temp.descr === null) {
          this.temp.descr = '';
        }
        return 128 - this.temp.descr.length
      },
      //删除行
      handleDelete(index) {
        this.deleteDialogVisible = true;
        this.deleteName = this.list[index].id
      },
      rowDelete(index, row) {
        var deleteData = Object.assign({method: 'Delete'}, {id: this.list[index].id});
        SubmitTable('/equipments', deleteData).then(response => {
          const data = response.data;
          if(data.msg && data.msg !== ''){
            this.$message({
              showClose: true,
              message: data.msg,
              type: 'info',
              duration: 2000
            });
          }
          if(data.id === '00000') {
            this.$notify({
              title: '成功',
              message: '删除成功',
              type: 'success',
              duration: 2000
            });
            row.splice(index, 1);
            this.deleteDialogVisible = false;
            this.total -= 1;
          }
        });
      },
    }
  }

</script>

<style>
  .el-table--small td, .el-table--small th {
    padding: 0;
    font-size: 14px;
    text-align: center;
  }
  
  .el-table .cell, .el-table th div {
    padding-left: 0px;
    padding-right: 0px;
  }

</style>

