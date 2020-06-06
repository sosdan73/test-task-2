<template>
    <div>
        <card width="30vw">
            <div class="header margin">
                <span
                    class="tab"
                    :class="{bold: isLoginCheck}"
                    @click="tabClick">
                        Log in
                </span>
                    / 
                <span
                    class="tab"
                    :class="{bold: !isLoginCheck}"
                    @click="tabClick">
                        Sign up
                </span>
            </div>
            <div class="login" v-if="isLoginCheck">
                <form class="form form__login" action="#" method="post">
                    <input placeholder="Login" v-model="user.login" class="input margin" type="text">
                    <input placeholder="Password" v-model="user.password" class="input margin" type="password">
                    <div v-if="user.login == '' || user.password == ''" class="disabled">Log In</div>
                    <input v-else type="submit" value="Log In" class="btn">
                </form>
            </div>
            <div class="signup" v-else>
                <form class="form form__signup" action="#" method="post">
                    <input placeholder="Login" v-model="user.login" class="input margin" type="text">
                    <input placeholder="Password" v-model="user.password" class="input margin" type="password">
                    <div v-if="user.login == '' || user.password == ''" class="disabled">Sign Up</div>
                    <input v-else type="submit" value="Sign Up" class="btn">
                </form>
            </div>
        </card>
    </div>
</template>

<script>
    import Card from './Card'
    export default {
        data() {
            return {
                isLoginCheck: true,
                user: {
                    login: '',
                    password: ''
                }
            }
        },
        components: {
            card: Card
        },
        methods: {
            tabClick(e) {
                if (!e.target.classList.contains('bold')) {
                    this.isLoginCheck = !this.isLoginCheck;
                    this.user.login = '';
                    this.user.password = '';
                }
            }
        },
    }
</script>

<style lang="scss" scoped>
    .header {
        text-align: center;
        font-size: 2vw;
    }
    .margin {
        margin-bottom: 2vw;
    }
    .tab {
        cursor: pointer;
    }
    .bold {
        font-weight: 700;
        cursor: default;
    }
    .form {
        width: 100%;
        .input {
            width: 100%;
            margin: auto;
            border: none;
            border-bottom: 1px solid #ccc;
            outline: none;
            display: block;
            font-size: 1.5vw;
            text-align: center;
        }
        @mixin btn {
            width: 100%;
            border-radius: 0px;
            border: 1px solid #ccc;
            font-size: 1.5vw;
            text-align: center;
        }
        .btn {
            @include btn;
        }
        .disabled {
            @include btn;
            background-color: #bbb;
            border: 1px solid #888;
            cursor: default;
        }
        .margin {
            margin-bottom: 2vw;
        }
    }
</style>