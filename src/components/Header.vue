<template>
    <div class="header">
        <div class="logo">
            <h1 class="logo__text">
                BuySomeKettles.com
            </h1>
        </div>
        <div class="user">
            {{ 'Login' }}
        </div>
        <div>
            <router-link class="logout" to='/'>Log out →</router-link>
        </div>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>
    .header {
        width: 90vw;
        height: 5vw;
        background-color: #42b983;
        padding: 0 5vw;
        margin-bottom: 5vw;
        display: grid;
        grid-template-columns: auto 1fr auto;
        align-content: center;
        .logo {
            .logo__text {
                font-size: 2vw;
                font-weight: 900;
            }
        }
        .user {
            justify-self: center;
            cursor: default;
        }
        .logout {
            color: #2c3e50;
        }
        .logout:hover {
            border-bottom: 1px solid #2c3e50;
        }
    }
</style>