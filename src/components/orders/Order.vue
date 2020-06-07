<template>
    <div>
        <card width="30vw">
            <p class="order__text">Your order's ID is <strong>{{ order.app_code }}</strong></p>
            <p class="order__text">You ordered <strong>{{ order.app_count }}</strong> kettles</p>
            <p class="order__text">You have <strong>{{ order.app_remained_count }}</strong> kettles left to get</p>
            <p class="order__text">You paid <strong>{{ order.app_paid }}</strong>$ out of <strong>{{ order.app_price }}</strong>$</p>
            <p class="order__text">{{ status }}</p>
        </card>
        <h2 class="header">The list of suborders:</h2>
        <empty-list v-if="suborders.length == 0"></empty-list>
        <card width="60vw" v-else>

        </card>
        <div class="btn-container">
            <router-link
                to="/orders"
                class="btn btn-primary">
                    Back to orders
            </router-link>
            <router-link
                v-if="order.app_remained_count > 0"
                to="/new-suborder"
                class="btn btn-primary">
                    Make a new suborder
            </router-link>
        </div>
    </div>
</template>

<script>
    import Card from '../Card'
    import emptyList from '../emptyList'
    export default {
        components: {
            card: Card,
            emptyList,
        },
        data() {
            return {
                id: this.$route.params.id,
                order: {
                    app_code: 0,
                },
                suborders: [],
                status: ''
            }
        },
        methods: {
            
        },
        created() {
            this.$http.get('https://test2-4fbba.firebaseio.com/orders.json')
            .then(response => {
                return response.json()
            }).then(data => {
                for (let key in data) {
                    if (data[key].app_code == this.id) {
                        this.order = data[key]
                        if(data[key].status == 0) {
                            this.status = 'Your order is still in progress'
                        } else if (data[key].status == 1) {
                            this.status = 'Your order has arrived. Please make sure to pay for it'
                        } else {
                            this.status = 'Everything has been arived and payed. Thanks!'
                        }
                    }
                }
            })
            this.$http.get('https://test2-4fbba.firebaseio.com/suborders.json')
            .then(response => {
                return response.json()
            }).then(data => {
                if (data) {
                    for (let i in data) {
                        this.suborders.push(data[i])
                    }
                }
            })
        },
    }
</script>

<style lang="scss" scoped>
    .order__text {
        margin-top: 0;
    }
    .order__text:last-child {
        margin: 0;
    }
    .btn-container {
        grid-template-columns: repeat(2, auto);
        justify-content: center;
        column-gap: 2vw;
    }
</style>