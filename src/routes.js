import Registration from './components/Registration'
import Orders from './components/orders/Orders'
import NewOrder from './components/orders/NewOrder'
import Order from './components/orders/Order'
// import Orders from './components/orders/Orders'
export const routes = [
    { path: '', component: Registration },
    { path: '/orders', component: Orders },
    { path: '/new-order', component: NewOrder },
    { path: '/order/:id', component: Order },
    // { path: '/orders', component: Orders },
];