<script setup lang="ts">
import { ref } from 'vue';
import { getSession, login } from '../model/session'
import Vue from 'vue';

let show = ref(false);

let close = () => {
  show.value = !show.value;
}

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
          <div class="columns is-full">
            <button class="button is-medium is-success is-outlined is-fullwidth" @click="show = !show">Add Workout</button>
          </div>
          <div v-if="show">
            <!-- <WorkoutForm :show="show"/> -->
            <div class="modal is-active">
              <div class="modal-background"></div>
              <div class="modal-card">

                <header class="modal-card-head">
                  <p class="modal-card-title">Add a Workout</p>
                  <button class="delete" @click="show = !show"></button>
                </header>

                <div class="modal-card-body">
                  <div class="field is-flex is-flex-direction-column has-text-left">
                    <label class="label">Title</label>
                    <div class="control">
                      <input class="input" type="text" placeholder="Text input">
                    </div>
                  </div>

                  <div class="field is-flex is-flex-direction-column has-text-left">
                    <label class="label" for="datePicker">Date:</label>
                    <input class="input" type="date" id="datePicker" name="date">
                  </div>

                  <div class="field is-flex is-flex-direction-column has-text-left">
                    <label class="label">Duration</label>
                    <div class="control">
                      <input class="input" type="text" placeholder="Text input">
                    </div>
                  </div>
                  <div class="field is-flex is-flex-direction-column has-text-left">
                    <label class="label">Location</label>
                    <div class="control">
                      <input class="input" type="text" placeholder="Text input">
                    </div>
                  </div>

                  <div class="field is-flex is-flex-direction-column has-text-left">
                    <label class="label">Picture</label>
                    <div class="control">
                      <input class="input" type="text" placeholder="Text input">
                    </div>
                  </div>

                  <div class="field field is-flex is-flex-direction-column has-text-left">
                    <label class="label">Subject</label>
                    <div class="control">
                      <div class="select">
                        <select>
                          <option>Select dropdown</option>
                          <option>Run</option>
                          <option>Bike</option>
                          <option>Walk</option>
                          <option>Cardio</option>
                          <option>Strength</option>

                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <footer class="modal-card-foot">
                  <button class="button is-success">Save changes</button>
                  <button class="button" @click="show = !show">Cancel</button>
                </footer>
              </div>

            </div>
          </div>

          <div class="box mt-4">
            <article class="media">
              <figure class="media-left">
                <p class="image is-64x64">
                  <img src="https://bulma.io/images/placeholders/128x128.png">
                </p>
              </figure>
              <div class="media-content">
                <div class="content">
                  <p>
                    <strong>John Smith</strong> <small>@johnsmith</small> <small>31m</small>
                    <br>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque
                    tortor
                    vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.
                  </p>
                </div>
                <nav class="level is-mobile">
                  <div class="level-left">
                    <a class="level-item">
                      <span class="icon is-small"><i class="fas fa-reply"></i></span>
                    </a>
                    <a class="level-item">
                      <span class="icon is-small"><i class="fas fa-retweet"></i></span>
                    </a>
                    <a class="level-item">
                      <span class="icon is-small"><i class="fas fa-heart"></i></span>
                    </a>
                  </div>
                </nav>
              </div>
              <div class="media-right">
                <button class="delete"></button>
              </div>
            </article>
          </div>
          
        </div>

        <div v-else>
          Please log in to see your activity.
        </div>

      </h2>
    </div>
  </main>
</template>
