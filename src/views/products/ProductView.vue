<template>
  <div class="home">
    <main>
      <div class="card-item-product">
        <cardComponentDetail
          v-if="product"
          :title="product.name + ' - ' + product.price + '€'"
          :subtitle="product.discount"
          :content="product.comments"
          :id="product.id"
          :availability="product.availability"
          :btn="false"
          :product="product"
        />
      </div>
    </main>
  </div>
</template>

<script setup>
import store from '../../store'
import cardComponentDetail from '../../components/cards/cardComponentDetail'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const product = computed(() => store.state.currentProduct.data)
if (route.params.id) {
  store.dispatch('getProduct', route.params.id)
}
console.log('produit :')
</script>

<style>
main {
  align-items: center;
}
</style>
