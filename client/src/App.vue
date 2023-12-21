<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'

// import { createApp } from 'vue';
// import Oruga from '@oruga-ui/oruga-next';
// import '@oruga-ui/oruga-next/dist/oruga.css';
// createApp(...).use(Oruga);
</script>

<template>
  <header>
    <NavBar />
    <div class="">
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
    box-shadow: 0px 0px 5px #00000074; 
    padding: 5px; 
    min-height: 100vh; 
  }
</style>
