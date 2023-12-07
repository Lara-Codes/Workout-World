<script setup lang="ts">
  import { getSession } from '../model/session'
  import { ref } from 'vue';

  const newTask = ref('');
  const tasks = ref([] as {id?: number, text: string, completed: boolean}[]) // question mark makes id optional

  const tabList = ['Current', 'Completed', 'All']
  const tabState = ref('Current');

  function addTask() {
    tasks.value.push({text: newTask.value, completed: false});
    newTask.value = '';
  }

  function shouldDisplay(task: {id?: number, text: string, completed: boolean}){
    return (tabState.value==='Current' && !task.completed) ||
    (tabState.value == 'Completed' && task.completed) ||
    tabState.value == 'All'; 
  }
  const session = getSession()
</script>

<template>
  <main class="columns is-multiline is-centered">
    
    <div class="column is-full ml-3 mr-3 pt-6 pb-6 pl-4 pr-4">
      <h1 class="title is-3 hometitle ml-4">Home</h1>
      <h2 class="subtitle">
        <div v-if="session.user" class="level-item has-text-centered mt-6">
          Welcome to your exercise account, {{ session.user.firstName }} {{ session.user.lastName }}!
          What's on the agenda for today? 
        </div>
        <div v-else>
          Please log in to save your progress. 
        </div>
      </h2>
    </div>

    <div class="column is-half-desktop is-centered">
    <div class="panel">
      <p class="panel-heading has-text-dark todocolor">
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
        <a v-for="tab in tabList" :class="{'is-active': tabState==tab}" @click.prevent="tabState = tab">{{ tab }}</a>
      </p>

      <label class="panel-block" v-for="task in tasks" v-show="shouldDisplay(task)">
        <!-- v-model is 2 way binding -->
        <!-- If task.completed = true, checked. else, unchecked. -->
        <input type="checkbox" v-model="task.completed"> 
        {{ task.text }}
      </label>

      <a class="panel-block is-active">
        <span class="panel-icon">
          <i class="fas fa-book" aria-hidden="true"></i>
        </span>
        bulma
      </a>
    </div>
  </div>
  </main>
</template>

<style scoped>
.todocolor{
  background-color: #00b1d2;
  color: white; 
}
</style>