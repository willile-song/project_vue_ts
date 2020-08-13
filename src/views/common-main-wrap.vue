<template>
  <div id="common-main-wrap">
    <div id="search-module">
      <h4>{{title}}</h4>
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
        <div class="operator">
          <span>操作人：</span>
          <el-select
            class="el-select"
            style="width:83px;"
            v-model="operator"
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
        <div class="opertion">
          <span>操作：</span>
          <el-select class="el-select" style="width:83px;" v-model="operation" placeholder="请选择">
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
          <!-- <el-autocomplete
                                v-model="valueMatch"
                                placeholder="请输入内容"
          ></el-autocomplete>-->
          <el-autocomplete class="inline-input" v-model="keyword" placeholder="请输入内容"></el-autocomplete>
        </div>
        <el-row>
          <el-button type="primary">搜索</el-button>
          <el-button plain>重置</el-button>
        </el-row>
      </div>
    </div>

    <!-- // 表格部分 -->
    <div>
      <el-table class="table-list" :data="tableData" style="width: 100%">
        <!-- <el-table-column prop="date" label="日期" width="180"></el-table-column>
        <el-table-column prop="name" label="姓名" width="180"></el-table-column>-->
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
    </div>-->
  </div>
</template>

  <script>
import axios from "axios";

export default {
  props: ["title",'auditType'],
  data() {
    return {
      listData: "",
      tableHeader: [
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
      ],
      tableData: [],
      // currentPage4:"",
      valuePicter: "",
      operator: "",
      operation: "",
      keyword: "",
      options:[],
    };
  },
  mounted(){
      axios.get('/user').then(({data})=>{
          console.log(data)
      })
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
    getListData() {
        // ?cb=1597311580379&keyword=&auditType=CONTRACT&operator=&createTimeFrom=&createTimeTo=&operation=&pageNo=1&pageSize=10&companyId=2703493711465512985
      axios
        .get("/system/audit/list",{
            params:this.reqParams
        })
        .then((res) => {
          console.log(res.data.result.result);
          this.tableData = res.data.result.result
        });
    },
  },
  computed: {
      reqParams() {
          let createTimeFrom, createTimeTo
          if(this.valuePicter) {
              createTimeFrom = this.valuePicter[0]
              createTimeTo = this.valuePicter[1]
          }else {
              createTimeFrom = ''
              createTimeTo = ''
          }
          console.log(this.auditType)
          return {
             createTimeFrom,
             createTimeTo,
             operator:this.operator,
             operation:this.operation, 
             keyword:this.keyword, 
             auditType:this.auditType,
             companyId:'2703493711465512985',
          }
      }
  },

  watch: {
      reqParams() {
          this.getListData()
      }
  },
  created() {
    this.getListData();
  },
  // async created(){
  //     const res = await axios('/system/audit/list?cb=1597311580379&keyword=&auditType=CONTRACT&operator=&createTimeFrom=&createTimeTo=&operation=&pageNo=1&pageSize=10&companyId=2703493711465512985')
  //     console.log(res)
  //     this.tableData = res.data.result.result
  // }
};
</script>
<style scoped>
.table-list {
  margin: 0px 30px 0 30px;
  text-align: left;
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