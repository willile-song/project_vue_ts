<template>
    <div class="affair-list">
        <div class="list-header">
            <el-tabs v-model="activeName" @tab-click="handleClickLabel">
                <el-tab-pane label="待办事务" name="affairList"></el-tab-pane>
                <el-tab-pane label="我发起的" name="launchByMe"></el-tab-pane>
            </el-tabs>
            <div class="filters">
                <div class="filter-dropdown">
                    <span class="seal-type">用印类型:</span>
                    <el-dropdown @command="handleCommand">
                        <span class="el-dropdown-link">
                            全部
                            <i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu>
                            <el-dropdown-item command="total">全部</el-dropdown-item>
                            <el-dropdown-item command="electronic-seal">电子</el-dropdown-item>
                            <el-dropdown-item command="physical-seal">物理</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
                <el-divider direction="vertical"></el-divider>
                <span
                    :class="isAscending ? 'el-icon-sort-up' : 'el-icon-sort-down'"
                    @click="handleClickSortIcon"
                ></span>
            </div>
        </div>
        <ul>
            <li class="list-item" v-for="item in affairList" :key="item.id">
                <div class="list-info">
                    <div class="subject">
                        <span class="contract-type">{{item.sealType}}</span>
                        <span class="title">{{item.title}}</span>
                    </div>
                    <div class="supply-info">
                        <span>签署方：{{item.signatory}}</span>
                        <div class="create-time">
                            <span>由{{item.signatory}} 于 {{item.createTime}}发起</span>
                            <i class="el-icon-position"></i>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import list from '../mock/affair-list';

export default {
    data() {
        return {
            affairList: list, // 列表数据，此处为mock
            activeName: 'affairList',
            isAscending: true
        };
    },
    methods: {
        handleClickLabel(tab, event) {  // 切换事务
            // console.log(tab, event)
            console.log(this.activeName);
        },
        handleCommand(command) {  // 下拉菜单点击事件
            console.log(command);
        },
        handleClickSortIcon() {   // 排序切换事件
            this.isAscending = !this.isAscending;
        }
    }
};
</script>

<style lang="less" scoped>
.affair-list {
    width: 100%;
    height: 100%;

    .list-header {
        height: 39px;
        margin-bottom: 8px;
        padding-top: 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        /deep/ .el-tabs__nav-wrap::after {
            height: 0;
        }
        /deep/ .el-tabs__active-bar {
            height: 0;
        }
        /deep/ .el-tabs.el-tabs--top {
            padding-left: 57px;

            div[role='tab'] {
                font-size: 16px;
                color: rgba(0, 0, 0, 0.2);

                &.is-active {
                    color: #000;
                    font-weight: 600;
                }
            }
        }

        .filters {
            display: flex;
            justify-content: space-between;
            align-items: center;

            .filter-dropdown {
                display: flex;
                align-items: center;

                span.seal-type {
                    display: inline-block;
                    font-size: 14px;
                    color: #7f8997;
                    width: 5em;
                }

                .el-dropdown {
                    margin-left: 0;

                    span.el-dropdown-link {
                        display: inline-block;
                        width: 56px;
                        color: #001330;
                    }
                }
            }
        }
    }

    ul {
        list-style: none;
        li {
            padding: 0 16px;
            cursor: pointer;
            &:hover {
                background-color: #f7f8f8;
            }

            .list-info {
                padding: 18px 0;
                border-bottom: 1px solid #f2f3f4;

                .subject {
                    margin-bottom: 6px;

                    .contract-type {
                        display: inline-block;
                        width: 24px;
                        height: 20px;
                        color: #2489f3;
                        background-color: #e4f0fd;
                        font-size: 12px;
                        line-height: 20px;
                        text-align: center;
                        border-radius: 4px;
                        margin-right: 8px;
                        padding: 2px 8px;
                    }

                    .title {
                        vertical-align: middle;
                        font-size: 16px;
                        font-weight: 600;
                        color: #001330;
                        line-height: 26px;
                    }
                }

                .supply-info {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    color: #7f8997;
                    line-height: 22px;

                    span {
                        font-size: 14px;
                    }

                    .create-time {
                        font-size: 12px;

                        i {
                            display: inline-block;
                            width: 12px;
                            height: 13px;
                            margin-left: 3px;
                        }
                    }
                }
            }
        }
    }
}
</style>