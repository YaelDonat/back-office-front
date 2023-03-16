<template>
  <div class="card flex justify-content-center">
    <AutoComplete
      v-model="value"
      dropdown
      :suggestions="items"
      @complete="search"
      :placeholder="placeholder"
    />
  </div>
</template>

<script setup>
import { ref, defineProps } from 'vue'

const props = defineProps({
  placeholder: {
    type: String,
    default: 'Search product...',
  },
  names: {
    type: Array,
    default: () => [],
  },
})

const value = ref('')
const items = ref([])

const search = event => {
  console.log(props)
  items.value = props.names.filter(name => {
    return name.toLowerCase().indexOf(event.query.toLowerCase()) !== -1
  })
}
</script>
