<template>
  <div class="auth-card">
    <div class="login-card">
      <!-- username -->
      <div class="login-input">
        <label>Username</label>
        <InputText id="username" type="text" class="w-full" />
      </div>
      <!-- pwd -->
      <div class="login-input">
        <label>Password</label>
        <InputText id="password" type="password" class="w-full" />
      </div>
      <Button label="Login" icon="pi pi-user" class="w-10rem"></Button>
    </div>
  </div>
</template>

<script setup>
console.log('login')
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
