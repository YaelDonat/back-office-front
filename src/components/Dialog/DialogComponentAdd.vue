<template>
  <Dialog
    :visible="visible"
    @update:visible="value => $emit('close', value)"
    modal
    header="Edit form"
    :style="{ width: '50vw' }"
    @hide="onClose"
  >
    <!-- Content -->
    <form id="myForm" @submit="onSubmit">
      <div class="form-input">
        <label class="form-label">Name</label>
        <InputText
          id="name"
          type="text"
          class="w-full"
          required
          v-model="localProduct.name"
        />
        <small class="p-error" id="name-error">{{
          nameErrorMessage || '&nbsp;'
        }}</small>
      </div>
      <div class="form-input">
        <label class="form-label">Category</label>
        <InputNumber
          mode="decimal"
          showButtons
          decrementButtonclass="p-button-danger"
          incrementButtonclass="p-button-success"
          incrementButtonIcon="pi pi-plus"
          decrementButtonIcon="pi pi-minus"
          :min="0"
          :max="2"
          id="category"
          type="text"
          class="w-full"
          required
          v-model="localProduct.category"
        />
      </div>
      <div class="form-input">
        <label class="form-label">Price</label>
        <InputNumber
          :step="0.25"
          showButtons
          inputId="currencyFr"
          decrementButtonclass="p-button-danger"
          incrementButtonclass="p-button-success"
          incrementButtonIcon="pi pi-plus"
          decrementButtonIcon="pi pi-minus"
          :minFractionDigits="2"
          :maxFractionDigits="5"
          mode="currency"
          currency="EUR"
          locale="fr-FR"
          id="price"
          type="text"
          class="w-full"
          required
          v-model="localProduct.price"
        />
        <small class="p-error" id="name-error">{{
          priceErrorMessage || '&nbsp;'
        }}</small>
      </div>
      <div class="form-input">
        <label class="form-label">Unit</label>
        <InputText
          id="unit"
          type="text"
          class="w-full"
          required
          v-model="localProduct.unit"
        />
        <small class="p-error" id="unit-error">{{
          unitErrorMessage || '&nbsp;'
        }}</small>
      </div>
      <div class="form-input">
        <label class="form-label">Discount</label>
        <InputText
          id="discount"
          type="text"
          class="w-full"
          required
          v-model="localProduct.discount"
        />
      </div>
      <div class="form-input">
        <label class="form-label">Comments</label>
        <InputText
          id="comments"
          type="text"
          class="w-full"
          v-model="localProduct.comments"
        />
      </div>
    </form>
    <!-- End Content -->
    <template #footer>
      <Button
        label="Cancel"
        icon="pi pi-times"
        @click="$emit('close', false)"
        text
      />
      <Button
        label="Save"
        icon="pi pi-check"
        @click="
          () => {
            onSubmit()
          }
        "
        autofocus
      />
    </template>
  </Dialog>
</template>

<script setup>
import { defineProps, ref } from 'vue'
import { useToast } from 'primevue/usetoast'
import { useField, useForm } from 'vee-validate'
import store from '../../store'

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  onClose: {
    type: Function,
  },
  product: {
    type: Object,
    required: true,
  },
})

const localProduct = ref({
  name: '',
  category: 0,
  price: 0.0,
  unit: '',
  discount: 0.0,
  comments: '',
  quantityInStock: 0,
})

//Vee VALIDATE
const { handleSubmit, resetForm } = useForm()

const toast = useToast()
const onSubmit = handleSubmit(values => {
  store.dispatch('addProduct', localProduct.value)
  toast.add({
    severity: 'success',
    summary: 'Created !',
    detail: 'Product created successfully!',
    life: 3000,
  })
  this.visible = false
  window.location.reload()
})
//Vee VALIDATE
</script>

<style>
.form-input {
  display: flex;
  align-items: center;
  gap: 2em;
  margin-bottom: 0.5rem;
}
.form-label {
  display: inline-block;
  width: 100px;
  margin-right: 1em;
}
.form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.p-error {
  color: red;
  font-weight: bold;
}
</style>
