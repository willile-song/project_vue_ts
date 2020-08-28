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
                    <input v-model="password" show-password class="input" required />
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
import qs from 'qs';
import { Vue, Component } from 'vue-property-decorator';

// 定义表格数据类型
interface UserInfo {
    username: string;
    password: string;
}

@Component
export default class Login extends Vue {
    username = '';
    password = '';
    async handleLogin() {
        if (!this.username || !this.password) {
            return;
        }
        const fromData: UserInfo = {
            username: '18710663544',
            password:
                '{cipher}IgYSwHda11HOBRaA1Tet1qb95tcQLHBJqyPYo7vInWaFgAadQns+fQb1wIglmz+5A2ZIqBV7yymnhsTJuAeYetpLBAX2/j1yb8zPo4jS2zmwocwYMeCqzwCofLPxku7fwR1pJJW4VSGcI5ZkR5qWF7UI/FWq2hscbvjDoA7eS5E='
        };
        // 登录
        this.axios
            .post('/login', qs.stringify(fromData))
            .then((res: any) => {
                if (res.data.code == 0) {
                    this.getUserData();
                    this.$router.push({
                        name: 'system'
                    });
                }
            });
        
    }

    // 获取user数据
    async getUserData() {
        const user = await this.axios.get("/user");
        const userDataString = JSON.stringify(user?.data?.result?.user)
        let userData = '';
        if(userDataString) {
            userData = JSON.parse(userDataString);
        }
        this.$store.commit("setUserData", userData);
    }
}
</script>
<style lang="less" scoped>
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
    .hp-row input:valid,
    .hp-row input:focus {
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

    div#login .el-input__inner {
        border-color: transparent;
        border-bottom-color: #ccc;
        outline: none;
        color: #c6c6c6;
    }
    .hp-row {
        position: relative;
        margin: 20px;
    }
    .hp-row label {
        position: absolute;
        top: 7px;
        left: 6px;
        color: #c6c6c6;
        font-size: 16px;
        transition: all 0.3s ease;
        pointer-events: none;
    }
    .hp-row input:focus ~ label,
    .hp-row input:valid ~ label {
        top: -14px;
        font-size: 12px;
        color: #2196f3;
    }
    span.bar {
        display: block;
        position: relative;
    }
    span.bar::before {
        position: absolute;
        content: '';
        width: 0;
        height: 2px;
        background-color: #2196f3;
        transition: all 0.3s ease;
    }
    .hp-row input:focus ~ span.bar::before,
    .hp-row input:valid ~ span.bar::before {
        width: 292px;
    }
    /deep/ .el-button.el-button--primary {
        width: 300px;
        margin-left: 18px;
    }
}
</style>