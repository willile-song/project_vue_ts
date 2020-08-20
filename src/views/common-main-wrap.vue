<template>
    <div id="common-main-wrap">
        <div id="search-module">
            <h4>{{title}}</h4>
            <div class="filter">
                <div class="time-picker">
                    <span class="demonstration">时间：</span>
                    <el-date-picker v-model="valuePicker" type="datetimerange" range-separator="至"
                        start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
                </div>
                <div class="operator">
                    <span>操作人：</span>
                    <el-select class="el-select" style="width:83px;" v-model="valueOperator" placeholder="请选择">
                        <el-option v-for="item in operatorOptions" :key="item.accountId" :label="item.name"
                            :value="item.accountId"></el-option>
                    </el-select>
                </div>
                <div class="operation">
                    <span>操作：</span>
                    <el-select class="el-select" style="width:83px;" v-model="valueOperation" placeholder="请选择">
                        <el-option v-for="item in operationOptions" :key="item.operation" :label="item.description"
                            :value="item.description"></el-option>
                    </el-select>
                </div>

                <div class="match">
                    <span>搜索：</span>
                    <el-input class="inline-input" v-model="valueKeyword" placeholder="请输入内容"></el-input>
                </div>
                <el-button class="btn" type="primary" @click="search">搜索</el-button>
                <el-button class="btn" plain @click="reset">重置</el-button>
            </div>
        </div>

        <!-- // 表格部分 -->
        <div>
            <el-table :data="tableData" style="width: 100%">
                <el-table-column v-for="(item, index) in tableHeader" :key="index" :width="item.width" :prop="item.prop"
                    :label="item.label"></el-table-column>
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

            <div class="pagination">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                    :current-page="currentPage" :page-sizes="[5, 10, 15, 20]" :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper" :total="pageTotal"></el-pagination>
            </div>

        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

    @Component
    export default class CommonMainWrap extends Vue {

        @Prop() title!: string;

        @Prop() auditType!: string;

        tableData: Array<any> = []
        // 初始化 v-model绑定的值
        currentPage = 1;
        valuePicker = '';
        valueOperation = '';
        valueOperator = '';
        valueKeyword = '';
        // 初始化真正传入组件的值
        operator = '';
        picker = '';
        operation = '';
        keyword = '';

        operationOptions: Array<any> = [];
        operatorOptions: Array<any> = [];
        companyId = '';

        pageNo = 1;
        pageSize = 10;
        pageTotal = 1;
        tableHeader: Array<any> = [
            {
                prop: "createTime",
                label: "时间",
                width: "",
            },
            {
                prop: "operator",
                label: "操作人",
                width: "200px",
            },
            {
                prop: "operationDesc",
                label: "操作",
                width: "",
            },
            {
                prop: "entityName",
                label: "操作对象",
                width: "",
            },
            {
                prop: "sealNames",
                label: "使用印章",
                width: "",
            },
            {
                prop: "detailedOperation",
                label: "详细操作数据",
                width: "400px",
            },
        ]
        public handleSizeChange(val: number): void {
            this.pageSize = val;
            this.getListData();
        }

        public handleCurrentChange(val: number) {
            this.pageNo = val;
            this.getListData();
        }

        // 重置按钮点击事件
        public reset(): void {
            this.picker = this.valuePicker = "";
            this.operator = this.valueOperator = "";
            this.operation = this.valueOperation = "";
            this.keyword = this.valueKeyword = "";
        }
        // 搜索按钮点击事件
        public search() {
            this.picker = this.valuePicker;
            this.operator = this.valueOperator;
            this.operation = this.valueOperation;
            this.keyword = this.valueKeyword;
        }
        // 获取table数据
        public getListData(): void {
            Vue.prototype.axios
                .get("/system/audit/list", {
                    params: this.reqParams,
                })
                .then((res: any) => {
                    //   console.log(res.data.result.result);
                    this.tableData = res.data.result.result;
                    this.pageTotal = res.data.result.totalCount;
                });
        }
        // 获取操作人和操作信息
        public getOperation(): void {
            Vue.prototype.axios
                .get("/system/audit/operation", {
                    params: this.reqParams,
                })
                .then((res: any) => {
                    const { operators, operations } = res.data.result;
                    this.operatorOptions = operators;
                    this.operationOptions = operations;
                });
        }
        get reqParams(): any {
            let createTimeFrom!: string
            let createTimeTo!: string
            if (this.picker) {
                createTimeFrom = this.picker[0];
                createTimeTo = this.picker[1];
            } else {
                createTimeFrom = "";
                createTimeTo = "";
            }
            return {
                createTimeFrom,
                createTimeTo,
                operator: this.operator,
                operation: this.operation,
                keyword: this.keyword,
                auditType: this.auditType,
                companyId: this.companyId,
                pageNo: this.pageNo,
                pageSize: this.pageSize,
            };
        }
        // 组件创建后初始化数据
        public created(): void {
            Vue.prototype.axios.get("/user").then((res: any) => {
                this.companyId = res.data.result.companies[0].id;
            });
            this.getListData();
            this.getOperation();
        }
        // 监听reqParams变化，然后执行reqParamsChanged
        @Watch('reqParams')
        reqParamsChanged(): void {
            this.getListData(); // 监听计算属性,当计算属性中的参数变化时重新获取数据
            this.getOperation();
        }

    }
</script>
<style scoped>
    .common-main-wrap {
        overflow-x: hidden;
    }

    .table-list {
        margin: 0px 30px 0 30px;
        text-align: left;
    }

    .pagination {
        padding: 20px 24px;
        display: flex;
        justify-content: flex-end;
    }

    #search-module {
        width: 100%;
        /* height: 113px; */
        padding: 30px 0 30px 30px;
        border-bottom: 1px solid rgb(228, 231, 237);
    }

    .filter {
        display: flex;
        justify-content: start;
        flex-direction: row;
        flex-wrap: wrap;
        padding-right: 200px;
    }

    .time-picker,
    .operator,
    .operation,
    .match,
    .btn {
        margin: 5px;
    }
    .inline-input {
        display: inline;
    }

    .demo-table-expand {
        font-size: 0;
    }

    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }

    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }
</style>