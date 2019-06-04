<template>
  <div id="app">
    <Mheader></Mheader>
    <tab></tab>
    <keep-alive>
      <!--把DOM缓存在内存中-->
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script type="text/ecmascript-6">
import Mheader from './components/header/m-header'
import Tab from './components/tab/tab'
export default {name: 'App', components: {Tab, Mheader}}
</script>
<style lang="stylus">
  @import "./common/stylus/index.styl"
  #app
    background-color: $backgroundColor;
</style>
