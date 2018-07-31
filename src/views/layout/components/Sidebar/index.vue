<template>
  <div>
    <div class="userInfo">
      <span>综合管理柜</span><br>
      <span style="text-decoration: underline;">{{username}}</span>
    </div>
    <scroll-bar>
      <el-menu mode="vertical"
               :default-active="$route.path"
               uniqueOpened
               :collapse="isCollapse"
               @open="handleOpen"
               backgroundColor="#85b3c3"
               text-color="#fff"
               activeTextColor="#75FFE6">
        <!--background-color="#304156"-->
        <!--text-color="#fff" -->
        <!--active-text-color="#409EFF">-->
        <sidebar-item v-for="route in permission_routers"
                      :key="route.name" :item="route"
                      :base-path="route.path"></sidebar-item>
      </el-menu>
    </scroll-bar>
    <div class="log-out">
      <span @click="aboutVisible = true">关于我们</span> |
      <span @click="logout">退出</span>
    </div>
    <!--关于我们 对话框-->
    <el-dialog title="关于我们" :visible.sync="aboutVisible"
               width="700px" top="10px" :append-to-body="true">
      <About></About>
    </el-dialog>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import SidebarItem from './SidebarItem'
  import About from './About.vue'
  import ScrollBar from '@/components/ScrollBar'

  export default {
  components: {
    SidebarItem,
    ScrollBar,
    About
  },
  name: 'sidebar',
  computed: {
    ...mapGetters([
      'permission_routers',
      'sidebar'
    ]),
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  data() {
    return {
      aboutVisible: false,
      username: window.sessionStorage.getItem('username')
    }
  },
  methods: {
    handleOpen (index) {
      this.$router.push({
        name: index
      })
    },
    logout() {
      this.$confirm('是否确认退出当前用户？', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('LogOut').then(() => {
          this.$router.push({ path: '/login' })
          location.reload() // 为了重新实例化vue-router对象 避免bug
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消退出'
        });
      })

    }
  }
}
</script>

