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
            <form
                class="form"
                action="#"
                method="post">
                    <p
                        class="margin error"
                        v-if="errorMessage.length > 0">{{ errorMessage }}</p>
                    <input
                        placeholder="Login"
                        v-model="user.login"
                        class="input margin"
                        type="text">
                    <input
                        placeholder="Password"
                        v-model="user.password"
                        class="input margin"
                        type="password">
                <div
                    v-if="user.login == '' || user.password == ''"
                    class="btn-primary disabled">
                        {{ isLoginCheck ? 'Log In' : 'Sign Up'}}
                </div>
                <input
                    v-else
                    type="submit"
                    :value="isLoginCheck ? 'Log In' : 'Sign Up'"
                    class="btn btn-primary"
                    @click="goToOrders">
            </form>
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
                },
                errorMessage: ''
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
            },
            showError(message) {
                this.errorMessage = message;
                setTimeout(() => {
                    this.errorMessage = ''
                }, 2000, this)
            },
            goToOrders(e) {
                e.preventDefault();
                this.$http.get('https://test2-4fbba.firebaseio.com/users.json')
                .then(response => {
                    return response.json()
                }).then(data => {
                    if (this.isLoginCheck) {
                        let error = 'There is no such a login';
                        if (data) {
                            for (let i in data) {
                                if (data[i].login == this.user.login) {
                                    error = 'Wrong password, try again';
                                    if (data[i].password != this.user.password) {
                                        this.showError(error);
                                        return
                                    } else {
                                        this.$store.state.user = this.user;
                                        console.log(this.$store.state.user, this.user);
                                        this.$router.push('/orders')
                                    }
                                }
                            }
                        }
                        this.showError(error);
                        return
                    } else {
                        let error = 'This login already exists';
                        if (data) {
                            for (let i in data) {
                                if (data[i].login == this.user.login) {
                                    this.showError(error);
                                    return
                                }
                            }
                        }
                        this.$http.post('https://test2-4fbba.firebaseio.com/users.json', this.user)
                        .then(() => {
                            this.$store.state.user = this.user;
                            this.$router.push('/orders')
                        })
                    }
                })
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
    .error {
        color: red;
    }
</style>