<template :key="pathname">
  <Toast />
  <ConfirmDialog></ConfirmDialog>
  <div class="card">
    <Card style="width: 25em">
      <template #header> {{ header }}</template>
      <template #title> {{ title }} </template>
      <template #subtitle v-if="subtitle > 0">
        {{ percent(subtitle, price) }}% de réduction sur cet article !!
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
        <router-link
          style="text-decoration: none; color: inherit"
          v-if="id && pathname === 'products'"
          :to="{ name: 'product', params: { id: id } }"
        >
          <Button
            v-if="btn"
            icon="pi pi-eye"
            label="Détails"
            severity="primary"
          />
        </router-link>
        <Button
          v-if="pathname === 'products'"
          severity="danger"
          icon="pi pi-trash"
          @click="deleteProduct(id)"
          style="margin-left: 0.5rem"
        ></Button>
        <Button
          v-if="pathname === 'products-edit'"
          icon="pi pi-pencil"
          label="edit"
          severity="primary"
          @click="openDialog()"
        />
        <router-link
          style="text-decoration: none; color: inherit"
          v-if="id && pathname === 'products'"
          :to="{ name: 'products-edit' }"
        >
          <Button
            icon="pi pi-pencil"
            severity="primary"
            style="margin-left: 0.5em"
          />
        </router-link>
        <Tag
          v-if="availability"
          value="success"
          style="margin-left: 0.5em"
          severity="success"
        >
          In stocks
        </Tag>
        <Tag v-else value="danger" style="margin-left: 0.5em" severity="danger">
          Out of stocks
        </Tag>
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
import { useConfirm } from 'primevue/useconfirm'
import { useToast } from 'primevue/usetoast'

const confirm = useConfirm()
const toast = useToast()

const props = defineProps({
  id: { type: Number },
  header: { type: String },
  title: { type: String },
  price: { type: Number },
  subtitle: { type: String },
  content: { type: String },
  availability: { type: Boolean },
  btn: { type: Boolean },
  product: { type: Object },
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

const deleteProduct = productId => {
  //delete methode here
  confirm.require({
    message: 'Are you sure you want to delete this product?',
    header: 'Confirmation',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      store.dispatch('deleteProduct', productId)
      toast.add({
        severity: 'info',
        summary: 'Confirmed',
        detail: 'You have accepted to delete this product',
        life: 3000,
      })
      window.location.reload()
    },
    reject: () => {
      toast.add({
        severity: 'error',
        summary: 'Rejected',
        detail: 'You have rejected to delete this product',
        life: 3000,
      })
    },
  })
}
// Observer le changement de la propriété 'id' de l'objet route.params
/*watch(
  () => route.params.id,
  (newVal, oldVal) => {
    if (newVal !== oldVal) {
      store.dispatch('getProduct', newVal)
    }
  }
)*/
function percent(price, discount) {
  return Math.round(100 - (price / discount) * 100)
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
