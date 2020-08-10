<template>
  <div class="box">
    <div id="login">
      <p>电子合同签署平台</p>
      <el-input v-model="username" placeholder="账号"></el-input>
      <el-input v-model="password" placeholder="密码" show-password></el-input>
      <el-button @click="handleLogin">登陆</el-button>
    </div>
  </div>
</template>
<script>
import axios from "../../interceptor";
console.log(axios)

export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    handleLogin() {
      if (!this.username) {
        alert("请输入用户名");
      } else if (!this.password) {
        alert("请输入密码");
      }
      // axios({
      //     url:'http://app11.qiyuesuo.net/login',
      //     methods:'post',
      //     data: {
      //         username:'10000000001',
      //         password:'{cipher}qgDS6XetVCvFxYEtDdx8OlJyjRScQ1EgL6sYUXALYUJenEyyWEhCTimIs/ClfyNw+Jw/uXrqK8ImjeFfZoUQMzVBFkCo7Y4eg6fwmOUHSA+HkFKsoI+oMnKkPu5eUZS9LE3aZcMkDa4qwvMbrCIhE5OHS2ImlrI2Y3nvrXR7zBs='
      //     }
      // }).then(res=> {
      //     console.log(res.data)
      // })
      const formData = new FormData();
      formData.append("username", "10000000001");
      formData.append(
        "password",
        "{cipher}qgDS6XetVCvFxYEtDdx8OlJyjRScQ1EgL6sYUXALYUJenEyyWEhCTimIs/ClfyNw+Jw/uXrqK8ImjeFfZoUQMzVBFkCo7Y4eg6fwmOUHSA+HkFKsoI+oMnKkPu5eUZS9LE3aZcMkDa4qwvMbrCIhE5OHS2ImlrI2Y3nvrXR7zBs="
      );
      axios.post("/login", formData).then(({ data }) => {
        console.log(data);
        if (data.code == 0) {
          sessionStorage.setItem('loginTaken', data.token)
          this.$router.push({
            name: "system",
          });
        }
      });
      this.username = "";
      this.password = "";
    },
  },
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
  border: 2px solid #ccc;
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
}
</style>