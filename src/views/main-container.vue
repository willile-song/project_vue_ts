<template>
    <div id="main-container" :style=styleParam>
        <slot></slot>
    </div>
</template>

<script>
export default {
    props: ['bkgroundParam','paddingParam'],
    computed: {
        styleParam() {
            return `padding:${this.paddingParam};background-color:${this.bkgroundParam};`
        }
    }
}
</script>

<style scoped>
#main-container {
    height: 100%;
    padding: 12px 15px;
}
</style>