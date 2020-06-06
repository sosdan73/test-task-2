<template>
    <div class="card" :style="{ width: width }">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        props: ['width']
    }
</script>

<style lang="scss" scoped>
    .card {
        display: grid;
        justify-content: center;
        margin: auto;
        border: 1px solid #2c3e50;
        box-shadow: 5px 5px 12px #999;
        padding: 2vw;
    }
</style>