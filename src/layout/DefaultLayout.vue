<template>
  <headerComponent />
  <router-view></router-view>
  <footer><img src="@/assets/footer-page.png" /></footer>
</template>

<script>
import { defineComponent } from 'vue'
import headerComponent from '../components/nav/headerComponent'

export default defineComponent({
  name: 'DefaultLayout',
  components: { headerComponent },
})
</script>
