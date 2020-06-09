import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        user: {}
    },
    getters: {

    },
    mutations: {
        setUser: (state, user) => {
            state.user = user
        },
        logOut: state => {
            state.user = null
        },
    },
    actions: {
        
    }
})