<template>
    <div id="audit">
        <el-tabs tab-position="left" style="height: 100%; width=159px;">
            <el-tab-pane v-for="(item, index) in list" :key="index" :label="item.title ">
                <SearchModule :title="item.title" />
                <component :is="item.component"></component>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
import SignFile from '../components/sign-file'
import AccountLogin from '../components/account-login'
import BusinessFlowConfig from '../components/business-flow-config'
import ModuleManagement from '../components/module-management'
import OrganMember from '../components/organ-member'
import PowerManagement from '../components/power-management'
import SealManagement from '../components/seal-management'
import SearchModule  from '../components/search-module'

export default {
    data() {
        return {
            list: [
                {
                    title:"电子签约文件",
                    component: SignFile
                },
                {
                    title:"业务流配置",
                    component: BusinessFlowConfig
                 },
                {
                    title:"印章管理",
                    component: SealManagement
                },
                {
                    title:"权限管理",
                    component: PowerManagement
                },
                {
                    title:"模板库管理",
                    component: ModuleManagement
                },
                {
                    title:"组织与成员",
                    component: OrganMember
                },
                {
                    title:"账号登录",
                    component: AccountLogin
                }
            ]
        };
    },
    components: {
        SearchModule
    },
    mounted() {
        console.log(this.$route.meta);
    }
};
</script>


<style scoped>
#audit {
    height: 100%;
    -webkit-user-select: none;
}

</style>