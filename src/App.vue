<template>
  <div id="app">
    <router-view name="header"/>
    <div class="app-content">
      <router-view name="content"/>
      <router-view name="aside"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
@import "./style.css";
@import "../node_modules/font-awesome/css/font-awesome.min.css";
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;/*字体抗锯齿chrome、safari*/
  -moz-osx-font-smoothing: grayscale;/*字体抗锯齿firefox*/
  color: #2c3e50;
  font-size: 13px;
}
.app-content{
  width: 936px;
  margin: 0 auto;
}
</style>
