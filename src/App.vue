<template>
  <div id="app">
    <router-link to="/"></router-link>
    <router-link to="/system"></router-link>
    <router-view class="default" />
  </div>
</template>

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

</style>
