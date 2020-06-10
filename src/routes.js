import Registration from './components/Registration'
import Orders from './components/orders/Orders'
import NewOrder from './components/orders/NewOrder'
import Order from './components/orders/Order'
import NewSuborder from './components/orders/suborders/NewSuborder'
import Suborder from './components/orders/suborders/Suborder'
import {store} from './store/store'

export const routes = [
    {
        path: '/',
        component: Registration
    },
    {
        path: '/orders',
        component: Orders,
        beforeEnter(to, from, next) {
            if (store.state.idToken) {
                next()
            } else {
                next('/')
            }
        }
    },
    {
        path: '/new-order',
        component: NewOrder,
        beforeEnter(to, from, next) {
            if (store.state.idToken) {
                next()
            } else {
                next('/')
            }
        }
    },
    {
        path: '/order/:id',
        component: Order,
        beforeEnter(to, from, next) {
            if (store.state.idToken) {
                next()
            } else {
                next('/')
            }
        }
    },
    {
        path: '/new-suborder/:id',
        component: NewSuborder,
        beforeEnter(to, from, next) {
            if (store.state.idToken) {
                next()
            } else {
                next('/')
            }
        }
    },
    {
        path: '/suborder/:id',
        component: Suborder,
        beforeEnter(to, from, next) {
            if (store.state.idToken) {
                next()
            } else {
                next('/')
            }
        }
    },
];