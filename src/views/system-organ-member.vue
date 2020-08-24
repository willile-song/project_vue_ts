<template>
    <el-container class="container">
        <el-aside class="el-aside" width="275px">
            <el-input class="el-input-organ-member" placeholder="输入关键字进行过滤" v-model="filterText"></el-input>
            <el-tree
                class="filter-tree"
                :data="data"
                :load="loadNode"
                lazy    
                :props="defaultProps"
                node-key="id"
                :expand-on-click-node="false"
                default-expand-all
                :filter-node-method="filterNode"
                ref="tree"
                :render-content="renderContent"
            ></el-tree>
        </el-aside>
        <el-main>Main</el-main>
    </el-container>
</template>
<script>
let id = 1000;

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
        },
        renderContent(h, { node, data, store }) {
            return (
                <span class="custom-tree-node">
                    <span>{node.label}</span>

                    <el-dropdown placement="bottom">
                        <span class="el-dropdown-link">
                            <i class="el-icon-arrow-down el-icon-more"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>
                                <el-button
                                    size="mini"
                                    type="text"
                                    on-click={() => this.append(data)}
                                >
                                    添加
                                </el-button>
                            </el-dropdown-item>
                            <el-dropdown-item>
                                <el-button
                                    size="mini"
                                    type="text"
                                    on-click={() => this.remove(node, data)}
                                >
                                    删除
                                </el-button>
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </span>
            );
        },
        append(data) {
            const newChild = { id: id++, label: "test", children: [] };
            if (!data.children) {
                this.$set(data, "children", []);
            }
            data.children.push(newChild);
        },
        remove(node, data) {
            const parent = node.parent;
            const children = parent.data.children || parent.data;
            const index = children.findIndex(d => d.id === data.id);
            children.splice(index, 1);
        },
    
        loadNode(node, resolve) {
            if (node.level === 0) {
                return resolve([{ label: "维森集团" }]);
            }
            if (node.level > 1) return resolve([]);

            setTimeout(() => {
                const data = [
                    {
                        label: "leaf",
                        leaf: true
                    },
                    {
                        label: "zone"
                    },
                    {
                        label: "none"
                    }
                ];

                resolve(data);
            }, 500);
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
                }
            ],
            defaultProps: {
                children: "children",
                label: "label",
                isLeaf: "leaf"
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

    .container >>> el-aside {
    height: 100%;
    border-right: 1px solid #e8e8e8;
    padding: 20px 0px 20px 20px;
    margin-bottom: 20px;
    border-right: 1px solid #ccc;
}
</style>