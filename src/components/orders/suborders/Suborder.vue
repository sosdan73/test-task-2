<template>
    <div>
        <card width="30vw">
            <p class="order__text">Suborder's ID <strong>{{ suborder.sub_code }}</strong> from order <strong>#{{ suborder.app_code }}</strong></p>
            <p class="order__text">You ordered <strong>{{ suborder.sub_count }}</strong> kettles from <strong>{{ suborder.type == 1 ? 'Bosch' : 'Polaris' }}</strong></p>
            <p class="order__text">The address is <strong>{{ suborder.address }}</strong> (Region <strong>#{{ suborder.region }}</strong>)</p>
            <p class="order__text">{{ status }}</p>
        </card>
        <div class="btn-container" :class="{triple: suborder.status == 3}">
            <router-link
                :to="'/order/' + suborder.app_code"
                class="btn btn-primary">
                    Back to order
            </router-link>
            <button
                @click="statusChange(5)"
                class="btn btn-primary"
                v-if="suborder.status == 3">
                    Yes, pay for it
            </button>
            <button
                @click="statusChange(4)"
                class="btn btn-primary"
                v-if="suborder.status == 3">
                    No, something is wrong
            </button>
        </div>
    </div>
</template>

<script>
    import Card from '../../Card'
    export default {
        components: {
            card: Card,
        },
        data() {
            return {
                id: this.$route.params.id,
                price: 10,
                suborder: {
                    sub_code: 0,
                },
                status: '',
                sub_key: '',
                order: {}
            }
        },
        methods: {
            statusChange(num) {
                this.suborder.status = num;
                if(num <= 1) {
                    this.status = 'We are working on current suborder'
                } else if (num == 2) {
                    this.status = 'Your suborder has been shipped to you'
                } else if (num == 3) {
                    this.status = 'Your suborder has arrived. Are you satisfied with it?'
                } else if (num == 4) {
                    this.$http.put('https://test2-4fbba.firebaseio.com/suborders.json', this.suborder)
                    .then(response => {
                        console.log(response)
                    }).then(this.status = 'The suborder will be reshipped. Please write the reason of declining it')
                } else {
                    this.$http.get('https://test2-4fbba.firebaseio.com/orders.json')
                    .then(response => {
                        return response.json()
                    }).then(data => {
                        if (data) {
                            for (let i in data) {
                                if (this.suborder.app_code == data[i].app_code) {
                                    this.order = data[i]
                                }
                            }
                        }
                        this.order.app_paid += this.price * Number(this.suborder.sub_count);
                        this.order.app_remained_count = Number(this.order.app_remained_count) - Number(this.suborder.sub_count)
                    })
                    this.$http.post('https://test2-4fbba.firebaseio.com/suborders.json', {
                        body: this.suborder,
                        headers: {
                            'X-HTTP-Method-Override': 'PUT'
                        },
                        emulateHTTP: true
                    })
                    .then(response => {
                        console.log(response)
                    }).then(this.status = 'We\'re done with this suborder')
                    
                }
            }
        },
        created() {
            this.$http.get('https://test2-4fbba.firebaseio.com/suborders.json')
            .then(response => {
                return response.json()
            }).then(data => {
                for (let key in data) {
                    if (data[key].sub_code == this.id) {
                        this.suborder = data[key];
                        this.sub_key = key;
                        console.log(this.sub_key);
                        if(data[key].status <= 1) {
                            this.status = 'We are working on current suborder'
                        } else if (data[key].status == 2) {
                            this.status = 'Your suborder has been shipped to you'
                        } else if (data[key].status == 3) {
                            this.status = 'Your suborder has arrived. Are you satisfied with it?'
                        } else if (data[key].status == 4) {
                            this.status = 'The suborder will be reshipped. Please write the reason of declining it'
                        } else {
                            this.status = 'We\'re done with this suborder'
                        }
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
        justify-content: center;
        column-gap: 2vw;
    }
    .triple {
        grid-template-columns: repeat(3, auto);
    }
</style>