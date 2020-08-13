<template>
    <div id="sign-file">
        <div>
            <el-table class="table-list" :data="tableData" style="width: 100%">
                <!-- <el-table-column prop="date" label="日期" width="180"></el-table-column>
                <el-table-column prop="name" label="姓名" width="180"></el-table-column> -->
                <el-table-column
                    v-for="(item, index) in tableHeader"
                    :key="index"
                    :width="item.width"
                    :prop="item.prop"
                    :label="item.label"
                ></el-table-column>
            </el-table>
        </div>
        <!-- <div class="pagination">
            <el-pagination
                class="pagination"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage4"
                :page-sizes="[5, 10, 15, 20]"
                :page-size="5"
                layout="total, sizes, prev, pager, next, jumper"
            ></el-pagination>
        </div> -->
    </div>
</template>

  <script>
import axios from 'axios'

export default {
    props:['address'],
    data() {
        return {
            listData:'',
            tableHeader: [
                {
                    prop: "createTime",
                    label: "时间",
                    width: '',
                },
                {
                    prop: "operator",
                    label: "操作人",
                    width: '200px',
                },
                {
                    prop: "operationDesc",
                    label: "操作",
                    width: '',
                },
                {
                    prop: "entityName",
                    label: "操作对象",
                    width: '',
                },
                {
                    prop: "sealNames",
                    label: "使用印章",
                    width: '',
                },
                {
                    prop: "detailedOperation", 
                    label: "详细操作数据",
                    width: '400px',
                }
            ],
            tableData: [],
            // currentPage4:"", 
            paramsObj: {

            }   
        };
    },
    methods: {
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        },
        // handledbClick(row) {
        //     console.log(row.id)
        // }
    },
    async created(){
        const res = await axios('/system/audit/list?cb=1597311580379&keyword=&auditType=CONTRACT&operator=&createTimeFrom=&createTimeTo=&operation=&pageNo=1&pageSize=10&companyId=2703493711465512985')
        console.log(res)
        this.tableData = res.data.result.result
        // .then(res=> {
        //     this.tableData = res.data.result.result
        // })
    }
};

</script>
<style scoped>
.table-list {
    margin: 0px 30px 0 30px;
}
.pagination {
    padding: 10px 24px;
    display: flex;
    justify-content: flex-end;
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