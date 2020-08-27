<template>
    <div class="main-content-sidebar">

        <!-- 用户部分 -->
        <div class="user">
            <div class="portrait">
                <img src="@/assets/logo.png" alt />
            </div>
            <div class="content">
                <div>
                    <span class="name">{{name}}</span>
                    <i class="el-icon-s-custom"></i>
                </div>
                <div>
                    <span class="account-label">用户账号：</span>
                    <span class="account">{{mobile}}</span>
                </div>
            </div>
        </div>

        <!-- 统计图 -->
        <div class="seal-stats">
            <div class="stats-title">
                <div class="text">用印统计</div>
                <div class="seal-options">
                    <div class="electronic-label">电子用印</div>
                    <div class="physical-label">物理用印</div>
                </div>
            </div>
            <div class="echarts-wrap">
                <echarts-component :echarts="echarts"></echarts-component>
            </div>
        </div>

        <!-- 操作 -->
        <div class="operation">
            <div>
                <div class="operation-title">
                    <span>常用操作</span>
                </div>
            </div>
            <div>
                <div class="operation-item employee">
                    <div class="head">
                        <span>组织与成员</span>
                        <i class="el-icon-delete"></i>
                    </div>
                    <div class="content">
                        <span class="tip">成员人数：</span>
                        <span class="count">{{count}}</span>
                    </div>
                </div>
            </div>
            <div>
                <div class="operation-item seal-management">
                    <div class="head">
                        <span>印章管理</span>
                        <i class="el-icon-delete"></i>
                    </div>
                    <div class="content">
                        <ul>
                            <li>
                                <div>更多</div>
                            </li>
                            <li>
                                <div>
                                    <img src="@/assets/imgs/seal.png" alt />
                                </div>
                            </li>
                            <li>
                                <div>更多</div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div>
                <div class="operation-item power">
                    <div class="head">
                        <span>权限设置</span>
                        <i class="el-icon-delete"></i>
                    </div>
                    <div class="content">
                        <div class="grey">给同事分配系统权限，可提高使用效率</div>
                    </div>
                </div>
            </div>

            <div>
                <div class="operation-item authority">
                    <div class="head">
                        <span>文件模板</span>
                        <i class="el-icon-delete"></i>
                    </div>
                    <div class="content">
                        <ul>
                            <li>
                                <div class="option">
                                    <span>07--Service222.docx</span>
                                </div>
                            </li>
                            <li>
                                <div class="option">
                                    <span>07--同名参数</span>
                                </div>
                            </li>
                            <li>
                                <div class="more">
                                    <span>更多模板 ></span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div>
                <div class="operation-item signature">
                    <div class="head">
                        <span>个人签名</span>
                        <i class="el-icon-delete"></i>
                    </div>
                    <div class="content">
                        <div class="sign-content">{{name}}</div>
                        <div class="more">更多 ></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import EchartsComponent from '@/components/echarts-component.vue';


export default {
    data() {
        return {
            name: '',
            mobile: '',
            echarts: {
                dateArray:{},
                allArray: [],
            },    // 传入echarts的数据
            count: 0, // 组织人数
        };
    },

    components: {
        EchartsComponent
    },

    methods: {
        //  获取echarts图表数据
        getEchartsData() {
            this.axios
                .get('/data/query/chart/category', {
                    params: {
                        createTimeFrom: '2019-08-01',
                        createTimeTo: '2020-08-01'
                    }
                })
                .then(resp => {
                    // console.log(resp.data.result);
                    const result = resp.data.result;             // echarts数组对象
                    this.echarts.options = Object.keys(result);   // 获取数据项

                    // 处理数据
                    for(let i = 0; i < this.echarts.options?.length; i++) {

                        this.echarts[this.echarts.options[i]] = {
                            date: [],
                            all: []
                        }

                        result[this.echarts.options[i]].map(item => {
                            // console.log(item,this.echarts.options[i])    
                             this.echarts[this.echarts.options[i]].date.push(item.date);
                             this.echarts[this.echarts.options[i]].all.push(item.all)
                        })
                    }
                    console.log(this.echarts)
                });
        },
        getEmployeeCount() {
            this.axios.get('/employee/count', {
                params: {
                    orgId: 2679274771077300246
                }
            })
            .then(res => {
                this.count = res.data.result;
            })
        }
    },

    mounted() {
        this.getEchartsData();
        this.getEmployeeCount();
        // 获取全局user数据
        const { name, mobile } = this.$store.state.userData;
        this.name = name;

        // 截取中间四位
        const middleNumber = mobile.slice(3, 7);
        this.mobile = mobile.replace(middleNumber, ' **** ');
    }
};
</script>

<style lang="less" scoped>
.main-content-sidebar {
    // border标记，辅助边框
    @mark: 1px solid #ccc;

    .user,
    .operation,
    .seal-stats {
        background-color: #fff;
        box-sizing: border-box;
    }
    ul {
        padding: 0;
    }
    // user信息模块
    .user {
        width: 300px;
        height: 88px;
        padding: 24px 16px;
        margin-bottom: 16px;
        border-radius: 4px;
        display: flex;

        .portrait {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            overflow: hidden;
            margin-right: 10px;
            border: @mark;

            img {
                width: 40px;
                height: 40px;
            }
        }

        .content {
            width: 212px;
            height: 40px;

            .name {
                font-size: 14px;
                color: #001330;
                margin-right: 4px;
            }

            .account-label,
            .account {
                font-size: 12px;
            }
            .account-label {
                margin-right: 4px;
                color: #7f8997;
            }
        }
    }
    // 统计echarts
    .seal-stats {
        width: 300px;
        height: 266px;
        padding: 16px;
        margin-bottom: 16px;

        .stats-title {
            height: 42px;
            margin-bottom: 12px;
            display: flex;
            justify-content: space-between;
            align-items: center;

            .text {
                color: rgb(0, 19, 48);
                font-size: 14px;
            }

            .seal-options {
                color: #7f8997;
                margin-bottom: 4px;
                font-size: 12px;

                div {
                    margin-bottom: 4px;
                    position: relative;

                    &.electronic-label::before {
                        background-color: #2489f3;
                    }

                    &.physical-label::before {
                        background-color: #2bb353;
                    }

                    &::before {
                        content: '';
                        position: absolute;
                        display: inline-block;
                        width: 4px;
                        height: 4px;
                        border-radius: 50%;
                        left: -12px;
                        top: calc(50% - 2px);
                    }
                }
            }
        }

        .echarts-wrap {
            height: calc(100% - 54px);
            margin-bottom: 20px;
        }
    }
    // 操作
    .operation {
        width: 300px;
        height: 781px;
        padding: 24px 16px;
        margin-bottom: 15px;

        .operation-title {
            operation-title {
                span {
                    font-size: 14px;
                    color: #001330;
                }
            }
        }
        // operation公共样式
        .operation-item {
            margin: 12px 0px;
            padding: 16px;
            border: 1px solid #e5e7ea;
            border-radius: 4px;
            cursor: pointer;
            box-sizing: border-box;
            width: 268px;

            &:hover {
                border-color: #f50000;
            }

            .head {
                height: 25px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 16px;
                color: #4c596e;

                i {
                    display: none;

                    &:hover {
                        color: red;
                    }
                }
            }

            &:hover .head i {
                display: inline-block;
            }
        }
        // 组织和成员
        .employee {
            height: 110px;

            .content {
                height: 35px;

                .tip {
                    font-size: 12px;
                    font-weight: 400;
                }
                .count {
                    font-size: 18px;
                    margin-left: 8px;
                    color: #4c596e;
                    font-family: ALIBABA FONT;
                }
            }
        }
        // 印章管理
        .seal-management {
            height: 140px;

            .content {
                ul {
                    display: flex;
                    justify-content: space-between;
                    list-style: none;

                    li {
                        div {
                            width: 60px;
                            height: 60px;
                            border-radius: 50%;
                            line-height: 60px;
                            border: 1px solid #e5e7ea;
                            text-align: center;
                            color: #7f8997;
                            font-size: 12px;

                            img {
                                width: 60px;
                                height: 60px;
                            }
                        }
                    }
                }
            }
        }
        // 权限管理
        .power {
            height: 92px;

            .content {
                .grey {
                    font-size: 12px;
                    font-weight: 400;
                    color: #7f8997;
                }
            }
        }
        // 文件模板
        .authority {
            height: 159px;

            .content {
                ul {
                    list-style: none;
                    font-size: 12px;

                    li {
                        div {
                            height: 22px;
                            line-height: 22px;
                            margin-bottom: 10px;

                            &.option {
                                color: #7f8997;
                            }

                            &.more {
                                color: #4c596e;
                            }
                        }
                    }
                }
            }
        }
        .signature {
            height: 140px;

            .content {
                display: flex;
                justify-content: space-between;

                div {
                    width: 104px;
                    height: 60px;
                    box-sizing: border-box;
                    color: #7f8997;
                    text-align: center;
                    line-height: 60px;
                    border: 1px solid #e5e7ea;
                    font-size: 14px;
                }

                .sign-content {
                    font-family:cursive;
                    font-size: 30px;
                }
            }
        }
    }
}
</style>