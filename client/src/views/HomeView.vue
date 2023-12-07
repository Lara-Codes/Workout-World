<script setup lang="ts">
  import { getSession } from '../model/session'
  import { ref, onMounted } from 'vue';
  import { useCreate, taskData, useRemove } from '../model/todo'
  const {create} = useCreate()
  const {remove} = useRemove()
  const session = getSession()

  const newTask = ref('');
  const tasks = ref([] as {completed: boolean, description: string}[]) // question mark makes id optional

  const tabList = ['Current', 'Completed', 'All']
  const tabState = ref('Current');

  function shouldDisplay(task: {completed: boolean, description: string}){
    return (tabState.value==='Current' && !task.completed) ||
    (tabState.value == 'Completed' && task.completed) ||
    tabState.value == 'All'; 
  }

  onMounted(async () => {
  try {
    if (session.user) {
      const result = await taskData().data(session.user.email);
      console.log(result.tasks)
      tasks.value = result.tasks
    }
  } catch (error) {
    console.error(error);
  }
});

  const doCreate = async () => {
    if(session.user){
      await create(session.user.email, false, newTask.value)
    }
    tasks.value.push({description: newTask.value, completed: false});
    newTask.value = '';
  }

  const doRemove = async (index: number) => {
    if(session.user){
      await remove(session.user.email, tasks.value[index].description)
    }
    tasks.value.splice(index, 1);
  }

  // const doChangeState = async(index: number)

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
          <input class="input" type="text" placeholder="What do you want to do?" @keypress.enter="doCreate"
            v-model="newTask">
          <span class="icon is-left">
            <i class="fas fa-plus" aria-hidden="true"></i>
          </span>
        </p>
      </div>

      <p class="panel-tabs">
        <a v-for="tab in tabList" :class="{'is-active': tabState==tab}" @click.prevent="tabState = tab">{{ tab }}</a>
      </p>

      <label class="panel-block" v-for="(task, index) in tasks" v-show="shouldDisplay(task)">
        <input type="checkbox" v-model="task.completed"> 
        {{ task.description }}<button class="delete" style="margin-left: auto;" @click.prevent="doRemove(index)"></button>
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