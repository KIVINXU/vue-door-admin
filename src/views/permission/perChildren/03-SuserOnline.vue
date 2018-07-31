<template>
  <div>
    <el-row class="el-table-margin">
      <el-col :span="16" :offset="5">
        <el-select v-model.trim="listQuery.key"
                   style="width: 14%"
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
            || listQuery.value === ''">相似
        </el-button>
      </el-col>
      <el-col :span="2">
        <el-dropdown>
          <el-button type="primary">
            更多操作<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <el-button type="text"
                         icon="el-icon-plus"
                         disabled>
                添加
              </el-button>
            </el-dropdown-item>
            <el-dropdown-item>
              <el-button type="text"
                         icon="el-icon-edit"
                         disabled>
                修改
              </el-button>
            </el-dropdown-item>
            <el-dropdown-item>
              <el-button type="text"
                         icon="el-icon-delete"
                         @click="handleDelete(currentRowIndex)"
                         :disabled="currentRowIndex === -1">
                删除
              </el-button>
            </el-dropdown-item>
            <el-dropdown-item>
              <el-button type="text"
                         icon="el-icon-upload" disabled>
                导入
              </el-button>
            </el-dropdown-item>
            <el-dropdown-item>
              <el-button type="text"
                         icon="el-icon-download" disabled>
                导出
              </el-button>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-table :data="list" ref="SuserOnlineTable"
                  highlight-current-row
                  @current-change="handleCurrentChange"
                  border>
          <el-table-column prop="id" :show-overflow-tooltip="true" label="标示符" width="140px"></el-table-column>
          <el-table-column prop="host" :show-overflow-tooltip="true" label="服务器IP地址" width="120px"></el-table-column>
          <el-table-column prop="client" :show-overflow-tooltip="true" label="用户IP地址" width="120px"></el-table-column>
          <el-table-column prop="username" :show-overflow-tooltip="true" label="登录用户" width="120px"></el-table-column>
          <el-table-column prop="useragent" :show-overflow-tooltip="true" label="浏览器信息" width="180px"></el-table-column>
          <el-table-column prop="reqnum" :show-overflow-tooltip="true" label="请求次数" width="80px"></el-table-column>
          <el-table-column prop="reqlast" :show-overflow-tooltip="true" label="最近请求"></el-table-column>
          <el-table-column prop="reqfirst" :show-overflow-tooltip="true" label="首次请求"></el-table-column>
        </el-table>
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
      <span><i class="el-icon-warning"></i>是否确认删除名称为【{{deleteName}}】的数据？确认删除后，将不能恢复！</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="rowDelete(currentRowIndex, list)">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {fetchList, SubmitTable, fetchSearchOption } from '@/api/table'
  import ElFormItem from "element-ui/packages/form/src/form-item.vue";
  import ElDialog from "element-ui/packages/dialog/src/component.vue";

  export default {
    components: {
      ElDialog,
      ElFormItem
    },
    data() {
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
        list: [
          {
            id: '1101',
            host: '192.1.1.1',
            client: '192.3.12.1',
            username: '卜培林',
            useragent: '火狐',
            reqnum: 13,
            reqlast: '05/10/2018 10:28:00',
            reqfirst: '05/8/2018 06:11:00',
          }
        ],
        //行数
        currentRowIndex: -1,
        //-----删除对话框----
        //对话框状态
        deleteDialogVisible: false,
        deleteName: '',
      }
    },
     created() {
       this.getList();
     },
     watch: {
       $route() {
         this.getList();
       }
     },
    methods: {
      //传过来是微秒
      timestampToTime(timestamp) {
        let time = timestamp.toString().split('.');
        const date = new Date(parseInt(time[0]) * 1000);
        const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '/';
        const D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + '/';
        const Y = date.getFullYear() + ' ';
        const h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
        const m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
        const s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()) + '.';
        return M + D + Y + h + m + s + time[1];
      },
      //请求后台
      requestList(List) {
        fetchList('/SuserOnline', List).then(response => {
          const data = response.data;
          if (data.msg && data.msg !== '') {
            this.$message({
              message: data.msg,
              type: 'error',
              duration: 2000,
              showClose: true
            });
          }
          if (data.data) {
            this.list = data.data;
            this.list.forEach(item => {
              item.reqlast = this.timestampToTime(item.reqlast);
              item.reqfirst = this.timestampToTime(item.reqfirst);
            });
            this.total = data.total;
          } else {
            this.list = [];
            this.total = 0;
          }
        })
      },
      //获取列表
      getList() {
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
        if (this.listQuery.ext === 'like') {
          this.handleExtFilter(1);
        } else if (this.listQuery.method === 'Query') {
          this.handleFilter(1);
        } else if (this.listQuery.method === 'List') {
          this.listQuery.page = 1;
          this.getList();
        }
      },
      //改变页面事件
      handlePageChange(val) {
        if (this.listQuery.ext === 'like') {
          this.handleExtFilter(val);
        } else if (this.listQuery.method === 'Query') {
          this.handleFilter(val);
        } else if (this.listQuery.method === 'List') {
          this.getList();
        }
      },
      //select获取焦点后请求数据
      handleFocus() {
        if (this.searchOption.length === 0) {
          fetchSearchOption('/SuserOnline', {method: 'FieldQuery'})
            .then(response => {
              const data = response.data;
              if (data.msg && data.msg !== '') {
                this.$message({
                  showClose: true,
                  message: data.msg,
                  type: 'error',
                  duration: 2000
                });
              }
              if (data.data) {
                let keys = Object.keys(data.data);
                let values = Object.values(data.data);
                for (let i = 0; i < keys.length; i++) {
                  let optionObj = {};
                  optionObj.key = keys[i];
                  optionObj.label = values[i];
                  this.searchOption.push(optionObj);
                }
              }
            })
        }
      },
      

      //获取index
      handleCurrentChange(val) {
        this.currentRowIndex = this.list.indexOf(val);
      },
      //删除行
      handleDelete(index) {
         this.deleteDialogVisible = true;
         this.deleteName = this.list[index].username
      },
      rowDelete(index, row) {
         var deleteData = Object.assign({method: 'Delete'}, {id: this.list[index].id});
         SubmitTable('/SuserOnline', deleteData).then(response => {
           const data = response.data;
           if (data.msg && data.msg !== '') {
             this.$message({
               showClose: true,
               message: data.msg,
               type: 'info',
               duration: 2000
             });
           }
           if (data.id === '00000') {
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
