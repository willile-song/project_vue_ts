<template>
    <div id="main-container" :style=styleParam>
        <slot></slot>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator'

    @Component
    export default class MainContainer extends Vue {
        @Prop({ default: '#fff' }) bkgroundParam!: string
        @Prop({ default: '12px 15px' }) paddingParam!: string
        get styleParam(): string {
            return `padding:${this.paddingParam};background-color:${this.bkgroundParam};`
        }
    }

</script>

<style scoped>
    #main-container {
        min-height: 100%;
        padding: 12px 15px;
    }
</style>