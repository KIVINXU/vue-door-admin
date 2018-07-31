<template>
  <section class="app-main" style="padding: 20px; margin-bottom: 30px">
    <transition name="fade" mode="out-in">
       <router-view :key="$route.path"></router-view>
      <!--<router-view></router-view>-->
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
//     key() {
//       return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
//     }
  }
}
</script>

