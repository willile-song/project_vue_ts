<template>
    <div id="search-module">
        <h4>{{title}}</h4>
        <div class="filter">
            <date-range />
            <search-module-operator name="操作人" />
            <search-module-operator name="操作" />
            <search-module-search />
            <el-row>
                <el-button type="primary">搜索</el-button>
                <el-button plain>重置</el-button>   
            </el-row>
        </div>
    </div>
</template> 


<script>
import DateRange from "../components/search-module-date-range";
import SearchModuleOperator from "../components/search-module-operator";
import SearchModuleSearch from "../components/search-module-search";
export default {
    props: ["title"],
    components: {
        DateRange,
        SearchModuleOperator,
        SearchModuleSearch
    }
};
</script>

<style scoped>
#search-module {
    width: 100%;
    height: 113px;
    padding: 30px 0 30px 30px;
}
.filter {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
}
</style>