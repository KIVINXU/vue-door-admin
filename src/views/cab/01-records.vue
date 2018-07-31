<template>
  <div>
    <el-row class="el-table-margin">
      <el-col :md="12" :offset="6">
        <el-select v-model.trim="listQuery.key"
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
            || listQuery.value === ''">相似
        </el-button>
      </el-col>
      <el-col :md="5">
        <el-button-group>
          <el-button type="primary" icon="el-icon-plus"
                     disabled></el-button>
          <el-button type="primary" icon="el-icon-edit"
                     disabled></el-button>
          <el-button type="primary" icon="el-icon-delete"
                     disabled></el-button>
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
        <el-table :data="list" ref="boxesTable"
                  highlight-current-row
                  border>
          <el-table-column prop="id" :show-overflow-tooltip="true" label="设备编号"></el-table-column>
          <el-table-column prop="cabinet" :show-overflow-tooltip="true" label="柜子编号"></el-table-column>
          <el-table-column prop="box" :show-overflow-tooltip="true" label="箱子编号"></el-table-column>
          <el-table-column prop="confirm" :show-overflow-tooltip="true" label="确认"></el-table-column>
          <el-table-column prop="reqnum" :show-overflow-tooltip="true" label="请求次数"></el-table-column>
          <el-table-column prop="mtime" :show-overflow-tooltip="true" label="更改时间"></el-table-column>
          <!--<el-table-column prop="mtime" :show-overflow-tooltip="true" label="更新时间"></el-table-column>-->
          <!--<el-table-column prop="ctime" :show-overflow-tooltip="true" label="创建时间"></el-table-column>-->
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
            id: '89860402101701420369',
            cabinet: '3',
            box: '3',
            confirm: 0,
            reqnum: 1,
            mtime: '2010-03-23 18:00:23.1131131',
          }
        ],
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
        fetchList('/cab/cabinetsBox', List).then(response => {
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
              item.mtime = this.timestampToTime(item.mtime);
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
          fetchSearchOption('/cab/cabinetsBox', {method: 'FieldQuery'})
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
      }
    }
  }

</script>
