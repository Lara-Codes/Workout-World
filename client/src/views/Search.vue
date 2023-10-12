
<script setup lang="ts">
import { ref } from 'vue';
import { getSession, login } from '../model/session'
const newTask = ref('');
const tasks = ref([] as string[])

function addTask() {
  tasks.value.push(newTask.value);
  newTask.value = '';
}

const session = getSession()
</script>

<template>
  <main columns is-multiline is-centered>
    <div class="column is-full ml-3 mr-3 pt-6 pb-6 pl-4 pr-4">
      <h1 class="title is-3 hometitle">Search for friends!</h1>
      <h2 class="subtitle">
        <div v-if="session.user" class="level-item has-text-centered mt-6"> 
        </div>
        <div v-else>
          Please log in to search for your friends.
        </div>
      </h2>
    </div>
  </main>
</template>
