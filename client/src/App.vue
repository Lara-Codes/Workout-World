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
    background-color: azure;
  }

  .container{
    background-color: white;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2); 
    padding: 5px; 
    min-height: 100vh; 
  }
</style>
