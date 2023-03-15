<template>
  <div class="card flex align-items-center justify-content-center">
    <Card style="width: 25em">
      <template #header>
        {{ header }}
      </template>
      <template #title> {{ title }} </template>
      <template #subtitle> {{ subtitle }} </template>
      <template #content>
        <p>
          {{ content }}
        </p>
      </template>
      <template #footer>
        <Button icon="pi pi-check" label="Save" />
        <Button
          icon="pi pi-times"
          label="Cancel"
          severity="secondary"
          style="margin-left: 0.5em"
        />
      </template>
    </Card>
  </div>
</template>

<script>
export default {
  props: {
    header: String,
    title: String,
    subtitle: String,
    content: String,
  },
}
</script>
