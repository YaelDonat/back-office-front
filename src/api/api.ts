// fetch.js
import { ref, isRef, unref, watchEffect } from 'vue'
import store from '../store'

export function useFetch(url: string) {
  const data = ref(null)
  const error = ref(null)

  function doFetch() {
    // réinitialiser l'état avant de récupérer..
    data.value = null
    error.value = null
    // unref() déballe les refs potentielles
    fetch(unref(url), {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    })
      .then(res => {
        if (!res.ok) {
          store.dispatch('refreshAccessToken').then(() => {
            store.commit('setProductsLoading', false)
            console.log('ca a été rafraichi')
            useFetch(url)
            location.reload()
          })

          console.log(error)
        }
        store.commit('setProductsLoading', false)
        console.log('test')
        return res.json()
      })
      .then(json => (data.value = json))
      .catch(err => (error.value = err))
  }

  if (isRef(url)) {
    // configure la récupération réactive si l'URL d'entrée est une ref
    watchEffect(doFetch)
  } else {
    // sinon, ne récupérer qu'une seule fois
    // et éviter la surcharge d'un observateur
    doFetch()
  }
  return { data, error }
}
