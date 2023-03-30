<template :key="pathname">
  <div class="card">
    <Card style="width: max-content">
      <template #header> {{ header }}</template>
      <template #title>
        <div v-if="subtitle > 0">{{ name }} - {{ subtitle }}€</div>
        <div v-else>{{ name }} - {{ price }}€</div>
      </template>
      <template #subtitle v-if="subtitle > 0">
        {{ percent(subtitle, price) }}% de réduction sur cet article !!
      </template>
      <template #content>
        <div style="margin-bottom: -40px">
          <p v-if="content">
            {{ content }}
          </p>
          <p v-else>
            Il n'y a pas de descriptions sur ce produit pour l'instant.
          </p>
        </div>
      </template>
      <template #footer>
        <div
          style="
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          "
        >
          <div class="quantitybutton" style="margin-bottom: 10px">
            <Button icon="pi pi-plus" aria-label="Filter" text @click="add" />
            <Tag
              v-if="availability"
              value="success"
              severity="success"
              style="font-size: 16px; padding: 6px 12px; margin: 0px 5px"
            >
              In stock: {{ quantity }}
            </Tag>
            <Tag
              v-else
              value="danger"
              severity="danger"
              style="font-size: 16px; padding: 6px 12px; margin: 0px 5px"
            >
              Out of stock
            </Tag>
            <Button
              icon="pi pi-minus"
              severity="danger"
              text
              aria-label="Filter"
              @click="substract"
            />
          </div>
          <div class="salebutton">
            <Button
              value="success"
              severity="success"
              style="font-size: 16px; padding: 6px 12px; margin: 0px 5px"
              @click="addDiscount"
            >
              Add discount
            </Button>
            <InputText
              v-if="subtitle > 0"
              v-model.number="unite"
              class="p-mr-2"
              :style="{
                'font-size': '16px',
                padding: '6px 12px',
                margin: '0px 8px',
              }"
              :class="{ 'p-invalid': subtitle < 0 }"
              placeholder="Subtitle"
              type="number"
              min="0"
              max="100"
              step="1"
            />
            <span style="margin-right: 5px" v-if="subtitle > 0">%</span>

            <Button
              v-if="subtitle > 0"
              value="danger"
              severity="danger"
              style="font-size: 16px; padding: 6px 12px; margin: 0px 5px"
              @click="removeSale"
            >
              Remove sale
            </Button>
          </div>
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
  name: { type: String },
  price: { type: Number },
  subtitle: { type: String },
  content: { type: String },
  availability: { type: Boolean },
  sale: { type: Boolean },
  btn: { type: Boolean },
  product: { type: Object },
  quantity: { type: Number },
})
const route = useRoute()
const router = useRouter()
const visible = ref(false)
let unite = ref(props.subtitle)
if (props.product.discount > 0) {
  unite = ref(percent(props.subtitle, props.price))
}

let pathname = ref(route.name)
console.log(unite)
console.log(unite.value)
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
function percent(price, discount) {
  return Math.round(100 - (price / discount) * 100)
}
function add() {
  const payload = {
    id: props.product.id,
    unite: 1,
    update: 'incrementStock',
  }
  store.dispatch('updateStock', payload)
  console.log('incremente')
}
function removeSale() {
  store.dispatch('removeSale', props.product.id)
  console.log('removeSale')
}
function addDiscount() {
  const payload = {
    id: props.product.id,
    unite: Math.round(unite.value),
    update: 'putonsale',
  }
  if (unite.value < 1) {
    payload.unite = 10
  }

  store.dispatch('updateStock', payload)
  console.log('addDiscount ' + Math.round(payload.unite))
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
