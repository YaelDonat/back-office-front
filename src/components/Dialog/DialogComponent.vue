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
    <div class="form">
      <div class="form-input">
        <label class="form-label">Name</label>
        <InputText
          v-model="localProduct.name"
          id="name"
          type="text"
          class="w-full"
        />
      </div>
      <div class="form-input">
        <label class="form-label">Category</label>
        <InputText
          id="category"
          type="text"
          class="w-full"
          v-model="localProduct.category"
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
        />
      </div>
      <div class="form-input">
        <label class="form-label">Unit</label>
        <InputText
          id="unit"
          type="text"
          class="w-full"
          v-model="localProduct.unit"
        />
      </div>
      <div class="form-input">
        <label class="form-label">Availability</label>
        <InputText
          id="availability"
          type="text"
          class="w-full"
          v-model="localProduct.availability"
        />
      </div>
      <div class="form-input">
        <label class="form-label">Sale</label>
        <InputText
          id="sale"
          type="text"
          class="w-full"
          v-model="localProduct.sale"
        />
      </div>
      <div class="form-input">
        <label class="form-label">Discount</label>
        <InputText
          id="discount"
          type="text"
          class="w-full"
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
      <div class="form-input">
        <label class="form-label">Owner</label>
        <InputText
          id="owner"
          type="text"
          class="w-full"
          v-model="localProduct.owner"
        />
      </div>
    </div>
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
        @click="$emit('close', false)"
        autofocus
      />
    </template>
  </Dialog>
</template>

<script setup>
import { defineProps, ref } from 'vue'

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
