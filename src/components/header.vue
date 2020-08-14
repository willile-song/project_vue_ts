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

            <el-button class="logout" @click="handleLogoutClick" type="info">安全登出</el-button>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        menuShow: Boolean
    },
    data() {
        return {
            options: [
                {
                    value: "12px 15px",
                    label: "12px 15px"
                },
                {
                    value: "20px 25px",
                    label: "20px 25px"
                },
                {
                    value: "28px 35px",
                    label: "28px 35px"
                }
            ],
            value: "",
            bgColor: "#f7f8f8"
        };
    },
    methods: {
        handleClickCollapse() {
            // this.$store.state.sidebarOncollapse = !this.$store.state.sidebarOncollapse
            this.$store.commit("toggleSidebarOncollapse");
        },
        handleLogoutClick() {
            this.$store.commit("removeUserInfo");
            localStorage.removeItem("userInfo");
            this.$router.push({
                name: "login"
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
        }
    },
    watch: {
        getValue() {
            this.$store.commit("changePadding", {
                padding: this.getValue
            });
        },
        getBgColor() {
            console.log(this.$store.getBgColor);
            this.$store.commit("changeBgColor", {
                bgColor: this.bgColor || "#f7f8f8"
            });
        }
    }
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

</style>