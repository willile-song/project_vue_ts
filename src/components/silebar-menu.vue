<template>
    <!-- 渲染菜单 -->
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
    data() {
        return {
            menuList: [
            {
                name: "首页",
                pid: 1,
                id: 1,
                url: "/home",
                icon: "el-icon-s-home",
            },
            {
                name: "文件",
                pid: 1,
                id: 2,
                url: "/file",
                icon: "el-icon-document",
                childNode: [
                    {
                        name: "电子签约",
                        pid: 2,
                        id: 3,
                        url: "/sign",
                    },
                    {
                        name: "文件统计",
                        pid: 2,
                        id: 4,
                        url: "/filecensus",
                    },
                ],
            },
            {
                name: "印控",
                pid: 1,
                id: 3,
                url: "/sealcontrol",
                icon: "el-icon-s-check",
                childNode: [
                    {
                        name: "电子签章",
                        pid: 3,
                        id: 5,
                        url: "/electronic-signature",
                    },
                ],
            },
            {
                name: "组织",
                pid: 1,
                id: 4,
                url: "/organization",
                icon: "el-icon-s-custom",
                childNode: [
                    {
                        name: "基本信息",
                        pid: 4,
                        id: 6,
                        url: "/info",
                    },
                    {
                        name: "组织和成员",
                        pid: 4,
                        id: 7,
                        url: "/organ-member",
                    },
                    {
                        name: "权限管理",
                        pid: 4,
                        id: 8,
                        url: "/power-management",
                    },
                    {
                        name: "费用中心",
                        pid: 4,
                        id: 9,
                        url: "/cost-center",
                    },
                ],
            },
            {
                name: "配置",
                pid: 1,
                id: 5,
                url: "/config",
                icon: "el-icon-s-tools",
                childNode: [
                    {
                        name: "模板库管理",
                        pid: 5,
                        id: 10,
                        url: "/template-library-management",
                    },
                    {
                        name: "业务流配置",
                        pid: 5,
                        id: 11,
                        url: "/business-flow-config",
                    },
                ],
            },
            {
                name: "审计",
                pid: 1,
                id: 6,
                url: "/audit",
                icon: "el-icon-document-copy",
            },
        ],
        }
    },
};
</script>

<style scoped>
#sidebar-menu {
    background-color: #001330;
    height: calc(100% - 80px);
}
</style>