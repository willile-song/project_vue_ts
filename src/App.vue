<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
import System from "../src/views/system.vue";
export default {
  components: {
    // System
  },
  // mounted(){
  //     console.log(this.$route.meta);
  // }
};
</script>
<style>
html,
body {
  width: 100%;
  height: 100%;
  min-height: 100%;
  background-color: #f7f8f8;
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100%;
  min-width: 100%;
  overflow: hidden;
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
.el-submenu__title:hover,
.el-menu-item:hover {
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
  /* padding-top: 30px; */
  margin-top: 30px;
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
main.el-main {
  overflow: auto !important;
}

.custom-tree-node {
  position: relative;
}
.custom-tree-node > .el-icon-more {
  margin-left: 20px;
}
/* .custom-tree-node .operation {
  position: absolute;
  padding: 10px;
  border: 1px solid red;
  left: 55px;
  list-style: none;
  background-color: #fff;
  display: none;
}
.custom-tree-node .operation.is-hover {
  position: absolute;
  padding: 10px;
  border: 1px solid red;
  left: 55px;
  list-style: none;
  background-color: #fff;
}
.custom-tree-node .operation span {
  color: #aaa;
} */

.el-dropdown {
  margin-left: 20px;
}
.el-dropdown-link {
  display: none;
}
.el-tree-node__content:hover .el-dropdown-link {
  display: block;
  color: #aaa;
}
.el-button.el-button--text.el-button--mini > span {
  color: #aaa;
  font-size: 14px;
  background-color: #f7f8f8;
}
.el-button.el-button--text.el-button--mini > span:hover {
  color: #000;
}
/* div#login .el-input__inner {
  border-color: transparent;
  border-bottom-color: #ccc;
}
div#login .el-input {
  position: relative;
}
div#login .el-input::after {
  content: "";
  width: 100%;
  height: 0px;
  border-right: none;
  border-left: none;
  border: 1px solid #2489f2;
  display: block;
  position: absolute;
} */
div#login .el-input__inner {
  border-color: transparent;
  border-bottom-color: #ccc;
  outline: none;
  color: #c6c6c6;
}
.hp-row {
    position: relative;
    margin: 20px;
}
.hp-row label {
    position: absolute;
    top: 7px;
    left: 6px;
    color: #c6c6c6;
    font-size: 16px;
    transition: all .3s ease;
    pointer-events: none;
    margin-left: 10px;
}
.hp-row input:focus ~ label,
.hp-row input:valid ~ label{
    top:-14px;
    font-size: 12px;
    color: #2196F3;
}
span.bar {
    display: block;
    position: relative;
}
span.bar::before {
    position: absolute;
    content: '';
    width: 0;
    height: 2px;
    background-color: #2196F3;
    transition: all .3s ease;
}
.hp-row input:focus ~ span.bar::before {
    width: 100%;
}
#login .el-button.el-button--primary {
    margin-left: calc(50% - 34px);

}
</style>
