<template>
    <div id="system">
        <el-container class="container-total">
            <el-aside :width="width" class="aside" style="font-size:17px">
                <side-bar-header />
                <side-bar-menu />
            </el-aside>
            <el-container class="container-part" style="mainWidth">
                <el-header class="header">
                    <header-main />
                </el-header>
                <!-- 封装的main-container组件 -->
                <main-container
                    :bkgroundParam="this.$store.state.bgColorDefault"
                    :paddingParam="this.$store.state.paddingDefault"
                >
                    <router-view />
                </main-container>
            </el-container>
        </el-container>
    </div>
</template>
<script lang="ts">
import SideBarHeader from "../components/sidebar-header.vue";
import SideBarMenu from "../components/sidebar-menu.vue";
import HeaderMain from "../components/header.vue";
import MainContainer from "../views/main-container.vue";

import { Component, Vue } from "vue-property-decorator";

@Component({
    components: {
        SideBarHeader,
        SideBarMenu,
        HeaderMain,
        MainContainer
    }
})
export default class System extends Vue {
    get width(): string {
        return this.$store.getters.sidebarWidth;
    }
    get mainWidth(): string {
        return `width:calc(100% - ${this.$store.getters.sidebarWidth})`;
    }
}
</script>

<style scoped>
#system {
    width: 100%;
    height:100%;
}

.container-total {
    width: 100%;
    height: 100%;
    background-color: #f7f8f8;
}

.aside {
    height: 100%;
    color: #fff;
    width: 207px;
    -webkit-user-select: none;
    transition: 0.6s;
}

.header {
    height: 35px;
    background-color: #fff;
}

.main {
    margin: 15px;
    background-color: #fff;
}

.header {
    padding: 12px 15px;
}
</style>