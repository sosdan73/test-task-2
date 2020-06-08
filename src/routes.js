import Registration from './components/Registration'
import Orders from './components/orders/Orders'
import NewOrder from './components/orders/NewOrder'
import Order from './components/orders/Order'
import NewSuborder from './components/orders/suborders/NewSuborder'
import Suborder from './components/orders/suborders/Suborder'
export const routes = [
    { path: '', component: Registration },
    { path: '/orders', component: Orders },
    { path: '/new-order', component: NewOrder },
    { path: '/order/:id', component: Order },
    { path: '/new-suborder/:id', component: NewSuborder },
    { path: '/suborder/:id', component: Suborder },
];