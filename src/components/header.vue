<template>
    <div class="header">
        <i class="el-icon-s-fold" style="font-size:24px" @click="handleClickCollapse"></i>
    </div>
</template>

<script>
export default {
    methods: {
        handleClickCollapse() {
            this.$store.commit('changeSidebarOncollapse')
        }
    }
}
</script>

<style scoped>
i {
    padding-right: 20px;
    border-right: 1px solid #aaa;
    margin: 6px 20px 6px 0;
}
</style>