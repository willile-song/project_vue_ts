<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
import System from '../src/views/system.vue'
export default {
    components: {
        // System
    },
    // mounted(){
    //     console.log(this.$route.meta);
    // }
}
</script>
<style>
html,
body {
  width: 100%;
  height: 100%;
  background-color: #f7f8f8;
  overflow: hidden;
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100%;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
.el-submenu__title:hover, .el-menu-item:hover {
    background-color: #000 !important; 
    color: #fff !important;
}
.el-input-organ-member > input {
    width: 190px;
    height: 32px;
    padding: 0px 15px 0px 30px;
    border-radius: 16px;
}

/* table页的导航 */
.el-tabs__nav.is-left {
    padding-right: 36px;
    padding-top: 30px;
}
.el-tabs__nav.is-left div[role="tab"] {
    text-align: left;
}

ul.el-menu[role="menubar"] {
    height: 100%;
}

/* 搜索框尺寸 */
.match .el-input .el-input__inner {
    width: 148px;
    height: 38px;
}

.el-select.el-select {
    width: 130px !important;
}
span.title {
    margin-right: 50px;
}


</style>
