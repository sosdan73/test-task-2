<template>
    <div>
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
</template>

<script>
    import emptyList from '../emptyList'
    import Card from '../Card'
    export default {
        data() {
            return {
                orders: [
                    
                ]
            }
        },
        components: {
            emptyList,
            card: Card
        },
        created() {
            this.$http.get('https://test2-4fbba.firebaseio.com/orders.json')
            .then(response => {
                return response.json()
            }).then(data => {
                if (data) {
                    for (let i in data) {
                        this.orders.push(data[i])
                    }
                }
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