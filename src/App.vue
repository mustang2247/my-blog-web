<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view v-if="isRouterAlive"></router-view>
    </transition>
  </div>
</template>

<script>

export default {
  name: 'app',
  // 点击页面侧边栏重载功能的实现（该处提供了提供给后代组件的数据/方法）
  provide() {
    return{
      reload: this.reload
    }
  },
  data() {
    return{
      isRouterAlive: true
    }
  },
  methods: {
    //页面重新载入函数
    reload () {
      this.isRouterAlive = false;
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    }
  },
}
</script>

<style>
</style>
