<template>
    <div>
        <div v-if="showPage">
            <h2 class="header">Orders list: {{ orders.length }} {{ orders.length == 1 ? 'order' : 'orders' }}</h2>
            <empty-list v-if="orders.length == 0"></empty-list>
            <card class="card" width="60vw" v-else>
                <div
                    v-for="order in orders"
                    :key="order.app_code"
                    class="order_element">
                    <p>ID: {{ order.app_code }}</p>
                    <router-link
                        :to="'/order/' + order.app_code"
                        class="btn btn-primary">More info</router-link>
                </div>
            </card>
            <div class="btn-container">
                <router-link class="btn-primary" to="/new-order">Create an order</router-link>
            </div>
        </div>
        <load v-else></load>
    </div>
</template>

<script>
    import emptyList from '../emptyList'
    import Card from '../Card'
    import load from '../Load'
    import axios from 'axios'
    export default {
        data() {
            return {
                orders: [
                    
                ],
                showPage: false
            }
        },
        components: {
            emptyList,
            card: Card,
            load
        },
        // computed: {
            
        // },
        created() {
            axios.get('orders.json?auth=' + this.$store.state.idToken)
            .then(response => {
                if (response.data) {
                    for (let i in response.data) {
                        if (response.data[i].email == this.$store.getters.email) {
                            this.orders.push(response.data[i])
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
        font-size: 4vw;
        text-align: center;
        margin-bottom: 2vw;
    }
    .order_element {
        width: inherit;
        display: grid;
        align-content: center;
        grid-template-columns: 1fr auto;
        & *:first-child {
            border: 1px solid #42b983;
            border-right: none;
            margin: 0;
            padding: 1rem 0;
        }
    }
    .card {
        row-gap: 2vw;
    }
</style>