<template>
    <div>
        <div v-if="showPage">
            <card width="30vw">
                <p class="order__text">Your order's ID is <strong>{{ order.app_code }}</strong></p>
                <p class="order__text">You ordered <strong>{{ order.app_count }}</strong> kettles</p>
                <p class="order__text">You have <strong>{{ order.app_remained_count }}</strong> kettles left to order</p>
                <p class="order__text">You paid <strong>{{ order.app_paid }}</strong>$ out of <strong>{{ order.app_price }}</strong>$</p>
                <p class="order__text">{{ status }}</p>
            </card>
            <h2 class="header">The list of suborders:</h2>
            <empty-list v-if="suborders.length == 0"></empty-list>
            <card width="60vw" v-else>
                <div
                    v-for="suborder in suborders"
                    :key="suborder.sub_code"
                    class="order_element">
                    <p>Suborder ID: {{ suborder.sub_code }}</p>
                    <p>Status: {{ suborder.status }}</p>
                    <router-link
                        :to="'/suborder/' + suborder.sub_code"
                        class="btn btn-primary">More info</router-link>
                </div>
            </card>
            <div class="btn-container">
                <router-link
                    to="/orders"
                    class="btn btn-primary">
                        Back to orders
                </router-link>
                <router-link
                    v-if="order.app_remained_count > 0"
                    :to="'/new-suborder/' + order.app_code"
                    class="btn btn-primary">
                        Make a new suborder
                </router-link>
            </div>
        </div>
        <load v-else></load>
    </div>
</template>

<script>
    import Card from '../Card'
    import emptyList from '../emptyList'
    import load from '../Load'
    import axios from 'axios'
    export default {
        components: {
            card: Card,
            emptyList,
            load
        },
        data() {
            return {
                id: this.$route.params.id,
                order: {
                    app_code: 0,
                },
                suborders: [],
                status: '',
                showPage: false
            }
        },
        methods: {
            
        },
        created() {
            axios.get('orders.json?auth=' + this.$store.state.idToken)
            .then(response => {
                for (let key in response.data) {
                    if (response.data[key].app_code == this.id) {
                        this.order = response.data[key]
                        if(response.data[key].status == 0) {
                            this.status = 'Your order is still in progress'
                        } else if (response.data[key].status == 1) {
                            this.status = 'Your order has arrived. Please make sure to pay for it'
                        } else {
                            this.status = 'Everything has arrived and has been payed. Thanks!'
                        }
                    }
                }
            })
            axios.get('suborders.json?auth=' + this.$store.state.idToken)
            .then(response => {
                if (response.data) {
                    for (let i in response.data) {
                        if (response.data[i].app_code == this.id) {
                            this.suborders.push(response.data[i]);
                        }
                    }
                }
                this.showPage = true
            })
        },
    }
</script>

<style lang="scss" scoped>
    .header {
        margin-bottom: 2vw;
    }
    .order__text {
        margin-top: 0;
        margin-bottom: 1vw;
    }
    .order__text:last-child {
        margin: 0;
    }
    .btn-container {
        grid-template-columns: repeat(2, auto);
        justify-content: center;
        column-gap: 2vw;
    }
    .order_element {
        width: inherit;
        display: grid;
        align-content: center;
        grid-template-columns: 1fr 1fr auto;
        & *:nth-child(2), & *:first-child {
            border: 1px solid #42b983;
            border-right: none;
            margin: 0;
            padding: 1rem 0;
        }
    }
    .card:nth-child(3) {
        row-gap: 2vw;
    }
    .green {
        color: #42b983;
    }
</style>