<template>
    <div class="header">
        <div class="left">
            <i :class="classname" style="font-size:24px" @click="handleClickCollapse"></i>
            <el-divider direction="vertical"></el-divider>
        </div>
        <div class="right">
            <div class="header-user">
                <el-dropdown>
                    <span class="el-dropdown-link">简体中文</span>
                    <el-dropdown-menu>
                        <el-dropdown-item>简体中文</el-dropdown-item>
                        <el-dropdown-item>English</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <el-divider direction="vertical"></el-divider>

                <div class="user">
                    <el-dropdown @command="handleCommand">
                        <span class="el-dropdown-link">{{this.$store.state.userData.name}}</span>
                        <el-dropdown-menu>
                            <el-dropdown-item command="user">用户中心</el-dropdown-item>
                            <el-dropdown-item command="logout">安全退出</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import * as util from 'js-util-plus'


interface Option {
    value: string;
    label: string;
}

@Component
export default class MainHeader extends Vue {
    @Prop() menuShow!: boolean;
    public options: Array<Option> = [
        {
            value: '12px 15px',
            label: '12px 15px'
        },
        {
            value: '20px 25px',
            label: '20px 25px'
        },
        {
            value: '28px 35px',
            label: '28px 35px'
        }
    ];
    // padding值
    value = '';
    // 背景色
    bgColor = '#f7f8f8';

    circleUrl =
        'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png';

    handleClickCollapse(): void {
        this.$store.commit('toggleSidebarOncollapse');
    }

    handleCommand(command: string) {
        if (command === 'logout') {
            this.axios.post('/api/logout').then(res => {
                console.log(res);
            })
            this.$router.push('/login')
        }
    }

    get classname(): string {
        return this.$store.state.sidebarOncollapse
            ? 'el-icon-s-unfold'
            : 'el-icon-s-fold';
    }

    get getValue(): string {
        return this.value;
    }

    get getBgColor(): string {
        return this.bgColor;
    }

    @Watch('getValue')
    public valueChanged(): void {
        this.$store.commit('changePadding', {
            padding: this.getValue
        });
    }

    @Watch('getBgColor')
    public colorChanged(): void {
        this.$store.commit('changeBgColor', {
            bgColor: this.bgColor || '#f7f8f8'
        });
    }
}
</script>

<style lang="less" scoped>
.header {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;

    /deep/ .el-divider {
        height: 20px;
        margin: 0 16px;
    }

    .left {
        display: flex;
        align-items: center;
        padding-left: 24px;
    }

    .right {
        .header-user {
            width: 176px;
            padding-right: 24px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: #7f8997;
            font-size: 16px;

            .user {
                width: 48px;
                height: 48px;
                border-radius: 50px;
                background-color: #2489f2;
                text-align: center;
                line-height: 48px;
                font-size: 12px;
                span {
                    width: 100%;
                    height: 100%;
                    color: #fff;
                }
            }
        }
    }
}
</style>