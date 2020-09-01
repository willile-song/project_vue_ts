<template>
    <div id="common-main-wrap">
        <div id="search-module">
            <h4>{{title}}</h4>
            
            <!-- 过滤模块 -->
            <div class="filter">
                <div class="time-picker">
                    <span class="demonstration">时间：</span>
                    <el-date-picker
                        v-model="searchParams.picker"
                        type="datetimerange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                    ></el-date-picker>
                </div>
                <div class="operator">
                    <span>操作人：</span>
                    <el-select
                        class="el-select"
                        style="width:83px;"
                        v-model="searchParams.operator"
                        placeholder="请选择"
                    >
                        <el-option
                            v-for="item in operatorOptions"
                            :key="item.accountId"
                            :label="item.name"
                            :value="item.accountId"
                        ></el-option>
                    </el-select>
                </div>
                <div class="operation">
                    <span>操作：</span>
                    <el-select
                        class="el-select"
                        style="width:83px;"
                        v-model="searchParams.operation"
                        placeholder="请选择"
                    >
                        <el-option
                            v-for="item in operationOptions"
                            :key="item.operation"
                            :label="item.description"
                            :value="item.description"
                        ></el-option>
                    </el-select>
                </div>

                <div class="match">
                    <span>搜索：</span>
                    <el-input
                        class="inline-input"
                        v-model="searchParams.keyword"
                        placeholder="请输入内容"
                    ></el-input>
                </div>
                <el-button class="btn" type="primary" @click="search">搜索</el-button>
                <el-button class="btn" plain @click="reset">重置</el-button>
            </div>
        </div>

        <!-- // 表格部分 -->
        <div class="table">
            <el-table :data="tableData" style="width: 100%">

                <el-table-column
                    v-for="(item, index) in tableHeader"
                    :key="index"
                    :width="item.width"
                    :prop="item.prop"
                    :label="item.label"
                ></el-table-column>

                <!-- 点击展开 -->
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-form label-position="right" inline class="demo-table-expand">
                            <el-form-item>
                                <span class="title">详细操作数据</span>
                                <span>{{ props.row.detailedOperation }}</span>
                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
            </el-table>

            <!-- 分页 -->
            <div class="pagination">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="pageParams.currentPage"
                    :page-sizes="[5, 10, 15, 20]"
                    :page-size="pageParams.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="pageParams.pageTotal"
                ></el-pagination>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
// 搜索框属性类
class InitParams {
    picker = '';
    operation = '';
    operator = '';
    keyword = '';
}
// 分页类
class InitPageData {
    pageNo = 1;
    pageSize = 10;
    pageTotal = 1;
    currentPage = 1;
}
@Component
export default class CommonMainWrap extends Vue {
    @Prop() title!: string;

    @Prop() auditType!: string;
    // 表数据
    tableData: Array<any> = [];
    // 操作人搜索框数据
    operatorOptions: Array<any> = [];
    // 操作搜索框数据
    operationOptions: Array<any> = [];
    // 表头数据
    tableHeader: Array<any> = [
        {
            prop: 'createTime',
            label: '时间',
            width: ''
        },
        {
            prop: 'operator',
            label: '操作人',
            width: '200px'
        },
        {
            prop: 'operationDesc',
            label: '操作',
            width: ''
        },
        {
            prop: 'entityName',
            label: '操作对象',
            width: ''
        },
        {
            prop: 'sealNames',
            label: '使用印章',
            width: ''
        },
        {
            prop: 'detailedOperation',
            label: '详细操作数据',
            width: '400px'
        }
    ];

    // 公司id
    companyId!: string;

    // 初始化搜索框数据
    searchParams = new InitParams();
    // 初始化page相关数据
    pageParams = new InitPageData();

    //计算属性中的数据
    get comptuedParams(): any {
        return {
            auditType: this.auditType
        };
    }
    // 监听计算属性
    @Watch('comptuedParams')
    comptuedParamsChanged(): void {
        this.getListData();
        this.getOperation();
    }

    handleSizeChange(val: number): void {
        this.pageParams.pageSize = val;
        this.getListData();
    }

    handleCurrentChange(val: number) {
        this.pageParams.pageNo = val;
        this.getListData();
    }
    // 获取数据
    getListData(): void {
        this.axios
            .get('/system/audit/list', {
                params: {
                    ...this.comptuedParams,
                    ...this.pageParams,
                    companyId: '2703493711465512985',
                    createTimeFrom: this.searchParams?.picker[0],
                    createTimeTo: this.searchParams?.picker[1],
                    operation: this.searchParams?.operation,
                    operator: this.searchParams?.operator,
                    keyword: this.searchParams?.keyword
                }
            })
            .then((res: any) => {
                this.tableData = res.data.result.result;
                this.pageParams.pageTotal = res.data.result.totalCount;
            });
    }
    getOperation(): void {
        console.log(JSON.parse(this.$store.state.userData));
        this.axios
            .get('/system/audit/operation', {
                params: {
                    auditType: this.auditType,
                    companyId: '2703493711465512985'
                }
            })
            .then((res: any) => {
                const { operators, operations } = res.data.result;
                this.operatorOptions = operators;
                this.operationOptions = operations;
            });
    }

    // 搜索按钮事件
    search(): void {
        this.getListData();
    }

    // 重置搜索框，表单同步变化
    reset(): void {
        this.searchParams = new InitParams();
        this.getListData();
    }

    async mounted() {
        this.getOperation();
        this.getListData();
    }
}
</script>
<style lang="less"  scoped>
.common-main-wrap {
    overflow-x: hidden;

    #search-module {
        width: 100%;
        padding: 30px 0 30px 30px;
        border-bottom: 1px solid rgb(228, 231, 237);

        //全局移回的样式，针对搜索模块的尺寸 ----------------------------
        /deep/ .match .el-input .el-input__inner {
            width: 148px;
            height: 38px;
        }

        /deep/ .el-select.el-select {
            width: 130px !important;
        }
        /deep/ span.title {
            margin-right: 50px;
        }

        /deep/ .custom-tree-node {
            position: relative;
        }
        /deep/ .custom-tree-node > .el-icon-more {
            margin-left: 20px;
        }

        /deep/ .el-tree-node__content:hover .el-dropdown-link {
            display: block;
            color: #aaa;
        }
        /deep/ .el-button.el-button--text.el-button--mini > span {
            color: #aaa;
            font-size: 14px;
            background-color: #f7f8f8;
        }
        /deep/ .el-button.el-button--text.el-button--mini:hover span {
            color: #000;
        }
        // ------        -------          -----
        .filter {
            display: flex;
            justify-content: start;
            flex-direction: row;
            flex-wrap: wrap;
            padding-right: 200px;

            .time-picker,
            .operator,
            .operation,
            .match,
            .btn {
                margin: 5px;
            }
            
            .match {
                .inline-input {
                    display: inline;
                }
            }
        }
    }

    .table {

        .pagination {
            padding: 20px 24px;
            display: flex;
            justify-content: flex-end;
        }

        .demo-table-expand {
            font-size: 0;

            label {
                width: 90px;
                color: #99a9bf;
            }

            .el-form-item {
                margin-right: 0;
                margin-bottom: 0;
                width: 50%;
            }
        }
    }
}
</style>