<template>
  <div class="home">
    <main>
      <div class="card-item-product">
        <cardComponentDetail
          v-if="product"
          :name="product.name"
          :price="product.price"
          :subtitle="product.discount"
          :content="product.comments"
          :id="product.tig_id"
          :availability="product.availability"
          :sale="product.sale"
          :btn="false"
          :product="product"
          :quantity="product.quantityInStock"
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
