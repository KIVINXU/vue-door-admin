<template>
  <div>
    <el-row>
      <el-col :xs="4" :sm="7" :md="7" >
        <img :src="img" width="100%">
      </el-col>
      <el-col :xs="20" :sm="17" :md="17">
        <el-form ref="aboutForm" :model="temp" class="aboutForm"
                 style="margin-top: -30px" label-position="right" label-width="100px">
          <el-form-item label="名称">{{temp.appName}}</el-form-item>
          <el-form-item label="版本">{{temp.appVer}}</el-form-item>
          <el-form-item label="描述">{{temp.appDesc}}</el-form-item>
          <el-form-item label="CPU">{{temp.CPU}}</el-form-item>
          <el-form-item label="内存">{{"总量:" + temp.total + "  MB,可用:" + temp.free + "  MB"}}</el-form-item>
          <el-form-item label="操作系统">{{temp.OS}}</el-form-item>
          <el-form-item label="WebServer">{{temp.WEB}}</el-form-item>
          <el-form-item label="推荐浏览器">{{temp.brower}}</el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row>
      <el-col class="right">
        Copyright ©2017 浙江帝杰曼信息科技股份有限公司
      </el-col>
    </el-row>
  </div>
</template>


<script>
  import request from '@/utils/request'
  import { Message } from 'element-ui'
  import img from '@/assets/applogo.png'

  export default {
    name: 'about',
    data() {
      return {
        img: img,
        temp: {
          appName: '',
          appVer: '',
          appDesc: '',
          WEB: '',
          OS: '',
          CPU: '',
          total: '',
          free: '',
          brower:'谷歌浏览器',
        }
      }
    },
    created() {
      this.reqWEB();
      this.reqOther();
    },
    methods: {
//      获取WEB
      reqWEB(){
        request({
          url: document.location,
          method: 'get'
        }).then(response => {
          this.temp.WEB = response.headers['server'];
          if(this.temp.WEB === ''){
            this.temp.WEB = 'Unknow'
          }
        })
      },
//      获取其他数据——方式:数据交换
      reqOther() {
        request({url:'/about',method: 'post'}).then( response => {
          const data = response.data;
          if(data.msg && data.msg !== ''){
            Message.error(data.msg);
          }
          this.temp.appName = data.appName;
          this.temp.appVer = data.appVer;
          this.temp.appDesc = data.appDesc;
          this.temp.OS = data.OS;
          this.temp.CPU = data.CPU;
          this.temp.total = data.total;
          this.temp.free = data.free;
        })
      }
    }
  }
</script>

<style scoped>
  .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item {
    margin-bottom: 0px;
  }
  .right {
    font-size: 14px;
    color: grey;
    text-align: center;
    margin-top: 20px;
  }
</style>
