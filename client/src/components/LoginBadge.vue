<script setup lang="ts">
  import { getSession, useLogin, showError } from '@/model/session'

  const session = getSession()
  const { logout } = useLogin()

  const doLogout = () => {
    logout();
  }

</script>

<template>
  <div class="has-text-right" v-if="session.user">
    Welcome, {{ session.user.firstName }} {{ session.user.lastName }} <br>
    <small>
      Edit User Data 
      <router-link to="/edit" class="button is-small is-light is-warning">
        <span class="icon">
          <i class="fas fa-edit"></i>
        </span>
        </router-link>
    </small>
    <small>
      {{ session.user.email }}
      <router-link to="/home" class="button is-small is-light is-warning" href="#" @click.prevent="doLogout">
        <span class="icon">
          <i class="fas fa-sign-out-alt"></i>
        </span>
        </router-link>
    </small>
  </div>
  
  <div class="buttons" v-else>
    <a class="button is-primary" href="/signup">
      <strong>Sign up</strong>
    </a>
    <a class="button is-light" href="/">
      Log in
    </a>
  </div>
</template>


<style scoped>

</style>