<template>
    <div class="header">
        <i :class="classname" style="font-size:24px" @click="handleClickCollapse"></i>
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
i {
    padding-right: 20px;
    border-right: 1px solid #aaa;
    margin: 6px 20px 6px 0;
}
</style>