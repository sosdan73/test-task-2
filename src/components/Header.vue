<template>
    <div class="header">
        <div class="logo">
            <h1 class="logo__text">
                BuySomeKettles.com
            </h1>
        </div>
        <div class="user" v-if="login">
            {{ login }}
        </div>
        <div>
            <a class="logout" @click="logOut" v-if="login">Log out →</a>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                
            }
        },
        methods: {
            logOut() {
                this.$store.state.user = {};
                this.$router.push('/')
            }
        },
        computed: {
            login() {
                return this.$store.state.user ? this.$store.state.user.login : false
            }
        },
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
            cursor: pointer;
        }
    }
</style>