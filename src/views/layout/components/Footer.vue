<template>
  <div>
    <div class="footer" :class="{closed: !sidebar.opened}">
      <span style="color: #606266;font-size: 14px;vertical-align: top">
        <a href="http://www.wzdgm.com/" target="_blank">
          <img src="../../../assets/dgm_logo.jpg" alt=""></a>
        <span class="unselectable">Copyright ©2017 浙江帝杰曼信息科技股份有限公司</span>
      </span>
      <!--<div class="pull-right unselectable">-->
        <!--<span>-->
            <!--{{username}}-->
        <!--</span> |-->
        <!--<el-button type="text" size="medium" @click="logout">-->
          <!--退出 <svg-icon iconClass="quit"></svg-icon>-->
        <!--</el-button>-->
      <!--</div>-->
    </div>
  </div>
</template>
<script>
  export default {
    name: 'AppFooter',
    data() {
      return {
        aboutVisible: false,
        username: window.sessionStorage.getItem('username')
      }
    },
    computed: {
      sidebar() {
        return this.$store.state.app.sidebar
      }
    }
  }
  

</script>
<style lang="scss">
  .footer{
    position: fixed;
    z-index: 1999;
    left: 0;
    right: 0;
    bottom: 0;
    /*margin-left: 180px;*/
    margin-left: 160px;
    padding: 0 20px 0 10px;
    border-top: 1px solid #99a9bf;
    background-color: #fff;
    -webkit-box-sizing:border-box;
    box-sizing:border-box;
    span {
      line-height: 25px;
      img {
        vertical-align: middle;
      }
    }
    span.unselectable {
      padding-left: 8px;
    }
  }
  .closed {
    margin-left: 35px;
  }
  .pull-right {
    line-height: 25px;
    float: right;
    color: #606266;
    font-size: 14px;
    .el-button--medium, .el-button--medium.is-round {
      padding-top: 0;
      padding-bottom: 0;
    }
  }
  .unselectable {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
</style>
