<template>
    <div id="main-container">
        <slot></slot>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class MainContainer extends Vue {
    @Prop({ default: '#fff' }) bkgroundParam!: string;
    @Prop({ default: '12px 15px' }) paddingParam!: string;
    get styleParam(): string {
        return `padding:${this.paddingParam};background-color:${this.bkgroundParam};`;
    }
}
</script>

<style lang="less" scoped>
#main-container {
    height: 100%;
    background-color: #fff;
    overflow: scroll;

    &::-webkit-scrollbar {
        width: 8px;
        height: 8px;
    }

    &::-webkit-scrollbar-thumb {
        border-radius: 5px;
        box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        background: rgba(0, 0, 0, 0.2);
    }

    #audit {
        background-color: rgb(247, 248, 248) !important;
    }
}
</style>