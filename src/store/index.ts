/* eslint-disable prettier/prettier */
import { useFetch } from '@/api/api'
import { createStore } from 'vuex'

export default createStore({
  state: {
    user: {
      data: {
        username: null,
        password: null,
      },
      token: {
        accessToken: localStorage.getItem('accessToken'),
        refreshToken: localStorage.getItem('refreshToken'),
      },
    },
    products: {
      data: [],
      loading: false,
    },
    currentProduct: {
      data: {},
      loading: false,
    },
    errorMessage: null,
  },
  getters: {
    products: state => {
      return state.products
    },
    product: state => {
      return state.currentProduct
    },
  },
  mutations: {
    saveProducts: (state, product) => {
      state.currentProduct = product
    },
    setProducts: (state, products) => {
      state.products.data = products
    },
    setProductsLoading: (state, loading) => {
      state.products.loading = loading
    },
    setCurrentProduct: (state, product) => {
      state.currentProduct.data = product
    },
    setCurrentProductLoading: (state, loading) => {
      state.currentProduct.loading = loading
    },
    setErrorMessage: (state, errorMessage) => {
      state.errorMessage = errorMessage
    },
    setAccessToken: (state, token) => {
      state.user.token.accessToken = token.access
      localStorage.setItem('accessToken', token)
    },
    setRefreshToken: (state, token) => {
      state.user.token.refreshToken = token.refresh
      localStorage.setItem('refreshToken', token)
    },
    logout: state => {
      state.user.token.accessToken = null
      state.user.token.refreshToken = null
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
    },
  },
  actions: {
    getProducts({ commit }, { url = null } = {}) {
      commit('setProductsLoading', true)
      url = url || 'http://127.0.0.1:8000/infoproducts/'
      const { data, error } = useFetch(url)
      commit('setProducts', data)
      commit('setProductsLoading', false)
      return { data, error }
    },

    getProduct({ commit }, id) {
      commit('setCurrentProductLoading', true)
      const { data, error } = useFetch(
        `http://127.0.0.1:8000/infoproduct/${id}/`
      )
      commit('setCurrentProduct', data)
      commit('setCurrentProductLoading', false)
      return { data, error }
    },

    saveProduct({ commit }, { id, product }) {
      // eslint-disable-next-line no-async-promise-executor
      return new Promise(async (resolve, reject) => {
        try {
          const response = await fetch(
            `http://127.0.0.1:8000/infoproduct/${id}/`,
            {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.state.user.token.accessToken}`
              },
              body: JSON.stringify(product),
            }
          )

          if (response.ok) {
            // Update the product information in the store
            const data = await response.json()
            commit('setCurrentProduct', data)
            resolve({ data })
          } else {
            // Handle the error
            const error = await response.json()
            reject(error)
          }
        } catch (error) {
          reject(error)
        }
      })
    },

    async login({ commit }, user) {
      const response = await fetch('http://127.0.0.1:8000/api/token/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: user.username,
          password: user.password,
        }),
      })

      if (response.ok) {
        // Récupérer le token JWT et le stocker dans le state Vuex
        const data = await response.json()
        commit('setAccessToken', data.access)
        commit('setRefreshToken', data.refresh)
        return { data }
      } else {
        // Traiter l'erreur de connexion
        commit('setErrorMessage', 'Erreur de connexion')
      }
    },
    logout({ commit }) {
      commit('logout')
    },
  },
  modules: {},
})
