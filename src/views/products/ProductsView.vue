<template>
  <div class="home">
    <main>
      <Skeleton
        v-if="products.loading"
        width="50rem"
        height="40rem"
        class="mb-2"
        style="margin-top: 2rem"
      ></Skeleton>
      <div v-else class="list-item">
        <div
          class="card-item-product"
          v-for="product in products.data"
          :key="product.id"
        >
          <cardComponent
            :title="product.name + ' - ' + product.price + '€'"
            :price="product.price"
            :subtitle="product.discount"
            :content="product.comments"
            :id="product.tig_id"
            :availability="product.availability"
            :btn="true"
            :product="product"
          />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import store from '../../store'
import { computed } from 'vue'
import cardComponent from '../../components/cards/cardComponent'

const products = computed(() => store.state.products)
store.dispatch('getProducts')
</script>

<style>
.home {
  overflow-x: hidden;
}
header {
  padding: 1rem;
  font-family: 'Montserrat', 'sans-serif';
  font-size: 2em;
  text-align: center;
  top: 0;
  position: sticky;
  background: #8bcad9;
  width: 100%;
}
main {
  display: flex;
  justify-content: center;
  flex-direction: column;
  overflow-y: hidden;
}

.list-item {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}

.card-item-product {
  font-family: 'Montserrat', 'sans-serif';
  color: #fff;
  text-align: left;
  font-size: 1.5em;
  margin: 1rem;
  padding: 0.2rem;
  min-width: 15%;
  max-width: fit-content;
  border-radius: 1rem;
}
.p-card-body {
  box-shadow: 10px 5px 5px #cdcdcd;
}

.title {
  color: #fff;
  margin: 0;
}
</style>
