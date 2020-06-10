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
                        placeholder="Email"
                        v-model="user.email"
                        class="input margin"
                        type="text">
                    <input
                        placeholder="Password"
                        v-model="user.password"
                        class="input margin"
                        type="password">
                <div
                    v-if="user.email == '' || user.password == ''"
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
                    email: '',
                    password: '',
                    returnSecureToken: true
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
                    this.user.email = '';
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
                if (this.isLoginCheck) {
                    this.$store.dispatch('login', this.user)
                } else {
                    this.$store.dispatch('signup', this.user)
                }
                // .then(response => {
                //     if (this.isLoginCheck) {
                //         let error = 'There is no such email';
                //         if (response.data) {
                //             for (let i in response.data) {
                //                 if (response.data[i].email == this.user.email) {
                //                     error = 'Wrong password, try again';
                //                     if (response.data[i].password != this.user.password) {
                //                         this.showError(error);
                //                         return
                //                     } else {
                //                         this.$router.push('/orders')
                //                     }
                //                 }
                //             }
                //         }
                //         this.showError(error);
                //         return
                //     } else {
                //         let error = 'This email is already used!';
                //         if (response.data) {
                //             for (let i in response.data) {
                //                 if (response.data[i].email == this.user.email) {
                //                     this.showError(error);
                //                     return
                //                 }
                //             }
                //         }
                //         axios.post('/signUp?key=AIzaSyDRByUnr8Hb8sSDfa6ydDDc5MD4yOeWGDM', this.user)
                //         .then(res => {
                //             console.log(res);
                //             // this.$router.push('/orders')
                //         })
                //     }
                // })
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