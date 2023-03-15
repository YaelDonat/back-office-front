<template>
  <div class="home">
    <header>
      <h1 class="title">VENEZ ACHETEZ NOTRE POISCAILLE</h1>
    </header>
    <main>
      <div class="list-item">
        <div
          class="card-item"
          v-for="product in products.data"
          :key="product.id"
        >
          <div :v-if="product.availability" class="card-header">EN STOCK !</div>
          <div class="card-content">
            {{ product.name }} : {{ product.price }} €
          </div>
          <div class="card-subcontent">{{ product.comments }}</div>
          <div class="card-subcontent">Unité : {{ product.unit }}</div>
          <div v-if="product.discount > 0" class="card-subcontent">
            {{ product.discount }} % de réduction !!
          </div>
          <router-link
            style="text-decoration: none; color: inherit"
            v-if="product.id"
            :to="{ name: 'product', params: { id: product.id } }"
          >
            <div type="submit" class="btn-details">Détails</div>
          </router-link>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import store from '../../store'
import { computed } from 'vue'

export default defineComponent({
  name: 'ProductsView',
  components: {},
  setup() {
    const products = computed(() => store.state.products)
    store.dispatch('getProducts')

    return {
      products,
    }
  },
})
</script>

<style>
.card-header {
  font-size: 2em;
  font-weight: bold;
  color: #fff;
  text-align: center;
}
.btn-details {
  padding: 0.5em;
  background-color: #fff;
  border-radius: 5%;
  max-width: fit-content;
  color: #000;
  margin-top: 0.1em;
}
.card-content {
  font-size: 1.5rem;
}

.card-subcontent {
}

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

.card-item {
  font-family: 'Montserrat', 'sans-serif';
  color: #fff;
  border: 0.25rem solid #fff;
  text-align: left;
  font-size: 1.5em;
  margin: 1rem;
  padding: 1rem;
  min-width: 15%;
  max-width: fit-content;
  background-color: #8bcad9;
  border-radius: 1rem;
}

.title {
  color: #fff;
  margin: 0;
}
</style>
