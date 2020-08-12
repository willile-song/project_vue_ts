<template>
    <div>
        <span>搜索：</span>
        <el-autocomplete
            v-model="state"
            :fetch-suggestions="querySearchAsync"
            placeholder="请输入内容"
            @select="handleSelect"
        ></el-autocomplete>
    </div>
</template>

<script>
export default {
    data() {
        return {
            restaurants: [],
            state: "",
            timeout: null
        };
    },
    methods: {
        loadAll() {
            return [
                { value: "三全鲜食（北新泾店）", address: "长宁区新渔路144号" },
                {
                    value: "Hot honey 首尔炸鸡（仙霞路）",
                    address: "上海市长宁区淞虹路661号"
                }
            ];
        },
        querySearchAsync(queryString, cb) {
            const restaurants = this.restaurants;
            const results = queryString
                ? restaurants.filter(this.createStateFilter(queryString))
                : restaurants;

            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
                cb(results);
            }, 3000 * Math.random());
        },
        createStateFilter(queryString) {
            return state => {
                return (
                    state.value
                        .toLowerCase()
                        .indexOf(queryString.toLowerCase()) === 0
                );
            };
        },
        handleSelect(item) {
            console.log(item);
        }
    },
    mounted() {
        this.restaurants = this.loadAll();
    }
};
</script>