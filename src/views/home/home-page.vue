<template>
    <div class="home">
        <div class="main-content" :class="isFold ? 'fold':''">
            <!-- 事务列表 -->
            <main-content-list></main-content-list>
            <div class="fold-divider" :class="isFold ? 'fold':''">
                <i @click="handleClickIcon">
                    <span class="triangle"></span>
                </i>
            </div>
        </div>

        <div class="right-content" :class="isFold ? 'fold':''">
            <main-content-sidebar></main-content-sidebar>
        </div>
    </div>
</template>

<script>
import MainContentList from '../home/components/main-content-list.vue'
import MainContentSidebar from '../home/components/main-content-sidebar.vue'

export default {
    data() {
        return {
            isFold: false,   // 控制右侧菜单是否折叠，默认展开
        };
    },
    components: {
        MainContentList,
        MainContentSidebar,
    },
    methods: {
        handleClickIcon() {
            this.isFold = !this.isFold;
        },
    }
};
</script>

<style lang="less" scoped>
.home {
    width: 100%;
    display: flex;
    scroll-behavior: auto;
    padding: 25px 0;
    background-color: rgba(221, 214, 214, 0.2);;
    @mainWidth: 300px;

    .main-content {
        position: relative;
        width: calc(100% - @mainWidth);
        box-sizing: border-box;
        transition: 0.3s;
        background: #fff;
        display: flex;
        padding-right: 25px;

        
        &.fold {
            width: 100%;
        }

        .fold-divider {
            position: absolute;
            right: 0;
            width: 12px;
            height: 100%;
            background: #f7f8f8;

            &.fold {
                background: #fff;

                &:hover {
                    border: none;
                    border-right: 2px solid rgb(36, 137, 242);
                }
                i {
                    background-color: #ddd;
                    transform: rotate(180deg);

                    span {
                        border-color: transparent transparent transparent #fff;
                    }
                }
            }

            &:hover {
                border-left: 2px solid rgb(36, 137, 242);
                box-sizing: border-box;
            }

            i {
                position: absolute;
                top: 600px;
                display: inline-block;
                width: 12px;
                height: 60px;
                background-color: #fff;
                border-top-right-radius: 15px;
                border-bottom-right-radius: 15px;
                line-height: 60px;

                &:hover {
                    background: #2489f2;
                }

                span {
                    display: inline-block;
                    margin-left: 2px;
                    width: 0px;
                    height: 0px;
                    border: 6px solid;
                    border-color: transparent transparent transparent #ddd;
                }
            }
        }
    }

    .right-content {
        width: 300px;
        height: 100%;
        padding:0 16px;
        transition: 0.3s;

        &.fold {
            width: 0;
            padding: 0;
        }
    }
}
</style>