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
        <!-- <InputText placeholder="Search" type="text" /> -->
        <autocompleteComponent :items="products.data" :names="names" />
      </template>
    </Menubar>
  </div>
</template>

<script>
import autocompleteComponent from '../autocomplete/autocompleteComponent'
import store from '../../store'
import { computed } from 'vue'

export default {
  components: { autocompleteComponent },
  data() {
    return {
      items: [
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
              items: [
                {
                  label: 'Save',
                  icon: 'pi pi-fw pi-calendar-plus',
                },
                {
                  label: 'Delete',
                  icon: 'pi pi-fw pi-calendar-minus',
                },
              ],
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
      ],
    }
  },
  // setup
  setup() {
    const products = computed(() => store.state.products)
    const names = products.value.data.map(res => res.name)
    store.dispatch('getProducts')
    return {
      products,
      names,
    }
  },
}
</script>
