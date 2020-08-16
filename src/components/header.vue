<template>
  <div class="header">
    <i :class="classname" style="font-size:24px" @click="handleClickCollapse"></i>
    <div class="ctrl">
      <el-select v-model="value" placeholder="padding">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.value"
          :value="item.value"
        ></el-option>
      </el-select>
      <div class="bg-color">
        <el-color-picker v-model="bgColor"></el-color-picker>
      </div>

      <el-dropdown>
        <el-button>
          语言切换
          <i class="el-icon-caret-bottom"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>简体中文</el-dropdown-item>
          <el-dropdown-item >English</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

      <el-dropdown placement="bottom">
         <el-avatar :size="50" :src="circleUrl"></el-avatar>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item>安全退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown> 
    </div>
  </div>
</template>

<script>
export default {
  props: {
    menuShow: Boolean,
  },
  data() {
    return {
      options: [
        {
          value: "12px 15px",
          label: "12px 15px",
        },
        {
          value: "20px 25px",
          label: "20px 25px",
        },
        {
          value: "28px 35px",
          label: "28px 35px",
        },
      ],
      value: "",
      bgColor: "#f7f8f8",
      circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
    };
  },
  methods: {
    handleClickCollapse() {
      // this.$store.state.sidebarOncollapse = !this.$store.state.sidebarOncollapse
      this.$store.commit("toggleSidebarOncollapse");
    },
    handleLogoutClick() {
        console.log(11)
        this.$router.push({
            name: "/"
        });
    }
  },
  computed: {
    classname() {
      return this.$store.state.sidebarOncollapse
        ? "el-icon-s-unfold"
        : "el-icon-s-fold";
    },
    getValue() {
      return this.value;
    },
    getBgColor() {
      return this.bgColor;
    },
  },
  watch: {
    getValue() {
      this.$store.commit("changePadding", {
        padding: this.getValue,
      });
    },
    getBgColor() {
      console.log(this.$store.getBgColor);
      this.$store.commit("changeBgColor", {
        bgColor: this.bgColor || "#f7f8f8",
      });
    },
  },
};
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
.ctrl {
  position: absolute;
  right: 30px;
  width: 400px;
  display: flex;
  top: 10px;
  justify-content: space-between;
}
i.el-icon-caret-bottom {
    border: none;
    padding-right: 0;
}
button.el-button.el-button--default.el-dropdown-selfdefine  {
    padding-right: 0;
    border: none;
}
</style>