
<template>
    <div id="audit">
        <el-container class="el-container">
            <el-aside width="159px">
                <div class="tabs">
                    <el-tabs
                        v-model="auditType"
                        tab-position="left"
                        style="height: 100%; width:159px;"
                    >
                        <el-tab-pane
                            v-for="(item, index) in list"
                            :key="index"
                            :label="item.title"
                            :name="item.auditType"
                        ></el-tab-pane>
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
import CommonMainWrap from '@/components/common-main-wrap.vue';
import { Component, Vue } from 'vue-property-decorator';

@Component({
    components: {
        CommonMainWrap
    }
})
export default class Audit extends Vue {
    auditType = 'CONTRACT';

    status = false;

    list = [
        {
            title: '电子签约文件',
            auditType: 'CONTRACT'
        },
        {
            title: '业务流配置',
            auditType: 'CATEGORY'
        },
        {
            title: '印章管理',
            auditType: 'SEAL'
        },
        {
            title: '权限管理',
            auditType: 'ROLE'
        },
        {
            title: '模板库管理',
            auditType: 'TEMPLATE'
        },
        {
            title: '组织与成员',
            auditType: 'EMPLOYEE'
        },
        {
            title: '账号登录',
            auditType: 'ACCOUNT'
        }
    ];
    // 通过auditType获取title
    get title() {
        return this.list.find(item => this.auditType === item.auditType)?.title;
    }
}
</script>


<style lang="less" scoped>
#audit {
    height: 100%;
    -webkit-user-select: none;

    .el-aside {
        overflow-x: hidden;
    }

    .el-container {
        height: 100%;

        .tabs {
            width: 160px;
            height: 100%;
            padding-right: 30px;

            /deep/ .el-tabs__nav.is-left {
                padding-right: 36px;
                margin-top: 30px;
            }
            
            /deep/ .el-tabs__nav.is-left div[role='tab'] {
                text-align: left;
            }

            /deep/ ul.el-menu[role='menubar'] {
                height: 100%;
            }
        }
    }
}
</style>