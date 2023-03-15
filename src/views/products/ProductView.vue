<template>
  <div class="home">
    <main>
      <div class="card-item-product">
        <cardComponent
          :title="product.name + ' - ' + product.price + '€'"
          :subtitle="product.discount"
          :content="product.comments"
          :id="product.id"
          :availability="product.availability"
          :btn="false"
        />
      </div>
    </main>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import store from '../../store'
import cardComponent from '../../components/cards/cardComponent'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'ProductView',
  components: { cardComponent },
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
