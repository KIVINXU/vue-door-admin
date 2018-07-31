<template>
  <el-row type="flex" justify="space-between" style="margin-bottom: 10px">
    <el-col :xs="18" :sm="18" :md="10" :lg="10">
      <el-input placeholder="请输入查询内容"
                :value="inputValue"
                @keyup.enter.native="handleFilter">
        <el-select :value="selectValue"
                   @focus="handleFocus"
                   @change="handleChangeInput"
                   placeholder="查询对象" slot="prepend"
                   style="width: 100px">
          <el-option
            v-for="item in searchOption"
            :key="item.key"
            :label="item.label"
            :value="item.key">
          </el-option>
        </el-select>
        <el-button
          type="primary"
          @click="handleFilter"
          :disabled="inputValue === '' || selectValue === ''"
          icon="el-icon-search" slot="append">查询
        </el-button>
        <el-button type="primary"
                   icon="el-icon-search"
                   slot="append"
                   @click="handleExtFilter"
                   :disabled="inputValue === '' || selectValue === ''">相似</el-button>
      </el-input>
    </el-col>
    <el-col :xs="5" :sm="3" :md="4" :lg="2">
      <el-dropdown>
        <el-button type="primary">
          更多操作<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <el-button type="text"
                       icon="el-icon-plus"
                       @click="handleCreate">
              添加
            </el-button>
          </el-dropdown-item>
          <el-dropdown-item>
            <el-button type="text"
                       icon="el-icon-edit"
                       @click="handleUpdate(index)"
                       :disabled="currentRowIndex === -1">
              修改
            </el-button>
          </el-dropdown-item>
          <el-dropdown-item>
            <el-button type="text"
                       icon="el-icon-delete"
                       @click="handleDelete(currentRowIndex, list)"
                       :disabled="currentRowIndex === -1">
              删除
            </el-button>
          </el-dropdown-item>
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
</template>
<script>
  export default {
    name: 'SearchBar',
    data() {
      return {
      
      }
    },
    props: {
    
    }
  }
</script>
