import { useFetch } from '@/api/api'
import { createStore } from 'vuex'

export default createStore({
  state: {
    // user: {
    //   data: {
    //     id: sessionStorage.getItem('id'),
    //     name: sessionStorage.getItem('name'),
    //     email: sessionStorage.getItem('email'),
    //   },
    //   token: 1, //sessionStorage.getItem("TOKEN"),
    // },
    products: {
      data: [],
      loading: false,
    },
    currentProduct: {
      data: {},
      loading: false,
    },
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
  },
  actions: {
    getProducts({ commit }, { url = null } = {}) {
      commit('setProductsLoading', true)
      url = url || 'http://127.0.0.1:8000/products'
      const { data, error } = useFetch(url)
      commit('setProducts', data)
      commit('setProductsLoading', false)
      return { data, error }
    },

    getProduct({ commit }, id) {
      commit('setCurrentProductLoading', true)
      const { data, error } = useFetch(`http://127.0.0.1:8000/product/${id}`)
      commit('setCurrentProduct', data)
      commit('setCurrentProductLoading', false)
      return { data, error }
    },
  },
  modules: {},
})
