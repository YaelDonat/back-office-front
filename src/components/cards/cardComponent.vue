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

const props = defineProps({
  id: { type: Number },
  header: { type: String },
  title: { type: String },
  subtitle: { type: Number },
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
  console.log(newValue)
  pathname.value = newValue
})

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
