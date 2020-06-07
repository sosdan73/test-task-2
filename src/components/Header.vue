<template>
    <div class="header">
        <div class="logo">
            <h1 class="logo__text">
                BuySomeKettles.com
            </h1>
        </div>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>
    .header {
        width: 100vw;
        height: 5vw;
        background-color: #42b983;
        padding: 0 5vw;
        margin-bottom: 5vw;
        display: grid;
        grid-template-columns: auto 1fr;
        .logo {
            align-self: center;
            .logo__text {
                font-size: 2vw;
                font-weight: 900;
            }
        }
    }
</style>