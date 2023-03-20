<template>
  <form class="auth-card" @submit="login">
    <div class="login-card">
      <!-- username -->
      <div class="login-input">
        <label>Username</label>
        <InputText
          id="username"
          type="text"
          class="w-full"
          v-model="user.username"
        />
      </div>
      <!-- pwd -->
      <div class="login-input">
        <label>Password</label>
        <InputText
          id="password"
          type="password"
          class="w-full"
          v-model="user.password"
        />
      </div>
      <Button
        label="Login"
        icon="pi pi-user"
        class="w-10rem"
        type="submit"
      ></Button>
    </div>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import store from '../../store'

const router = useRouter()
const errorMessage = ref('')
const user = {
  username: '',
  password: '',
}

function login(event) {
  event.preventDefault()

  store
    .dispatch('login', user)
    .then(() => {
      router.go({ name: 'home' })
    })
    .catch(err => {
      console.log(err)
      errorMessage.value = err.response.data.error
    })
}
</script>

<style>
.auth-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  height: 100vh;
  border-radius: 10px;
  margin-bottom: 1rem;
}
.login-card {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3em;
  padding: 0rem 5rem;
}
.login-input {
  display: flex;
  align-items: center;
  gap: 2em;
}
</style>
