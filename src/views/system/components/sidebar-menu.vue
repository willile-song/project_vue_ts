<template>
    <!-- 渲染菜单 -->
    <div id="sidebar-menu">
        <el-menu
            :default-openeds = openMenu
            @select="handleSelect"
            router
            :default-active="$route.path"
            background-color="rgb(16, 28, 41)"
            text-color="#ccc"
            active-text-color="#fff"
            :unique-opened="true"
        >
            <template v-for="(item, index) in menuList">

                <el-menu-item
                    v-if="!item.childNode"
                    :index="item.url"
                    :key="index"
                    :route="item.url"
                >
                    <i :class="item.icon"></i>
                    <span slot="title">{{ item.name }}</span>
                </el-menu-item>

                <el-submenu :index="index + ''" v-if="item.childNode" :key="index">
                    <template slot="title">
                        <i :class="item.icon"></i>
                        <span slot="title">{{ item.name }}</span>
                    </template>
                    <template v-for="child in item.childNode">
                        <el-menu-item :index="child.url" :key="child.url ">
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
                    name: '首页',
                    id: 1,
                    url: '/home',
                    icon: 'el-icon-s-home'
                },

                {
                    name: '文件',
                    id: 2,
                    url: '/file',
                    icon: 'el-icon-document',
                    childNode: [
                        {
                            name: '电子签约',
                            id: 3,
                            url: '/sign'
                        },
                        {
                            name: '文件统计',
                            id: 4,
                            url: '/filecensus'
                        }
                    ]
                },

                {
                    name: '印控',
                    id: 3,
                    url: '/sealcontrol',
                    icon: 'el-icon-s-check',
                    childNode: [
                        {
                            name: '电子签章',
                            id: 5,
                            url: '/electronic-signature'
                        }
                    ]
                },

                {
                    name: '组织',
                    id: 4,
                    url: '/organization',
                    icon: 'el-icon-s-custom',
                    childNode: [
                        {
                            name: '基本信息',
                            id: 6,
                            url: '/info'
                        },
                        {
                            name: '组织和成员',
                            id: 7,
                            url: '/organ-member'
                        },
                        {
                            name: '权限管理',
                            id: 8,
                            url: '/power-management'
                        },
                        {
                            name: '费用中心',
                            id: 9,
                            url: '/cost-center'
                        }
                    ]
                },

                {
                    name: '配置',
                    id: 5,
                    url: '/config',
                    icon: 'el-icon-s-tools',
                    childNode: [
                        {
                            name: '模板库管理',
                            id: 10,
                            url: '/template-library-management'
                        },
                        {
                            name: '业务流配置',
                            id: 11,
                            url: '/business-flow-config'
                        }
                    ]
                },

                {
                    name: '审计',
                    id: 6,
                    url: '/audit',
                    icon: 'el-icon-document-copy'
                }
            ],
            openMenu: []
        };
    },

    methods: {

        // 处理菜单有多级子菜单跳到一级item菜单，原菜单不收起=
        handleSelect(index, indexPath) {

            // 当菜单跳到无子级菜单时把 打开的菜单项数组置空
            if (indexPath?.length === 1) {
                this.openMenu = [];
            }
        },
    }
};
</script>

<style lang="less" scoped>

#sidebar-menu {
    background-color: #001330;
    height: calc(100% - 80px);

    /deep/ ul[role='menubar'] {
        border: none;
        height: 100%;

        li[role="menuitem"]:hover span {
            color: #fff;
        }
    }
    
}
</style>