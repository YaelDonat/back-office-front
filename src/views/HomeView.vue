<template>
  <div class="home">
    <main>
      <div class="randomimage">
        <img :src="getRandomImage()" alt="Random Image" />
      </div>
    </main>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HomeView',
  components: {},
  data() {
    return {
      currentImageKey: null,
    }
  },
  methods: {
    getRandomImage() {
      const images = require.context('../assets/Home-pictures', false)
      const keys = images.keys()
      let randomKey = keys[Math.floor(Math.random() * keys.length)]
      while (randomKey === this.currentImageKey) {
        randomKey = keys[Math.floor(Math.random() * keys.length)]
      }
      this.currentImageKey = randomKey
      return images(randomKey)
    },
  },
})
</script>

<style>
.home {
  overflow: hidden;
}

body {
  overflow-x: hidden;
}

main {
  display: flex;
  justify-content: center;
  flex-direction: column;
  overflow-y: hidden;
}

.randomimage {
  padding-top: 2%;
  background-size: cover;
  height: auto;
  max-width: 100%;
  background: center;
  background-size: cover 50% 50%;
}
</style>
