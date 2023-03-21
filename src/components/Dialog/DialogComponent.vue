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
    <form id="myForm" @submit="checkForm()">
      <div class="form-input">
        <label class="form-label">Name</label>
        <InputText
          v-model="localProduct.name"
          id="name"
          type="text"
          class="w-full"
          required
        />
      </div>
      <div class="form-input">
        <label class="form-label">Category</label>
        <InputText
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
          v-model="localProduct.price"
          inputId="currencyFr"
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

import { useStore } from 'vuex'

const form = document.getElementById('myForm')
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

const localProduct = ref(props.product)
const store = useStore()

function checkForm(e) {
  this.errors = []

  if (!localProduct.value.name) {
    this.errors.push('Name required.')
  }
  if (!this.email) {
    this.errors.push('Email required.')
  } else if (!this.validEmail(this.email)) {
    this.errors.push('Valid email required.')
  }

  if (!this.errors.length) {
    return true
  }
}

async function onSubmit() {
  try {
    const payload = {
      id: props.product.id,
      product: localProduct.value,
    }

    await store.dispatch('saveProduct', payload)
    console.log('Product saved successfully!')
    this.visible = false

    // eslint-disable-next-line no-undef

    // eslint-disable-next-line no-undef
    //$emit('close', true) // close the dialog after successfully saving the product
  } catch (error) {
    console.log('Error saving product:', error)
    console.log(props.product.id)
  }
}
function isFormValid() {
  const requiredFields = form.value.querySelectorAll('required')
  console.log(requiredFields)
  for (let i = 0; i < requiredFields.length; i++) {
    if (!requiredFields[i].value) {
      return false
    }
  }
  return true
}
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
</style>
