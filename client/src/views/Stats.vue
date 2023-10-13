
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
      <h1 class="title is-3 hometitle">Stats</h1>
      <h2 class="subtitle">
        <div v-if="session.user" class="">

          <div class="title is-flex is-flex-direction-column level-item has-text-centered mt-6 has-text-info">
            {{ session.user.firstName }} {{ session.user.lastName }}'s Statistics
          </div>

          <div class="columns is-multiline">
            <div class="column box mt-4 is-three-fifths is-offset-one-fifth">
              <p class="bd-notification is-info level-item has-text-centered mb-4 title">Today</p>

              <div class="columns is-mobile level-item has-text-centered is-multiline">
                <div class="column">
                  <div class="bd-notification is-info is-half">
                    <h1 class="title is-1 has-text-info">0ft</h1>
                    <caption class="caption">Distance</caption>
                  </div>
                </div>
                <div class="column">
                  <div class="bd-notification is-info is-half">
                    <h1 class="title is-1 has-text-info	">0:0</h1>
                    <caption class="caption">Duration</caption>
                  </div>
                </div>

              </div>
              <div class="columns is-mobile level-item has-text-centered is-multiline">
                <div class="column">
                  <div class="bd-notification is-info is-half">
                    <h1 class="title is-1 is-spaced has-text-info">NaN mph</h1>
                    <caption class="caption subtitle is-6">Avg. Pace</caption>
                  </div>
                </div>

                <div class="column">
                  <div class="bd-notification is-info is-half">
                    <h1 class="title is-1 is-spaced has-text-info	">0</h1>
                    <caption class="caption subtitle is-6">Calories</caption>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="columns is-multiline">
            <div class="column box mt-4 is-three-fifths is-offset-one-fifth">
              <p class="bd-notification is-info level-item has-text-centered mb-4 title">This Week</p>

              <div class="columns is-mobile level-item has-text-centered is-multiline">
                <div class="column">
                  <div class="bd-notification is-info is-half">
                    <h1 class="title is-1 has-text-info">0ft</h1>
                    <caption class="caption">Distance</caption>
                  </div>
                </div>
                <div class="column">
                  <div class="bd-notification is-info is-half">
                    <h1 class="title is-1 has-text-info	">0:0</h1>
                    <caption class="caption">Duration</caption>
                  </div>
                </div>

              </div>
              <div class="columns is-mobile level-item has-text-centered is-multiline">
                <div class="column">
                  <div class="bd-notification is-info is-half">
                    <h1 class="title is-1 is-spaced has-text-info">NaN mph</h1>
                    <caption class="caption subtitle is-6">Avg. Pace</caption>
                  </div>
                </div>

                <div class="column">
                  <div class="bd-notification is-info is-half">
                    <h1 class="title is-1 is-spaced has-text-info	">0</h1>
                    <caption class="caption subtitle is-6">Calories</caption>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="columns is-multiline">
            <div class="column box mt-4 is-three-fifths is-offset-one-fifth">
              <p class="bd-notification is-info level-item has-text-centered mb-4 title">All Time</p>

              <div class="columns is-mobile level-item has-text-centered is-multiline">
                <div class="column">
                  <div class="bd-notification is-info is-half">
                    <h1 class="title is-1 has-text-info">0ft</h1>
                    <caption class="caption">Distance</caption>
                  </div>
                </div>
                <div class="column">
                  <div class="bd-notification is-info is-half">
                    <h1 class="title is-1 has-text-info	">0:0</h1>
                    <caption class="caption">Duration</caption>
                  </div>
                </div>

              </div>
              <div class="columns is-mobile level-item has-text-centered is-multiline">
                <div class="column">
                  <div class="bd-notification is-info is-half">
                    <h1 class="title is-1 is-spaced has-text-info">NaN mph</h1>
                    <caption class="caption subtitle is-6">Avg. Pace</caption>
                  </div>
                </div>

                <div class="column">
                  <div class="bd-notification is-info is-half">
                    <h1 class="title is-1 is-spaced has-text-info	">0</h1>
                    <caption class="caption subtitle is-6">Calories</caption>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>


        <div v-else>
          Please log in to see your statistics.
        </div>
      </h2>
    </div>
  </main>
</template>
