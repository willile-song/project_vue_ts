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
            <!-- <el-submenu :index="child1.url" v-for="child1 in menuList" :key="child1.url">
        <template slot="title">
          <i :class="child1.icon"></i>
          {{child1.name}}
        </template>
        <el-menu-item-group v-if="child1.childNode">
          <el-menu-item
            index="child2.id"
            v-for="child2 in child1.childNode"
            :key="child2.id"
          >{{child2.name}}</el-menu-item>
        </el-menu-item-group>
            </el-submenu>-->
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