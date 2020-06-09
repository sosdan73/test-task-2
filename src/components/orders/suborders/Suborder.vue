<template>
    <div>
        <div
            v-if="showPage">
                <card width="30vw">
                <p class="order__text">Suborder's ID <strong>{{ suborder.sub_code }}</strong> from order <strong>#{{ suborder.app_code }}</strong></p>
                <p class="order__text">You ordered <strong>{{ suborder.sub_count }}</strong> kettles from <strong>{{ suborder.type == 1 ? 'Bosch' : 'Polaris' }}</strong></p>
                <p class="order__text">The address is <strong>{{ suborder.address }}</strong> (Region <strong>#{{ suborder.region }}</strong>)</p>
                <p class="order__text">{{ status }}</p>
                <textarea
                    v-if="suborder.status == 4"
                    class="textarea"
                    placeholder="What is wrong?"
                    cols="30"
                    rows="10"
                    v-model="suborder.reason">
                </textarea>
            </card>
            <div class="btn-container" :class="{triple: suborder.status == 3, double: suborder.status == 4}">
                <router-link
                    :to="'/order/' + suborder.app_code"
                    class="btn btn-primary">
                        Back to order
                </router-link>
                <button
                    @click="suborderReady"
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
                <button
                    v-if="suborder.status == 4"
                    class="btn btn-primary"
                    @click="reshipSuborder">
                        Reship my order
                </button>
            </div>
        </div>
        <load v-else></load>
    </div>
</template>

<script>
    import Card from '../../Card'
    import load from '../../Load'
    import { eventBus } from '../../../main'
    export default {
        components: {
            card: Card,
            load
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
                app_key: '',
                order: {},
                showPage: false
            }
        },
        methods: {
            putSuborder(ready = false) {
                this.$http.post('https://test2-4fbba.firebaseio.com/suborders/' + this.sub_key + '.json', this.suborder, {
                    headers: {
                        'X-HTTP-Method-Override': 'PUT'
                    },
                    emulateHTTP: true
                })
                if (ready) {
                    this.order.app_paid += this.price * Number(this.suborder.sub_count);
                    if (this.order.app_paid == this.order.app_price) {
                        this.order.status = 2
                    }
                    this.$http.post('https://test2-4fbba.firebaseio.com/orders/' + this.app_key + '.json', this.order, {
                        headers: {
                            'X-HTTP-Method-Override': 'PUT'
                        },
                        emulateHTTP: true
                    })
                }
            },
            statusChange(num) {
                this.suborder.status = num;
                if(num <= 1) {
                    this.status = 'We are working on current suborder'
                } else if (num == 2) {
                    this.status = 'Your suborder has been shipped to you'
                } else if (num == 3) {
                    this.status = 'Your suborder has arrived. Are you satisfied with it?'
                } else if (num == 4) {
                    this.status = 'The suborder will be reshipped. Please write the reason of declining it'
                } else {
                    this.status = 'We\'re done with this suborder'
                }
            },
            suborderReady() {
                this.statusChange(5);
                this.putSuborder(true)
            },
            reshipSuborder() {
                this.statusChange(1);
                eventBus.$emit('suborderWanted', this.suborder.sub_code);
                this.putSuborder()
            }
        },
        created() {
            this.$http.get('https://test2-4fbba.firebaseio.com/suborders.json')
            .then(response => {
                return response.json()
            }).then(data => {
                for (let key in data) {
                    if (data[key].sub_code == this.id) {
                        this.sub_key = key;
                        this.suborder = data[key];
                        this.statusChange(data[key].status)
                    }
                }
            })
            .then(() => {
                this.showPage = true;
                if (this.suborder.status < 5) {
                    this.$http.get('https://test2-4fbba.firebaseio.com/orders.json')
                    .then(response => {
                        return response.json()
                    }).then(data => {
                        for (let key in data) {
                            if (data[key].app_code == this.suborder.app_code) {
                                this.order = data[key];
                                this.app_key = key;
                            }
                        }
                    })
                }
            })
        },
        beforeUpdate() {
            eventBus.$on('updateSuborder', e => {
                this.$http.get('https://test2-4fbba.firebaseio.com/suborders.json')
                .then(response => {
                    return response.json()
                }).then(data => {
                    for (let key in data) {
                        if (data[key].sub_code == e) {
                            this.suborder = data[key];
                            this.statusChange(data[key].status)
                        }
                    }
                })
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
    .double {
        grid-template-columns: repeat(2, auto);
    }
    .textarea {
        resize: none;
        outline: none;
        padding: 1vw;
    }
</style>