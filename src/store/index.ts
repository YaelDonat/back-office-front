import { useFetch } from '@/api/api'
import { createStore } from 'vuex'

export default createStore({
  state: {
    products: { data: [] },
    currentProduct: { data: {} },
  },
  getters: {
    products: state => {
      return state.products
    },
  },
  mutations: {
    setProducts: (state, products) => {
      state.products.data = products
    },
    setCurrentProduct: (state, product) => {
      state.currentProduct.data = product
    },
  },
  actions: {
    getProducts({ commit }, { url = null } = {}) {
      url = url || 'http://127.0.0.1:8000/products'
      const { data, error } = useFetch(url)
      commit('setProducts', data)
      return { data, error }
    },

    getProduct({ commit }, id) {
      const { data, error } = useFetch(`http://127.0.0.1:8000/product/${id}`)
      commit('setCurrentProduct', data)
      return { data, error }
    },
  },
  modules: {},
})
