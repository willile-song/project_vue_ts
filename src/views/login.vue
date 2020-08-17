<template>
    <div class="box">
        <div id="login">
            <p>电子合同签署平台</p>
            <form>
                <div class="user hp-row">
                    <input v-model="username" class="input" />
                    <span class="bar"></span>
                    <label>账号</label>
                </div>
                <div class="passwd hp-row">
                    <input v-model="password" show-password class="input">
                    <span class="bar"></span>
                    <label>密码</label>
                </div>
                <el-button @click="handleLogin" type="primary">登陆</el-button>
            </form>
        </div>
    </div>
</template>
<script>
import qs from "qs";

export default {
    data() {
        return {
            username: "",
            password: ""
        };
    },
    methods: {
        // 对输入进行校验
        handleLogin() {
            if (!this.username) {
                return;
            } else if (!this.password) {
                return;
            }
            const formData = {
                username: "10000000001",
                password:
                    "{cipher}qgDS6XetVCvFxYEtDdx8OlJyjRScQ1EgL6sYUXALYUJenEyyWEhCTimIs/ClfyNw+Jw/uXrqK8ImjeFfZoUQMzVBFkCo7Y4eg6fwmOUHSA+HkFKsoI+oMnKkPu5eUZS9LE3aZcMkDa4qwvMbrCIhE5OHS2ImlrI2Y3nvrXR7zBs="
            };

            this.axios
                .post("/login", qs.stringify(formData))
                .then(({ data }) => {
                    if (data.code == 0) {
                        this.getUserData();
                        this.$router.push({
                            name: "system"
                        });
                    }
                });
            this.username = "";
            this.password = "";
        },
        async getUserData() {
            const userData = await this.axios.get("/user");
            this.$store.commit("getUserData", userData.data.result);
            localStorage.setItem("userInfo", JSON.stringify(userData));
        }
    }
};
</script>
<style scoped>
.box {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
}

#login {
    width: 378px;
    height: 375px;
    background-color: #fff;
    padding: 24px 48px;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}
p {
    font-size: 24px;
    font-weight: bolder;
    text-align:center ;
}
.hp-row input  {
    width:291px;
    height: 38px;
    border: none;
    border-bottom:1px solid #ccc;
    padding:0 30px 0 15px;
    outline: none;
}

</style>