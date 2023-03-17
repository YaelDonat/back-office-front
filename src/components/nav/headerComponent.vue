<template>
  <div class="card relative z-2">
    <Menubar :model="items">
      <template #start>
        <img
          alt="logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Fish_svg_icon.svg/2048px-Fish_svg_icon.svg.png"
          height="40"
          class="mr-2"
        />
      </template>
      <template #end>
        <autocompleteComponent :products="products.data" :names="names" />
      </template>
    </Menubar>
  </div>
</template>

<script setup>
import autocompleteComponent from '../autocomplete/autocompleteComponent'
import store from '../../store'
import { computed, ref } from 'vue'

const items = ref([
  {
    label: 'Home',
    icon: 'pi pi-fw pi-home',
    to: { name: 'home' },
  },
  {
    label: 'Products',
    icon: 'pi pi-fw pi-box',
    items: [
      {
        label: ' View all products',
        icon: 'pi pi-fw pi-eye',
        to: { name: 'products' },
      },
      {
        label: 'Edit',
        icon: 'pi pi-fw pi-pencil',
        to: { name: 'products-edit' },
      },
    ],
  },
  {
    label: 'User',
    icon: 'pi pi-fw pi-user',
  },
  {
    label: 'Logout',
    icon: 'pi pi-fw pi-power-off',
  },
])

const products = computed(() => store.state.products)
const names = computed(() => {
  return products.value.data
    ? products.value.data.map(product => product.name)
    : []
})
store.dispatch('getProducts')
</script>
