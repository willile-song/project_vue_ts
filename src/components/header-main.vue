<template>
    <div class="header">
        <div class="launch-menu">
            <i :class="classname" style="font-size:24px" @click="handleClickCollapse"></i>
        </div>
        <div class="head-menu"></div>
        
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop, Watch } from 'vue-property-decorator'

    interface Option {
        value: string;
        label: string;
    }

    @Component
    export default class MainHeader extends Vue {
        @Prop() menuShow!: boolean
        public options: Array<Option> = [
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
        ]
        // padding值
        value = '';
        // 背景色
        bgColor = '#f7f8f8';

        circleUrl = 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png';

        public handleClickCollapse(): void {
            this.$store.commit('toggleSidebarOncollapse')
        }

        get classname(): string {
            return this.$store.state.sidebarOncollapse
                ? "el-icon-s-unfold"
                : "el-icon-s-fold";
        }

        get getValue(): string {
            return this.value;
        }

        get getBgColor(): string {
            return this.bgColor;
        }
        
        @Watch('getValue')
        public valueChanged(): void {
            this.$store.commit("changePadding", {
                padding: this.getValue,
            });
        }

        @Watch('getBgColor')
        public colorChanged(): void {
            this.$store.commit("changeBgColor", {
                bgColor: this.bgColor || "#f7f8f8",
            });
        }
    }

</script>

<style lang="less" scoped>
    .header {
        .launch-menu {

        }
    }


    
    
</style>