<template>
    <el-container class="container">
        <el-aside class="el-aside" width="275px">
            <el-input class="el-input-organ-member" placeholder="输入关键字进行过滤" v-model="filterText"></el-input>

            <el-tree
                class="filter-tree"
                :data="data"
                :props="defaultProps"
                node-key="id"
                :expand-on-click-node="false"
                default-expand-all
                :filter-node-method="filterNode"
                ref="tree"
                :render-content="renderContent"
            ></el-tree>
        </el-aside>

        <el-main>
            <el-drawer
                title="添加组织成员"
                :before-close="handleClose"
                :visible.sync="dialog"
                custom-class="demo-drawer"
                ref="drawer"
            >
                <div class="demo-drawer__content">
                    <div class="form">
                        <el-form :model="form" :rules="rules" ref="ruleForm">
                            <el-form-item label="组织名称" :label-width="formLabelWidth" prop="name">
                                <el-input v-model="form.name" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-form>
                    </div>

                    <div class="demo-drawer__footer">
                        <el-button @click="cancelForm">取 消</el-button>
                        <el-button
                            type="primary"
                            @click="$refs.drawer.closeDrawer();submitForm('ruleForm')"
                        >确定</el-button>
                    </div>
                </div>
            </el-drawer>
        </el-main>
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
                        <el-dropdown-menu slot="dropdown" class="org">
                            <el-dropdown-item>
                                <span
                                    class="btn org"
                                    on-click={() => this.append(data)}
                                >
                                    添加
                                </span>
                            </el-dropdown-item>
                            <el-dropdown-item>
                                <span
                                    class="btn org"
                                    on-click={() => this.remove(node, data)}
                                >
                                    删除
                                </span>
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </span>
            );
        },

        append(data) {
            this.dialog = true;
            this.currentData = data;
        },

        remove(node, data) {
            const parent = node.parent;
            const children = parent.data.children || parent.data;
            const index = children.findIndex(d => d.id === data.id);
            children.splice(index, 1);
        },
        handleClose(done) {
            this.done = done;
        },
        cancelForm() {
            this.dialog = false;
        },
        submitForm(formName) {
            console.log(formName);
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.done();
                    this.newChild = {
                        id: id++,
                        label: this.form.name,
                        children: []
                    };
                    if (!this.currentData.children) {
                        this.$set(this.currentData, 'children', []);
                    }
                    this.currentData.children.push(this.newChild);
                    this.form.name = '';
                } else {
                    return false;
                }
            });
        }
    },

    data() {
        return {
            done:null,
            ruleForm: {
                name: ''
            },
            filterText: '',
            data: [
                {
                    id: 1,
                    label: '一级 1',
                    children: [
                        {
                            id: 4,
                            label: '二级 1-1',
                            children: [
                                {
                                    id: 9,
                                    label: '三级 1-1-1'
                                },
                                {
                                    id: 10,
                                    label: '三级 1-1-2'
                                }
                            ]
                        }
                    ]
                }
            ],
            defaultProps: {
                children: 'children',
                label: 'label',
                isLeaf: 'leaf'
            },
            form: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            },
            table: false,
            dialog: false,
            formLabelWidth: '80px',
            newChild: null,
            currentData: null,
            rules: {
                name: [
                    {
                        required: true,
                        message: '请输入组织名称',
                        trigger: 'blur'
                    }
                ]
            }
        };
    }
};
</script>

<style lang="less" scoped>
.container {
    height: 100%;

    /deep/ .el-aside {
        height: 100%;
        border-right: 1px solid #e8e8e8;
        padding: 20px 0px 20px 40px;
        margin-bottom: 20px;
        border-right: 1px solid #ccc;

        .el-tree-node__content {
            .custom-tree-node {
                .el-dropdown {
                    margin-left: 10px;
                    display: none;
                }
            }

            &:hover .custom-tree-node .el-dropdown {
                display: inline-block;
            }
        }

        /deep/ .el-input-organ-member > input {
            width: 190px;
            height: 32px;
            padding: 0px 15px 0px 30px;
            border-radius: 16px;
        }
    }
    /deep/ .demo-drawer__content {
        .demo-drawer__footer {
            margin-top: 50px;
            display: flex;
            justify-content: space-around;
        }
    }
}
</style>