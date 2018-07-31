<template>
  <div v-if="!item.hidden&&item.children" class="menu-wrapper">
    
      <!--当子路由只有一个的时候-->
      <router-link
        v-if="hasOneShowingChildren(item.children)
        && !item.children[0].children
        && !item.alwaysShow"
        :to="resolvePath(item.children[0].path)"
        @click.native="clickLink(resolvePath(item.children[0].path))">
        <el-menu-item :index="resolvePath(item.children[0].path)" :class="{'submenu-title-noDropdown':!isNest}">
          <svg-icon v-if="item.children[0].meta&&item.children[0].meta.icon" :icon-class="item.children[0].meta.icon"></svg-icon>
          <span v-if="item.children[0].meta&&item.children[0].meta.title">{{item.children[0].meta.title}}</span>
        </el-menu-item>
      </router-link>
    
      <!--当有多个子路由的时候-->
      <el-submenu v-else :index="item.name||item.path">
        <!--标题-->
        <template slot="title">
          <svg-icon v-if="item.meta&&item.meta.icon" :icon-class="item.meta.icon"></svg-icon>
          <span v-if="item.meta&&item.meta.title" style="font-size: 16px; font-weight: 500">{{item.meta.title}}</span>
        </template>
        
        <template v-for="child in item.children" v-if="!child.hidden">
          <sidebar-item :is-nest="true" class="nest-menu"
                        v-if="child.children&&child.children.length>0"
                        :item="child" :key="child.path"
                        :base-path="resolvePath(child.path)"></sidebar-item>
          
          <router-link v-else
                       :to="resolvePath(child.path)"
                       @click.native="clickLink(resolvePath(child.path))"
                       :key="child.name">
            <el-menu-item :index="resolvePath(child.path)">
            <svg-icon v-if="child.meta&&child.meta.icon" :icon-class="child.meta.icon"></svg-icon>
            <span v-if="child.meta&&child.meta.title">{{child.meta.title}}</span>
            </el-menu-item>
          </router-link>
        </template>
      </el-submenu>
  </div>
</template>

<script>
  import path from 'path'
  
export default {
  name: 'SidebarItem',
  props: {
    item: { // route配置json
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  methods: {
    clickLink(path) {
      this.$router.push({
        path,
        query: {
          _: +new Date().getMilliseconds() //保证每次点击路由的query项都是不一样的，确保会重新刷新view
        }
      })
    },
    hasOneShowingChildren(children) {
      const showingChildren = children.filter(item => {
        return !item.hidden
      })
      return showingChildren.length === 1;
      
    },
    resolvePath(...paths) {
      return path.resolve(this.basePath, ...paths)
    },
  }
}
</script>
