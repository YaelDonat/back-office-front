<template>
  <div class="home">
    <headerComponent />
    <main>
      <div class="list-item">
        <div class="card-item" v-for="item in data" :key="item.id">
          <div :v-if="item.availability" class="card-header">EN STOCK !</div>
          <div class="card-content">{{ item.name }} : {{ item.price }} €</div>
          <div class="card-subcontent">{{ item.comments }}</div>
          <div class="card-subcontent">Unité : {{ item.unit }}</div>
          <div v-if="item.discount > 0" class="card-subcontent">
            {{ item.discount }} % de réduction !!
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { useFetch } from '../api/api'
import headerComponent from '../components/nav/headerComponent'

export default defineComponent({
  name: 'HomeView',
  components: { headerComponent },
  setup() {
    const { data, error } = useFetch('http://127.0.0.1:8000/products')
    return { data, error }
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

.card-content {
  font-size: 1.5rem;
}

.card-subcontent {
}

.home {
  overflow-x: hidden;
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
  max-width: 15%;
  background-color: #8bcad9;
  border-radius: 1rem;
}

.title {
  color: #fff;
  margin: 0;
}
</style>
