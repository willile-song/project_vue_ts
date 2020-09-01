<template>
    <div class="affair-list">
        <!-- 列表头 -->
        <div class="list-header">
            <el-tabs v-model="activeName" @tab-click="handleClickLabel">
                <el-tab-pane label="待办事务" name="affairList"></el-tab-pane>
                <el-tab-pane label="我发起的" name="launchedByMe"></el-tab-pane>
            </el-tabs>
            <div class="filters">
                <div class="filter-dropdown">
                    <span class="seal-type">用印类型:</span>
                    <el-dropdown @command="handleCommand">
                        <span class="el-dropdown-link">
                            {{dropdownLabel}}
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

        <!-- 占位图 -->
        <div class="no-data" v-if="!(affairList && affairList.length)">
            <div>
                <img src="@/assets/imgs/no-data.ce805baeb1dabaf4.png" />
                <p>暂时无数据！！！</p>
            </div>
        </div>

        <!-- 列表 -->
        <div v-else>
            <ul v-loading="loading">
                <li class="list-item" v-for="item in affairList" :key="item.id">
                    <div class="list-info">
                        <div class="subject">
                            <span
                                class="contract-type"
                                :class="item.contractType === 'PHYSICS' ? 'physics' : ''"
                            >{{item.contractType === 'PHYSICS' ? '物理' : '电子'}}</span>

                            <span class="title">{{item.subject}}</span>
                        </div>
                        <div class="supply-info">
                            <span>{{item.tenantName ? '签署方：' : '申请人'}}：{{item.tenantName || item.submitorName}}</span>
                            <div class="create-time">
                                <span>由{{item.tenantName}} 于 {{item.createTime}}发起</span>
                                <i class="el-icon-position"></i>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>

            <!-- 分页 -->
            <el-pagination
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                :page-size="1"
                layout="total, prev, pager, next"
                :total="totalPages"
            ></el-pagination>
        </div>
    </div>
</template>

<script>
import list from '../mock/affair-list';
// 初始化参数类
class Params {
    status = 'REQUIRED';
    PageNo = 1;
    pageSize = 10;
    businessType = '';
    asc = false; // 是否升序排列
    fromMe = false; // 是否由我发起
}

export default {
    data() {
        return {
            affairList: null, // 列表数据,
            activeName: 'affairList',
            isAscending: true,
            reqParams: new Params(), // 参数实例,
            totalPages: 10,
            currentPage: 1,
            dropdownLabel: '全部',
            loading: true // 是否加载loading动画
        };
    },

    methods: {
        // 切换事务
        // console.log(tab, event)
        handleClickLabel(tab, event) {
            const fromMe = this.activeName === 'launchedByMe';
            const status = fromMe ? 'TOTAL' : 'REQUIRED';
            this.reqParams.fromMe = fromMe;
            this.reqParams.status = status;
        },

        // 用印类型 下拉菜单点击事件
        handleCommand(command) {
            let businessType;
            if (command === 'total') {
                businessType = '';
                this.dropdownLabel = '全部';
            } else if (command === 'electronic-seal') {
                businessType = 'ELECTRONIC';
                this.dropdownLabel = '电子';
            } else {
                businessType = 'PHYSICS';
                this.dropdownLabel = '物理';
            }
            this.reqParams.businessType = businessType;
        },

        // 排序切换事件
        handleClickSortIcon() {
            this.isAscending = !this.isAscending;
            this.reqParams.asc = this.isAscending;
        },

        // 获取列表数据
        getList() {
            this.loading = true;
            this.axios
                .get('/contractsealapply/page', {
                    params: {
                        ...this.reqParams
                    }
                })
                .then(resp => {
                    const { totalPages, result } = resp.data.result;
                    this.affairList = result;
                    this.totalPages = totalPages;
                });
            setTimeout(() => {
                this.loading = false;
            }, 500);
        },

        handleCurrentChange() {
            this.reqParams.PageNo = this.currentPage;
        }
    },
    computed: {
        computeReqParams() {
            return JSON.parse(JSON.stringify(this.reqParams)); // 冻结对象；
        }
    },
    // 监听计算属性的变化
    watch: {
        computeReqParams() {
            this.getList();
        }
    },
    mounted() {
        this.getList();
    }
};
</script>

<style lang="less" scoped>
.affair-list {
    width: 100%;
    height: 100%;

    // 列表头
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
                color: #7f8997;
                line-height: 54px;

                &.is-active {
                    color: #000;
                    font-weight: 600;
                }
                &:hover {
                    color: #4c596e;
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

    // 占位图
    .no-data {
        margin-top: 200px;
        width: 100%;

        div {
            img {
                width: 260px;
                height: 130px;
                margin-left: calc(50% - 130px);
            }

            p {
                text-align: center;
            }
        }
    }

    // 列表
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

                // 标题
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

                        &.physics {
                            color: #2bb353;
                            background-color: #e5f5ea;
                        }
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

    // 分页
    /deep/ .el-pagination {
        display: flex;
        justify-content: flex-end;
        padding: 40px 5px 2px 5px;
        background: #fff;
    }
}
</style>