<template>
    <div id="audit">
        <el-tabs tab-position="left" style="height: 100%; width=159px;">
            <el-tab-pane v-for="(item, index) in list" :key="index" :label="item.title ">
                <!-- <search-module :title="item" /> -->
                <div id="search-module">
                    <h4>{{item.title}}</h4>
                    <div class="filter">
                        <div class="time-picter">
                            <span class="demonstration">时间：</span>
                            <el-date-picker
                                v-model="valuePicter"
                                type="datetimerange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                            ></el-date-picker>
                        </div>
                        <!-- `````````````````````````````````````````````````````` -->
                        <div class="opertion">
                            <span>操作人：</span>
                            <el-select
                                class="el-select"
                                style="width:83px;"
                                v-model="valueOperation"
                                filterable
                                placeholder="请选择"
                            >
                                <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                ></el-option>
                            </el-select>
                        </div>
                        <!-- ```````````````````````````````````````````````````````````` -->
                        <div class="opertion">
                            <span>操作：</span>
                            <el-select
                                class="el-select"
                                style="width:83px;"
                                v-model="valueOperation"
                                filterable
                                placeholder="请选择"
                            >
                                <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                ></el-option>
                            </el-select>
                        </div>

                        <div class="match">
                            <span>搜索：</span>
                            <el-autocomplete
                                v-model="valueMatch"
                                :fetch-suggestions="querySearchAsync"
                                placeholder="请输入内容"
                                @select="handleSelect"
                            ></el-autocomplete>
                        </div>
                        <el-row>
                            <el-button type="primary">搜索</el-button>
                            <el-button plain>重置</el-button>
                        </el-row>
                    </div>
                </div>

                <common-main-wrap />
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
import CommonMainWrap from "../views/common-main-wrap";
// import SearchModule from "../components/search-module";
class SearchObj {
    startTime = ''
    endStart = ''
    operation = ''
    operator = ''
    valueMatch = ''
}
export default {
    data() {
        return {
            // list: [
            //     "电子签约文件",
            //     "业务流配置",
            //     "印章管理",
            //     "权限管理",
            //     "模板库管理",
            //     "组织与成员",
            //     "账号登录"
            // ],
            list: [
                {
                    title: "电子签约文件",
                    auditType: 'CONTRACT', 
                },
                {
                    title: "业务流配置",
                    auditType: 'CATEGORY', 
                },
                {
                    title: "印章管理",
                    auditType: 'SEAL', 
                },
                {
                    title: "权限管理",
                    auditType: 'ROLE', 
                },
                {
                    title: "模板库管理",
                    auditType: 'TEMPLATE', 
                },
                {
                    title: "组织与成员",
                    auditType: 'EMPLOYEE', 
                },
                {
                    title: "账号登录",
                    auditType: 'ACCOUNT', 
                },
            ],
            pickerOptions: {
                shortcuts: [
                    {
                        text: "最近一周",
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(
                                start.getTime() - 3600 * 1000 * 24 * 7
                            );
                            picker.$emit("pick", [start, end]);
                        }
                    },
                    {
                        text: "最近一个月",
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(
                                start.getTime() - 3600 * 1000 * 24 * 30
                            );
                            picker.$emit("pick", [start, end]);
                        }
                    },
                    {
                        text: "最近三个月",
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(
                                start.getTime() - 3600 * 1000 * 24 * 90
                            );
                            picker.$emit("pick", [start, end]);
                        }
                    }
                ]
            },
            options: [
                {
                    value: "选项1",
                    label: "黄金糕"
                }
            ],
            serarchData: new SearchObj()
        };
    },
    components: {
        // SearchModule,
        CommonMainWrap
    }
    // mounted() {
    //     console.log(this.$route.meta);
    // }
};
</script>


<style scoped>
#audit {
    height: 100%;
    -webkit-user-select: none;
}
#search-module {
    width: 100%;
    height: 113px;
    padding: 30px 0 30px 30px;
    border-bottom: 1px solid rgb(228, 231, 237);
}
.filter {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    padding-right: 200px;
}
</style>