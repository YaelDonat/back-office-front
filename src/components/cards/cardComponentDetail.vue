<template :key="pathname">
  <div class="card">
    <Card style="width: 25em">
      <template #header> {{ header }}</template>
      <template #title> {{ title }} </template>
      <template #subtitle v-if="subtitle > 0">
        {{ subtitle }} % de réduction sur cet article !!
      </template>
      <template #content>
        <p v-if="content">
          {{ content }}
        </p>
        <p v-else>
          Il n'y a pas de descriptions sur ce produit pour l'instant.
        </p>
      </template>
      <template #footer>
        <div style="display: flex; justify-content: center">
          <Button
            icon="pi pi-plus"
            aria-label="Filter"
            text
            @click="
              () => {
                add()
              }
            "
          />
          <Tag v-if="availability" value="success" severity="success">
            In stocks : {{ quantity }}
          </Tag>

          <Tag v-else value="danger" severity="danger"> Out of stocks </Tag>

          <Button
            icon="pi pi-minus"
            severity="danger"
            text
            aria-label="Filter"
            @click="
              () => {
                substract()
              }
            "
          />
        </div>
      </template>
    </Card>
    <!-- DIALOG -->
    <DialogComponent
      :visible="visible"
      :onClose="closeDialog"
      :product="product"
    />
    <!-- DIALOG -->
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { ref, watch, defineProps } from 'vue'
import DialogComponent from '../Dialog/DialogComponent'
import store from '../../store'

const props = defineProps({
  id: { type: Number },
  header: { type: String },
  title: { type: String },
  subtitle: { type: String },
  content: { type: String },
  availability: { type: Boolean },
  btn: { type: Boolean },
  product: { type: Object },
  quantity: { type: Number },
})
const route = useRoute()
const router = useRouter()
const visible = ref(false)

let pathname = ref(route.name)

router.afterEach((to, from) => {
  pathname.value = to.name
})

watch(pathname, (newValue, oldValue) => {
  pathname.value = newValue
})

// Observer le changement de la propriété 'id' de l'objet route.params
watch(
  () => route.params.id,
  (newVal, oldVal) => {
    if (newVal !== oldVal && newVal) {
      store.dispatch('getProduct', newVal)
    }
  }
)
function add() {
  const payload = {
    id: props.product.id,
    unite: 1,
    update: 'incrementStock',
  }
  store.dispatch('updateStock', payload)
  console.log('incremente')
}
function substract() {
  const payload = {
    id: props.product.id,
    unite: 1,
    update: 'decrementStock',
  }
  store.dispatch('updateStock', payload)
  console.log('decremente')
}
function openDialog() {
  visible.value = true
}

function closeDialog() {
  visible.value = false
}
</script>

<style>
.p-card {
  border-radius: none;
}
</style>
