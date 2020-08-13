<template>
    <div class="header">
        <i :class="classname" style="font-size:24px" @click="handleClickCollapse"></i>
        <el-button class="logout" type="info">安全登出</el-button>
    </div>
</template>

<script>
export default {
    props:{
        menuShow: Boolean
    },
    methods: {
        handleClickCollapse() {
            // this.$store.state.sidebarOncollapse = !this.$store.state.sidebarOncollapse
            this.$store.commit('toggleSidebarOncollapse')
        },
        handleLogoutClick() {
            console.log(11)
        }
    },
    computed: {
        classname() {
            return this.$store.state.sidebarOncollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'
        }
    }
}
</script>

<style scoped>
.header {
    position: relative;
}
i {
    padding-right: 20px;
    border-right: 1px solid #aaa;
    margin: 6px 20px 6px 0;
}
.logout {
    position: absolute;
    right: 30px;
}
</style>