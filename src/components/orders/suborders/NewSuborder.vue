<template>
    <div>
        <card width="30vw">
            <form class="form">
                <label
                    for="count">
                        Number of kettles (maximum is {{ order.app_remained_count }}):
                </label>
                <input
                    v-model="suborder.sub_count"
                    class="input margin"
                    id="count"
                    type="number"
                    min="1"
                    pattern="\d+"
                >
                <label
                    for="addres">
                        Your address:
                </label>
                <input
                    v-model="suborder.address"
                    class="input"
                    id="addres"
                    type="text"
                >
                <p>Model of kettles:</p>
                <input
                    type="radio"
                    id="bosch"
                    value="Bosch"
                    v-model="kettleModel"
                >
                <label for="bosch">Bosch</label>
                <br>
                <input
                    type="radio"
                    id="polaris"
                    value="Polaris"
                    v-model="kettleModel"
                >
                <label for="polaris">Polaris</label>
                <p>Price for one kettle: {{ price }} $</p>
                <p>Final price: <span>{{ suborder.sub_count * price | spacer }}</span> $</p>
                <div
                    v-if="(Number(suborder.sub_count) > order.app_remained_count) || (Number(suborder.sub_count) <= 0) || (suborder.address == '')"
                    class="btn-primary disabled">
                        Submit
                </div>
                <button
                    v-else
                    class="btn btn-primary"
                    @click="goToSuborder">
                    Submit
                </button>
            </form>
        </card>
    </div>
</template>

<script>
    import Card from '../../Card'
    export default {
        components: {
            card: Card
        },
        data() {
            return {
                price: 10,
                order: {
                    app_remained_count: 0
                },
                suborder: {
                    sub_code: 0,
                    region: 77,
                    type: 1,
                    address: '',
                    app_code: Number(this.$route.params.id),
                    sub_count: 0,
                    status: 0,
                    reason: null
                },
                kettleModel: 'Bosch',
                error: false
            }
        },
        methods: {
            goToSuborder(e) {
                e.preventDefault();
                this.suborder.type = this.kettleModel == 'Bosch' ? 1 : 2;
                this.$http.post('https://test2-4fbba.firebaseio.com/suborders.json', this.suborder)
                    .then(response => {
                        let location = '/suborder/' + this.suborder.sub_code;
                        this.$router.push(location)
                    }, error => {
                        console.log(error);
                    });
            },
            isError() {
                this.error = Number(suborder.sub_count) > order.app_remained_count || Number(suborder.sub_count) <= 0 ? true : false;
            }
        },
        filters: {
            spacer(value) {
                let string = value.toString();
                return string.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + ' ');
            }
        },
        created() {
            this.$http.get('https://test2-4fbba.firebaseio.com/orders.json')
            .then(response => {
                return response.json()
            }).then(data => {
                for (let i in data) {
                    if (data[i].app_code == this.$route.params.id) {
                        this.order = data[i];
                        console.log(this.order)
                    }
                }
            }).then(() => {
                this.$http.get('https://test2-4fbba.firebaseio.com/suborders.json')
                .then(response => {
                    return response.json()
                }).then(data => {
                    let length = 0;
                    for (let i in data) {
                        if (data[i].app_code == this.order.app_code) {
                            length++;
                        }
                    }
                    this.suborder.sub_code = length;
                })
            })
        },
    }
</script>

<style lang="scss" scoped>

</style>