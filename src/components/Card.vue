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
        border: 2px solid #42b983;
        box-shadow: 2px 2px 12px #42b983;
        padding: 2vw;
        min-height: 10vw;
        margin-bottom: 3.5vw;
    }
</style>