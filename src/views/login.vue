<template>
    <div id="login">
        <p>电子合同签署平台</p>
        <el-input v-model="username" placeholder="账号"></el-input>
        <el-input v-model="password" placeholder="密码" show-password></el-input>
        <el-button @click="handleLogin">登陆</el-button>
    </div>
</template>
<script>
export default {
    data() {
        return {
            username: '',
            password: ''
        }
    },
    methods: {
        handleLogin() {
            if(!this.username) {
                alert("请输入用户名")
            }else if(!this.password) {
                alert("请输入密码")
            }else if(this.username == '10000000001' && this.password == 'Qiyuesuo#2020') {
                console.log(111)
            }else{
                alert("用户名密码错误！")
                this.$route.push('/system')
            }
            this.username = ''
            this.password = ''
        }
    }
}
</script>
<style scoped>

#login {
    width: 378px;
    height: 375px;
    border: 2px solid #ccc;
    margin: 200px auto;
    background-color: #fff;
    padding: 24px 48px;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}
p{
    font-size: 24px;
    color: blue;
}
</style>