<template>
    <div id="audit">
        <el-container class="el-container">
            <el-aside width="159px">
                <div class="tabs">
                    <el-tabs @tab-click="handleTabClick" tab-position="left" style="height: 100%; width:159px;">
                        <el-tab-pane v-for="(item, index) in list" :key="index" :label="item.title "></el-tab-pane>
                    </el-tabs>
                </div>
            </el-aside>
            <el-main>
                <common-main-wrap class="common-main-wrap" :auditType="auditType" :title="title" />
            </el-main>
        </el-container>
    </div>
</template>
<script lang="ts">
    import CommonMainWrap from "../views/common-main-wrap";
    import { Component, Vue } from 'vue-property-decorator'

    @Component({
        components: {
            CommonMainWrap
        }
    })
    export default class Audit extends Vue {
        private title = ''
        private auditType = 'ACCOUNT'
        private list: Array<object> = [
            {
                title: "电子签约文件",
                auditType: "CONTRACT",
            },
            {
                title: "业务流配置",
                auditType: "CATEGORY",
            },
            {
                title: "印章管理",
                auditType: "SEAL",
            },
            {
                title: "权限管理",
                auditType: "ROLE",
            },
            {
                title: "模板库管理",
                auditType: "TEMPLATE",
            },
            {
                title: "组织与成员",
                auditType: "EMPLOYEE",
            },
            {
                title: "账号登录",
                auditType: "ACCOUNT",
            },
        ]
        public handleTabClick(tab: object): void {
            this.auditType = this.list[tab.paneName].auditType
            this.title = this.list[tab.paneName].title
        }
    }

</script>


<style scoped>
    .el-container {
        height: 100%;
    }

    .el-aside,
    .common-main-wrap {
        overflow: hidden;
    }

    #audit {
        height: 100%;
        -webkit-user-select: none;
    }

    #search-module {
        width: 100%;
        height: 113px;
        padding: 30px 0 30px 30px;
        border-bottom: 1px solid rgb(228, 231, 237);
    }

    .filter {
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
        padding-right: 200px;
    }

    .tabs {
        width: 160px;
        height: 100%;
        padding-right: 30px;
    }
</style>