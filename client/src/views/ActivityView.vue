<script setup lang="ts">
import { ref } from 'vue';
import { getSession, login } from '../model/session'
import WorkoutForm from '../components/WorkoutForm.vue';
import Vue from 'vue';

let show = ref(false);
const session = getSession()

</script>

<template>
  <main columns is-multiline is-centered>
    <div class="column is-full ml-3 mr-3 pt-6 pb-6 pl-4 pr-4">
      <h1 class="title is-3 hometitle">Activity</h1>
      <h2 class="subtitle">

        <div v-if="session.user" class="level-item has-text-centered mt-6 is-flex is-flex-direction-column">
          <div class="mb-5">
            {{ session.user.firstName }} {{ session.user.lastName }}'s Activity
          </div>
          <div>
            <button class="button is-medium is-fullwidth" @click="show = !show">Add Workout</button>
          </div>
          <div v-if="show">
            <WorkoutForm :show="show"/>
          </div>
          <div v-else>
          </div>
        </div>

        <div v-else>
          Please log in to see your activity.
        </div>

      </h2>
    </div>
  </main>
</template>
