<template>
    <!-- 有两种方式可以渲染页面，一个是登录路由，另一个是用户信息未过期 -->
    <div id="app" v-if="isLogin || getUserData">    
        <router-view />
    </div>
</template>
<script>
export default {
    computed: {
        
        getUserData() {
            return this.$store.state?.userData;
        },
        // 路由是否为login
        isLogin() {
            return this.$route.name === "login" ? true : false;
        }
    },

    async mounted() {   // 页面刷新重新请求用户数据

        const user = await this.axios.get("/user");
        const userDataString = JSON.stringify(user?.data?.result?.user)
        let userData = '';
        if(userDataString) {
            userData = JSON.parse(userDataString);
        }
        this.$store.commit("setUserData", userData);
        // console.log(user.data);
    }
};
</script>

<style lang="less" scoped>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    width: 100%;
    height: 100%;
}
</style>

































