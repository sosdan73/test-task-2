import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios-auth'
import mainAxios from 'axios'
import {router} from '../main'

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        idToken: null,
        userId: null,
        user: null,
        email: null
    },
    getters: {
        user(state) {
            return state.user
        },
        email(state) {
            return state.email
        }
    },
    mutations: {
        authUser(state, userData) {
            state.idToken = userData.token;
            state.userId = userData.userId;
            state.email = userData.email;
        },
        storeUser(state, user) {
            state.user = user
        },
        deleteState(state) {
            state.idToken = null;
            state.userId = null;
            state.user = null;
            state.email = null;
        }
    },
    actions: {
        signup({ commit, dispatch }, authData) {
            axios.post('/signupNewUser?key=AIzaSyDRByUnr8Hb8sSDfa6ydDDc5MD4yOeWGDM', authData)
            .then(res => {
                console.log(res);
                commit('authUser', {
                    token: res.data.idToken,
                    userId: res.data.localId,
                    email: res.data.email
                })
                dispatch('storeUser', authData)
                router.push('/orders')
            }).catch(err => {
                console.log(err)
            })
        },
        login({ commit }, authData) {
            axios.post('/verifyPassword?key=AIzaSyDRByUnr8Hb8sSDfa6ydDDc5MD4yOeWGDM', authData)
            .then(res => {
                console.log(res);
                commit('authUser', {
                    token: res.data.idToken,
                    userId: res.data.localId,
                    email: res.data.email
                })
                console.log(this);
                 router.push('/orders')
            }).catch(err => {
                console.log(err)
            })
        },
        storeUser({ commit, state }, userData) {
            if (!state.idToken) {
                return
            }
            mainAxios.post('/users.json' + '?auth=' + state.idToken, userData)
            .then(res => {
                console.log(res)
            }).catch(err => {
                console.log(err)
            })
        },
        fetchUser({ commit, state }, ) {
            mainAxios.get('/users.json' + '?auth=' + state.idToken)
            .then(res => {
                const data = res.data;
                const users = [];
                for (let key in data) {
                    const user = data[key];
                    user.id = key;
                    users.push(user)
                }
                console.log(users);
                commit('storeUser', users[0])
            }).catch(err => {
                console.log(err)
            })
        },
        logout({commit}) {
            commit('deleteState');
            router.replace('/')
        }
    }
})