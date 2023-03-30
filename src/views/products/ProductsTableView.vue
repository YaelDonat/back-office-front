<template>
  <div class="home">
    <Toast />
    <ConfirmDialog></ConfirmDialog>
    <main style="margin-top: 2rem">
      <DataTable
        :value="products.data"
        removableSort
        tableStyle="min-width: 100vh"
        paginator
        :rows="10"
        :rowsPerPageOptions="[5, 10, 20, 50]"
      >
        <template #header>
          <div class="data-header">
            <span class="header-title">Products</span>
            <Button label="Update All" @click="updateAllProducts" />
          </div>
        </template>
        <Column
          field="id"
          header="Id"
          sortable
          style="width: min-content"
        ></Column>
        <Column
          field="name"
          header="Name"
          sortable
          style="width: min-content"
        ></Column>
        <Column
          field="category"
          header="Category"
          sortable
          style="width: min-content"
        ></Column>
        <Column
          field="price"
          header="Price"
          sortable
          style="width: min-content"
        ></Column>
        <Column field="discountpercent" header="Discount in %" sortable>
          <template #body="slotProps">
            {{ setDiscountPercent(slotProps.data) }}
            <Inplace
              :closable="true"
              @close="
                addProduct({
                  ...slotProps.data,
                  discountPercent: discountPercent,
                })
              "
              @open="setDiscountPercent(slotProps.data)"
            >
              <template #display>
                {{
                  discountPercent !== null
                    ? discountPercent + ' %'
                    : slotProps.data.discount
                }}
              </template>
              <template #content>
                <InputNumber
                  v-model="discountPercent"
                  inputId="percent"
                  suffix="%"
                />
              </template>
            </Inplace>
          </template>
        </Column>
        <Column
          field="discount"
          header="Discount price"
          sortable
          style="width: min-content"
        ></Column>
        <template #body="slotProps">
          <p>{{ slotProps.data.discount }} €</p>
        </template>
        <Column
          field="quantityInStock"
          header="Quantity"
          sortable
          style="width: max-content"
        >
          <template #body="slotProps">
            <Inplace
              :closable="true"
              @close="
                addProduct({
                  ...slotProps.data,
                  discountPercent: discountPercent,
                })
              "
            >
              <template #display>
                {{ slotProps.data.quantityInStock }}
              </template>
              <template #content>
                <InputNumber v-model="slotProps.data.quantityInStock" />
              </template>
            </Inplace>
          </template>
        </Column>
        <Column field="delete" header="Delete" style="width: min-content">
          <template #body="slotProps">
            <Button severity="danger" @click="deleteProduct(slotProps.data.id)"
              >Delete</Button
            >
          </template>
        </Column>
        <template #footer>
          In total there are
          {{ products.data ? products.data.length : 0 }} products.
        </template>
      </DataTable>
    </main>
  </div>
</template>

<script setup>
import store from '../../store'
import { computed, ref } from 'vue'
import { useConfirm } from 'primevue/useconfirm'
import { useToast } from 'primevue/usetoast'

const confirm = useConfirm()
const toast = useToast()

const products = computed(() => store.state.products)
const productsArray = ref([])
// const productsDiscount = ref([])
let discountPercent = null

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

const addProduct = data => {
  // console.log('data', data)
  const existingProductIndex = productsArray.value.findIndex(
    product => product.id === data.id
  )
  if (existingProductIndex !== -1) {
    // Le produit existe déjà, on le remplace
    productsArray.value.splice(existingProductIndex, 1, data)
  } else {
    // Le produit n'existe pas encore, on l'ajoute
    productsArray.value.push(data)
  }
  console.log(productsArray.value)
}

const setDiscountPercent = data => {
  discountPercent = calculateDiscountPercentage(data)
}

const calculateDiscountPercentage = data => {
  let discountPercentage = null
  if (data.discount == 0) return 0
  if (data && data.price && data.discount) {
    discountPercentage = Math.abs(100 - (data.price / data.discount) * 100)
    return Math.floor(discountPercentage)
  }
  return null
}

const sendDiscount = data => {
  console.table('data discount:', data)
  console.log('discount: ', parseInt(data.discountPercent))

  const payload = {
    id: data.id,
    unite: Math.floor(parseInt(data.discountPercent)),
    update: 'putonsale',
  }
  if (data.discountPercent == 0) {
    store.dispatch('removeSale', payload.id)
    console.log('remove from sale')
  } else {
    store.dispatch('updateStock', payload)
    console.log('addDiscount ' + Math.round(payload.unite))
  }
}

const sendQuantityInStock = data => {
  console.log('quantityInStock: ', data.quantityInStock)
  // Envoyer la requête avec la valeur de data.quantityInStock
  const payload = {
    id: data.id,
    unite: Math.floor(data.quantityInStock),
    update: 'updateStock',
  }

  store.dispatch('updateStock', payload)
  console.log('Product quantity updated !')
}

const updateAllProducts = () => {
  for (const id in productsArray.value) {
    const product = productsArray.value[id]
    sendQuantityInStock(product)
    sendDiscount(product)
  }
  window.location.reload()
}
console.log('produits: ', productsArray.value.data)
store.dispatch('getProducts')
</script>

<style>
.data-header {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 2;
}
.header-title {
  font-size: 2em;
}
.p-inputnumber {
  width: max-content;
}
.p-inputtext.p-component.p-inputnumber-input {
  width: 4rem;
  margin-right: 1rem;
}
.p-datatable.p-component.p-datatable-responsive-scroll {
  width: 70%;
}
</style>
