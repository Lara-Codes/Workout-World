<script setup lang="ts">
  import { getSession } from '../model/session'
  import { ref, onMounted } from 'vue';
  import { type Task, useCreate, taskData, useRemove, useEditState, useEditDescription} from '../model/todo'
  const {create} = useCreate()
  const {remove} = useRemove()
  const {editState} = useEditState()
  const {editDescription} = useEditDescription()
  const session = getSession()
  let show = ref(false);
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

  const doChangeState = async(index: number, task: Task) => {
    if(!task.completed){
      tasks.value[index].completed = false 
    }else{
      tasks.value[index].completed = true 
    }
    if(session.user){
      await editState(session.user.email, tasks.value[index])
    }
  }

  const description = ref('')
  const currIndex = ref<number>(0);

  const newDescription = ref('')
  const doEditDescription = async() => {
    tasks.value[currIndex.value].description = newDescription.value
    if(session.user){
      await editDescription(session.user.email, description.value, newDescription.value)
    }
    newDescription.value=''
  } 

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
        <input type="checkbox" v-model="task.completed" @change="doChangeState(index, task)"> 
        {{ task.description }}
        <div class="task-container">
        <button class="edit" style="margin-left: auto;" @click.prevent="description = task.description; currIndex = index; show=!show">Edit</button>
        <button class="delete" style="margin-left: auto;" @click.prevent="doRemove(index)"></button>
        </div>
      </label>

      <a class="panel-block is-active">
        <span class="panel-icon">
          <i class="fas fa-book" aria-hidden="true"></i>
        </span>
        bulma
      </a>
    </div>
  </div>

    <div v-if="show">
          <div class="modal is-active">
            <div class="modal-background"></div>
            <div class="modal-card">

              <header class="modal-card-head">
                <p class="modal-card-title">Edit description</p>
                <button class="delete" @click="show = !show"></button>
              </header>

              <div class="modal-card-body">

                <div class="field is-flex is-flex-direction-column has-text-left">
                  <label class="label">Description</label>
                  <div class="control">
                    <input class="input" type="text" :placeholder=description v-model="newDescription">
                  </div>
                </div>
              <footer class="modal-card-foot">
                <button class="button is-success" @click.prevent="doEditDescription(); show=!show">Save
                  changes</button>
                <button class="button" @click="show = !show; description=''">Cancel</button>
              </footer>
            </div>
          </div>
        </div>
      </div>

  </main>
</template>

<style scoped>
.todocolor{
  background-color: #00b1d2;
  color: white; 
}

.task-container {
  display: flex;
  margin-left: auto;
  justify-content: space-between;
  align-items: center;
}
</style>