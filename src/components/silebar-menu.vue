<template>
    <div id="sidebar-menu">
        <el-menu
            router
            :default-active="$route.path"
            background-color="rgb(16, 28, 41) "
            text-color="#ccc"
            active-text-color="#fff"
            :unique-opened="true"
        >
             <template v-for="(item, index) in menuList">
                    <el-menu-item v-if="!item.childNode" :index="item.url" :key="index">
                        <i :class="item.icon"></i>
                        <span slot="title">{{ item.name }}</span>
                    </el-menu-item>
                    
                    <el-submenu :index="index + ''" v-if="item.childNode" :key="index">
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span slot="title">{{ item.name }}</span>
                        </template>
                        <template v-for="child in item.childNode">
                            <el-menu-item :index="child.url" :key="child.url">
                                <i :class="child.icon"></i>
                                <span slot="title">{{ child.name }}</span>
                            </el-menu-item>
                        </template>
                    </el-submenu>
                </template>
        </el-menu>
    </div>
</template>

<script>
export default {
    computed: {
        menuList() {
            return this.$store.state.menuList;
        }
    }
};
</script>

<style scoped>
#sidebar-menu {
    background-color: #001330;
    height: calc(100% - 80px);
}
</style>