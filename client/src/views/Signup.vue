
<script setup lang="ts">
import { ref } from 'vue';
const newTask = ref('');
const tasks = ref([] as string[])

function addTask() {
  tasks.value.push(newTask.value);
  newTask.value = '';
}
</script>

<template>
  <main>
    <h1 class="title">Home</h1>
    <h2 class="subtitle">
      Welcome to ur app
    </h2>

    <nav class="panel">
      <p class="panel-heading">
        To Do
      </p>
      <div class="panel-block">
        <p class="control has-icons-left">
          <input class="input" type="text" placeholder="What do you want to do?" @keypress.enter="addTask"
            v-model="newTask">
          <span class="icon is-left">
            <i class="fas fa-plus" aria-hidden="true"></i>
          </span>
        </p>
      </div>
      <p class="panel-tabs">
        <a class="is-active">All</a>
        <a>Public</a>
        <a>Private</a>
        <a>Sources</a>
        <a>Forks</a>
      </p>

      <label class="panel-block" v-for="task in tasks">
        <input type="checkbox">
        {{ task }}
      </label>

      <a class="panel-block is-active">
        <span class="panel-icon">
          <i class="fas fa-book" aria-hidden="true"></i>
        </span>
        bulma
      </a>
    </nav>

  </main>
</template>
