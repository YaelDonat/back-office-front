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
          v-model="name"
          id="name"
          type="text"
          class="w-full"
          required
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
          v-model="localProduct.category"
          required
        />
      </div>
      <div class="form-input">
        <label class="form-label">Price</label>
        <InputNumber
          :step="0.25"
          showButtons
          v-model="price"
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
          v-model="localProduct.unit"
          required
        />
        <small class="p-error" id="unit-error">{{
          unitErrorMessage || '&nbsp;'
        }}</small>
      </div>
      <div class="form-input">
        <label class="form-label">Availability</label>
        <InputText
          id="availability"
          type="text"
          class="w-full"
          v-model="localProduct.availability"
          required
        />
      </div>
      <div class="form-input">
        <label class="form-label">Sale</label>
        <InputText
          id="sale"
          type="text"
          class="w-full"
          v-model="localProduct.sale"
          required
        />
      </div>
      <div class="form-input">
        <label class="form-label">Discount</label>
        <InputText
          id="discount"
          type="text"
          class="w-full"
          v-model="localProduct.discount"
          required
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
      <div class="form-input">
        <label class="form-label">Owner</label>
        <InputText
          id="owner"
          type="text"
          class="w-full"
          v-model="localProduct.owner"
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

const localProduct = ref(props.product || {})

//Vee VALIDATE
const { handleSubmit, resetForm } = useForm()

const { value: name, errorMessage: nameErrorMessage } = useField(
  'name',
  validateName,
  { initialValue: localProduct.value.name }
)

const { value: price, errorMessage: priceErrorMessage } = useField(
  'price',
  validatePrice,
  { initialValue: localProduct.value.price }
)

const { value: unit, errorMessage: unitErrorMessage } = useField(
  'unit',
  validateUnit,
  { initialValue: localProduct.value.unit }
)

function validateName(value) {
  if (!value) {
    return 'Name - Surname is required.'
  }
  return true
}

function validatePrice(value) {
  if (!value) {
    return 'Price is required.'
  } else if (isNaN(value)) {
    return 'Price must be a number.'
  }

  return true
}

function validateUnit(value) {
  if (!value) {
    return 'Unit is required.'
  }
  return true
}
const toast = useToast()
const onSubmit = handleSubmit(values => {
  if (
    values.name &&
    values.name.length > 0 &&
    values.price != null &&
    values.unit.length > 0
  ) {
    toast.add({
      severity: 'info',
      summary: 'Form Submitted',
      detail: `${values.name} - ${values.price} - ${values.unit}`,
      life: 3000,
    })
    try {
      const payload = {
        id: props.product.id,
        product: localProduct.value,
      }

      store.dispatch('saveProduct', payload)
      console.log('Product saved successfully!')
      this.visible = false
    } catch (error) {
      console.log('Error saving product:', error)
      console.log(props.product.id)
    }
  }
  resetForm()
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
