<template>
  <Dialog
    :visible="visible"
    @update:visible="value => $emit('close', value)"
    modal
    header="Header"
    :style="{ width: '50vw' }"
    @hide="onClose"
  >
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum.
    </p>
    <template #footer>
      <Button
        label="No"
        icon="pi pi-times"
        @click="$emit('update:visible', false)"
        text
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        @click="$emit('update:visible', false)"
        autofocus
      />
    </template>
  </Dialog>
</template>

<script setup>
import { ref, defineProps } from 'vue'

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  onClose: {
    type: Function,
  },
})

let show = ref(props.visible)

const closeDialog = state => {
  show.value = state
}
</script>
