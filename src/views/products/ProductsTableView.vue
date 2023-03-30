<template>
  <div class="home">
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
        <Column field="id" header="Id" sortable style="width: 25%"></Column>
        <Column field="name" header="Name" sortable style="width: 25%"></Column>
        <Column
          field="category"
          header="Category"
          sortable
          style="width: 25%"
        ></Column>
        <Column
          field="quantityInStock"
          header="Quantity"
          sortable
          style="width: 25%"
        >
          <template #body="slotProps">
            <Inplace
              :closable="true"
              @close="sendQuantityInStock(slotProps.data)"
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
        <Column
          field="discount"
          header="Discount in %"
          sortable
          style="width: max-content; display: flex"
        >
          <template #body="slotProps">
            <Inplace :closable="true" @close="sendDiscount(slotProps.data)">
              <template #display> {{ slotProps.data.discount }} </template>
              <template #content>
                <InputNumber
                  v-model="slotProps.data.discount"
                  inputId="percent"
                  suffix="%"
                />
              </template>
            </Inplace>
          </template>
        </Column>
      </DataTable>
    </main>
  </div>
</template>

<script setup>
import store from '../../store'
import { computed } from 'vue'

const products = computed(() => store.state.products)

const sendDiscount = data => {
  console.table(data)
  console.log('discount: ', data.discount)

  const payload = {
    id: data.id,
    unite: Math.round(data.discount),
    update: 'putonsale',
  }
  if (data.discount == 0) {
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
    unite: Math.round(data.quantityInStock),
    update: 'updateStock',
  }

  store.dispatch('updateStock', payload)
  console.log('Product quantity updated !')
}

const updateAllProducts = () => {
  for (const id in products.value) {
    const product = products.value[id]
    sendQuantityInStock(product)
    sendDiscount(product)
  }
}
console.log('produits: ', products.value.data)
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
  width: min-content;
}
.p-inputtext.p-component.p-inputnumber-input {
  width: 4rem;
  margin-right: 1rem;
}
.p-datatable.p-component.p-datatable-responsive-scroll {
  width: 70%;
}
</style>
