<template>
    <div class="box">
        <div id="login">
            <p>电子合同签署平台</p>
            <form>
                <div class="user hp-row">
                    <input v-model="username" class="input" required />
                    <span class="bar"></span>
                    <label>账号</label>
                    <span class="tip">账号不为空</span>
                </div>
                <div class="passwd hp-row">
                    <input v-model="password" show-password class="input" required>
                    <span class="bar"></span>
                    <label>密码</label>
                    <span class="tip">密码不为空</span>
                </div>
                <el-button @click="handleLogin" type="primary">登陆</el-button>
            </form>
        </div>
    </div>
</template>
<script lang="ts">
    import qs from "qs";
    import { Vue, Component } from 'vue-property-decorator'
    // 定义表格数据类型
    interface UserInfo {
        username: string;
        password: string;
    }

    @Component
    export default class Login extends Vue {
        username = ""
        password = ""
        handleLogin(): void {
            if (!this.username || !this.password) {
                return;
            }
            const fromData: UserInfo = {
                username: '10000000001',
                password: '{cipher}qgDS6XetVCvFxYEtDdx8OlJyjRScQ1EgL6sYUXALYUJenEyyWEhCTimIs/ClfyNw+Jw/uXrqK8ImjeFfZoUQMzVBFkCo7Y4eg6fwmOUHSA+HkFKsoI+oMnKkPu5eUZS9LE3aZcMkDa4qwvMbrCIhE5OHS2ImlrI2Y3nvrXR7zBs='
            }
            Vue.prototype.axios
                .post('/login', qs.stringify(fromData))
                .then((res: any) => {
                    if (res.data.code == 0) {
                        this.getUserData()
                        this.$router.push({
                            name: 'system'
                        })
                    }
                })
        }
        async getUserData() {
            const userData: any = await Vue.prototype.axios.get('/user')
            this.$store.commit('setUserData', userData.data.result)
        }
    }

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
        text-align: center;
    }

    .hp-row input {
        width: 291px;
        height: 38px;
        border: none;
        border-bottom: 1px solid #ccc;
        outline: none;
    }
    .hp-row input:valid, .hp-row input:focus {
        border: none;
    }
    input ~ span.tip {
        display: none;
    }
    input:focus:invalid ~ span.tip {
        margin-top: 5px;
        display: block;
        color: red;
        font-size: 12px;
    }

</style>