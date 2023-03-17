<template>
  <div class="card flex justify-content-center">
    <AutoComplete
      v-model="value"
      dropdown
      :suggestions="items"
      @complete="search"
      :placeholder="placeholder"
      @item-select="handleSelectedItem"
    />
  </div>
</template>

<script setup>
import { ref, defineProps } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps({
  placeholder: {
    type: String,
    default: 'Search product...',
  },
  names: {
    type: Object,
  },
  products: {
    type: Array,
  },
})

const value = ref('')
const items = ref([])

const search = event => {
  items.value = props.names.filter(name => {
    return name.toLowerCase().indexOf(event.query.toLowerCase()) !== -1
  })
}

const findProductId = (products, value) => {
  for (let i = 0; i < products.length; i++) {
    if (products[i].name.toLowerCase() === value.toLowerCase()) {
      return products[i].id
    }
  }
  return null
}

const handleSelectedItem = event => {
  const productId = findProductId(props.products, event.value)
  if (productId) {
    router.push({ name: 'product', params: { id: productId } })
  } else {
    console.warn(`Le produit "${event.value}" n'a pas été trouvé.`)
  }
}
</script>
