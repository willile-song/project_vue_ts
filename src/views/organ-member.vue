<template>
    <el-container class="container">
        <el-aside class="el-aside" width="275px">
            <el-input class="el-input-organ-member" placeholder="输入关键字进行过滤" v-model="filterText"></el-input>
            <el-tree
                class="filter-tree"
                :data="data"
                :props="defaultProps"
                default-expand-all
                :filter-node-method="filterNode"
                ref="tree"
            ></el-tree>
        </el-aside>
        <el-main>Main</el-main>
    </el-container>
</template>
<script>
export default {
    watch: {
        filterText(val) {
            this.$refs.tree.filter(val);
        }
    },

    methods: {
        filterNode(value, data) {
            if (!value) return true;
            return data.label.indexOf(value) !== -1;
        }
    },

    data() {
        return {
            filterText: "",
            data: [
                {
                    id: 1,
                    label: "一级 1",
                    children: [
                        {
                            id: 4,
                            label: "二级 1-1",
                            children: [
                                {
                                    id: 9,
                                    label: "三级 1-1-1"
                                },
                                {
                                    id: 10,
                                    label: "三级 1-1-2"
                                }
                            ]
                        }
                    ]
                },
                
            ],
            defaultProps: {
                children: "children",
                label: "label"
            }
        };
    }
};
</script>

<style scoped>
.container {
    height: 100%;
    background-color: #fff;
}
.el-aside {
    height: 100%;
    border-right: 1px solid #e8e8e8;
    padding: 20px 0px 20px 20px;
    margin-bottom: 20px;
}
</style>