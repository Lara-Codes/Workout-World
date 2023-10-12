<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
</script>

<template>
  <header>
    <NavBar />
    <div class="container">
      <RouterView />
    </div>
  </header>

</template>

<style scoped>
  body{
    background-color: rgb(169, 255, 255);
  }

  .container{
    background-color: hsl(0, 0%, 100%);
    box-shadow: 0px 0px 2px #0096b0; 
    padding: 5px; 
    min-height: 100vh; 
  }
</style>
