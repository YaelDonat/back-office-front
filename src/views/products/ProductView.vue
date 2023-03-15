<template>
  <div class="home">
    <header>
      <h1 class="title">VENEZ ACHETEZ NOTRE POISCAILLE</h1>
    </header>
    <main>
      <div class="card-item">
        <div :v-if="product.availability" class="card-header">EN STOCK !</div>
        <div class="card-content">
          {{ product.name }} : {{ product.price }} €
        </div>
        <div class="card-subcontent">{{ product.comments }}</div>
        <div class="card-subcontent">Unité : {{ product.unit }}</div>
        <div v-if="product.discount > 0" class="card-subcontent">
          {{ product.discount }} % de réduction !!
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import store from '../../store'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'ProductView',
  components: {},
  setup() {
    const route = useRoute()

    const product = computed(() => store.state.currentProduct.data)

    if (route.params.id) {
      store.dispatch('getProduct', route.params.id)
    }
    return {
      product,
    }
  },
})
</script>

<style>
main {
  align-items: center;
}
</style>
