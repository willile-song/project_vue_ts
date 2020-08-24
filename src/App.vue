<template>
    <div id="app" v-if="isLogin || getUserData">
        <router-view />
    </div>
</template>
<script lang="ts">
export default {
    computed: {
        getUserData(): string {
            return this.$store.state.userData;
        },
        isLogin() {
            return this.$route.name === "login" ? true : false;
        }
    },
    async mounted() {
        const user = await this.axios.get("/user");
        this.$store.commit("setUserData", JSON.stringify(user));
    }
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
    overflow: hidden;
}

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    width: 100%;
    height: 100%;
    min-width: 100%;
}
aside.el-aside {
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

#main-container {
    background-color: #fff !important;
}

#main-container #audit {
    background-color: rgb(247, 248, 248) !important;
}

/* table页的导航 */
.el-tabs__nav.is-left {
    padding-right: 36px;
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

.custom-tree-node {
    position: relative;
}
.custom-tree-node > .el-icon-more {
    margin-left: 20px;
}

/* 组织树 */
.el-dropdown-menu.el-popper li {
    padding: 0;
}
.el-dropdown-menu.el-popper li .el-button {
    width: 66px;
}
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
.el-button.el-button--text.el-button--mini:hover span {
    color: #000;
}
/* 登录框效果 */
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
    transition: all 0.3s ease;
    pointer-events: none;
}
.hp-row input:focus ~ label,
.hp-row input:valid ~ label {
    top: -14px;
    font-size: 12px;
    color: #2196f3;
}
span.bar {
    display: block;
    position: relative;
}
span.bar::before {
    position: absolute;
    content: "";
    width: 0;
    height: 2px;
    background-color: #2196f3;
    transition: all 0.3s ease;
}
.hp-row input:focus ~ span.bar::before,
.hp-row input:valid ~ span.bar::before {
    width: 292px;
}
#login .el-button.el-button--primary {
    width: 300px;
    margin-left: 18px;
}
</style>
