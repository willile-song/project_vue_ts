<template>
    <div id="app" v-if="isLogin || getUserData">
        <router-view />
    </div>
</template>
<script lang="ts">
export default {
    computed: {
        getUserData(): string {
            return this.$store.state?.userData;
        },
        isLogin(): boolean {
            return this.$route.name === "login" ? true : false;
        }
    },
    async mounted() {
        const user = await this.axios.get("/user");
        this.$store.commit("setUserData", JSON.stringify(user));
    }
};
</script>

































