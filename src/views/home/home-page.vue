<template>
    <div class="home">
        <div class="main-content" :class="isFold ? 'fold':''">
            <div class="affair-list">
                <div class="list-header">
                    <el-tabs v-model="activeName" @tab-click="handleClickLabel">
                        <el-tab-pane label="待办事务" name="affairList"></el-tab-pane>
                        <el-tab-pane label="我发起的" name="launchByMe"></el-tab-pane>
                    </el-tabs>
                    <div class="filters">
                        <div class="filter-dropdown">
                            <span class="seal-type">用印类型：</span>
                            <el-dropdown>
                                <span class="el-dropdown-link">
                                    全部
                                    <i class="el-icon-arrow-down el-icon--right"></i>
                                </span>
                                <el-dropdown-menu>
                                    <el-dropdown-item>全部</el-dropdown-item>
                                    <el-dropdown-item>狮子头</el-dropdown-item>
                                    <el-dropdown-item>螺蛳粉</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </div>
                        <el-divider direction="vertical"></el-divider>
                        <span class="el-tooltip">11</span>
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
            <div class="fold-divider" :class="isFold ? 'fold':''">
                <i @click="handleClickIcon">
                    <span class="triangle"></span>
                </i>
            </div>
        </div>

        <div class="right-content" :class="isFold ? 'fold':''"></div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isFold: false,
            activeName: 'affairList',
            affairList: [
                {
                    id: 1,
                    sealType: '电子',
                    title:
                        '维森集团有限公司-重新认证-测试-默认流程HLL-施周-20200825-00004',
                    signatory: '维森集团有限公司',
                    createTime: '2020-08-25 14:35:12'
                },
                {
                    id: 2,
                    sealType: '电子',
                    title:
                        '维森集团有限公司-重新认证-测试-默认流程HLL-施周-20200825-00004',
                    signatory: '维森集团有限公司',
                    createTime: '2020-08-25 14:35:12'
                },
                {
                    id: 3,
                    sealType: '电子',
                    title:
                        '维森集团有限公司-重新认证-测试-默认流程HLL-施周-20200825-00004',
                    signatory: '维森集团有限公司',
                    createTime: '2020-08-25 14:35:12'
                },
                {
                    id: 4,
                    sealType: '电子',
                    title:
                        '维森集团有限公司-重新认证-测试-默认流程HLL-施周-20200825-00004',
                    signatory: '维森集团有限公司',
                    createTime: '2020-08-25 14:35:12'
                },
                {
                    id: 5,
                    sealType: '电子',
                    title:
                        '维森集团有限公司-重新认证-测试-默认流程HLL-施周-20200825-00004',
                    signatory: '维森集团有限公司',
                    createTime: '2020-08-25 14:35:12'
                }
            ]
        };
    },
    methods: {
        handleClickIcon() {
            this.isFold = !this.isFold;
        },
        handleClickLabel(tab, event) {
            // console.log(tab, event)
            console.log(this.activeName);
        }
    }
};
</script>

<style lang="less" scoped>
.home {
    width: 100%;
    height: 100%;
    display: flex;
    scroll-behavior: auto;
    padding: 25px 0;
    @mainWidth: 300px;

    .main-content {
        position: relative;
        width: calc(100% - @mainWidth);
        height: 100%;
        box-sizing: border-box;
        transition: 0.3s;
        background: #fff;
        display: flex;
        padding-right: 25px;

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
                            width: 5em;
                        }

                        span.el-dropdown-link {
                            display: inline-block;
                            width: 6em;
                            
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
        &.fold {
            width: 100%;
        }

        .fold-divider {
            position: absolute;
            right: 0;
            width: 12px;
            height: 100%;
            background: #ddd;

            &.fold {
                background: #fff;

                &:hover {
                    border: none;
                    border-right: 2px solid rgb(36, 137, 242);
                }
                i {
                    background-color: #ddd;
                    transform: rotate(180deg);

                    span {
                        border-color: transparent transparent transparent #fff;
                    }
                }
            }

            &:hover {
                border-left: 2px solid rgb(36, 137, 242);
                box-sizing: border-box;
            }

            i {
                position: absolute;
                top: 300px;
                display: inline-block;
                width: 12px;
                height: 60px;
                background-color: #fff;
                border-top-right-radius: 15px;
                border-bottom-right-radius: 15px;
                line-height: 60px;

                &:hover {
                    background: #2489f2;
                }

                span {
                    display: inline-block;
                    margin-left: 2px;
                    width: 0px;
                    height: 0px;
                    border: 6px solid;
                    border-color: transparent transparent transparent #ddd;
                }
            }
        }
    }

    .right-content {
        width: 300px;
        height: 100%;
        box-sizing: border-box;
        padding: 16px;
        transition: 0.3s;

        &.fold {
            width: 0;
            padding: 0;
        }
    }
}
</style>