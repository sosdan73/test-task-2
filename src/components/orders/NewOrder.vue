<template>
    <div>
        <card width="30vw">
            <form class="form">
                <label for="count">Number of kettles:</label>
                <input
                    v-model="order.app_count"
                    class="input"
                    id="count"
                    type="number"
                    min="1"
                >
                <p>Price for one kettle: {{ price }} $</p>
                <p>Final price: <span>{{ order.app_count * price | spacer }}</span> $</p>
                <div
                    v-if="order.app_count <= 0"
                    class="btn-primary disabled">
                        Create an order
                </div>
                <button
                    v-else
                    class="btn btn-primary"
                    @click="goToOrder">
                    Submit
                </button>
            </form>
        </card>
    </div>
</template>

<script>
    import Card from '../Card'
    import axios from 'axios'
    export default {
        components: {
            card: Card
        },
        data() {
            return {
                price: 10,
                order: {
                    app_code: 0,
                    app_count: 1,
                    app_remained_count: 0,
                    app_price: 0,
                    app_paid: 0,
                    status: 0,
                    email: ''
                }
            }
        },
        methods: {
            goToOrder(e) {
                e.preventDefault();
                this.order.app_price = this.price * this.order.app_count;
                this.order.app_remained_count = this.order.app_count;
                let length = 0;
                axios.get('orders.json?auth=' + this.$store.state.idToken)
                .then(response => {
                    for (let i in response.data) {
                        length++;
                    }
                    this.order.app_code = length;
                    axios.post('orders.json?auth=' + this.$store.state.idToken, this.order)
                    .then(response => {
                        let location = '/order/' + this.order.app_code;
                        this.$router.push(location)
                    }).catch(error => {
                        console.log(error)
                    })
                })
            }
        },
        filters: {
            spacer(value) {
                let string = value.toString();
                return string.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + ' ');
            }
        },
        created() {
            this.order.email = this.$store.state.email
        },
    }
</script>

<style lang="scss" scoped>

</style>