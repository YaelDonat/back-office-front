<template>
  <div class="card flex align-items-center justify-content-center">
    <Card style="width: 25em">
      <template #header>
        {{ header }}
      </template>
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
          :v-if="id"
          :to="{ name: 'product', params: { id: id } }"
        >
          <Button
            v-if="btn"
            icon="pi pi-eye"
            label="Détails"
            severity="primary"
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
  </div>
</template>

<script>
export default {
  props: {
    id: Number,
    header: String,
    title: String,
    subtitle: Number,
    content: String,
    availability: Boolean,
    btn: Boolean,
  },
}
</script>

<style>
.p-card {
  border-radius: none;
}
</style>
