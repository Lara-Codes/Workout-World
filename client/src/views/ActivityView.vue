<script setup lang="ts">
import { ref } from 'vue';
import { getSession } from '../model/session'
import Vue from 'vue';

let show = ref(false);

let close = () => {
  show.value = !show.value;
}
const session = getSession()

const title = ref('')
const date = ref('')
const duration = ref('')
const location = ref('')
const picture = ref('')
const subject = ref('')
const distance = ref('')

const activities = ref([] as { title: string, date: string, duration: string, location: string, picture?: string, subject: string, distance: string }[])

function addActivity() {
  activities.value.push({ title: title.value, date: date.value, duration: duration.value, location: location.value, picture: picture.value, subject: subject.value, distance: distance.value })
  title.value = ''
  date.value = ''
  duration.value = ''
  location.value = ''
  picture.value = ''
  subject.value = ''
  distance.value = ''
}

const remove = (index: number) => {
  const originalIndex = activities.value.length - 1 - index;
  activities.value.splice(originalIndex, 1);
};

</script>

<template>
  <main>

    <h1 class="title is-3 hometitle ml-4 mt-4">Activity</h1>
    <h2 class="subtitle ml-4">

      <div v-if="session.user" class="">
        <div class="mb-5">
          {{ session.user.firstName }} {{ session.user.lastName }}'s Activity
        </div>

        <div v-if="show">
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
                    <input class="input" type="text" placeholder="" v-model="title">
                  </div>
                </div>

                <div class="field is-flex is-flex-direction-column has-text-left">
                  <label class="label" for="datePicker">Date:</label>
                  <input class="input" type="date" id="datePicker" name="date" v-model="date">
                </div>

                <div class="field is-flex is-flex-direction-column has-text-left">
                  <label class="label">Duration</label>
                  <div class="control">
                    <input class="input" type="text" placeholder="" v-model="duration">
                  </div>
                </div>

                <div class="field is-flex is-flex-direction-column has-text-left">
                  <label class="label">Distance</label>
                  <div class="control">
                    <input class="input" type="text" placeholder="Distance in feet" v-model="distance">
                  </div>
                </div>

                <div class="field is-flex is-flex-direction-column has-text-left">
                  <label class="label">Location</label>
                  <div class="control">
                    <input class="input" type="text" placeholder="" v-model="location">
                  </div>
                </div>

                <div class="field is-flex is-flex-direction-column has-text-left">
                  <label class="label">Picture</label>
                  <div class="control">
                    <input class="input" type="text" placeholder="" v-model="picture">
                  </div>
                </div>

                <div class="field field is-flex is-flex-direction-column has-text-left">
                  <label class="label">Subject</label>
                  <div class="control">
                    <div class="select">
                      <select v-model="subject">
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
                <button class="button is-success" @click="addActivity(); show = !show">Save changes</button>
                <button class="button" @click="show = !show">Cancel</button>
              </footer>
            </div>
          </div>
        </div>

        <div class="columns">
          <div class="column is-four-fifths is-offset-1">
        <div v-if="session.user">
          <button class="button is-medium is-info is-fullwidth mb-4" @click="show = !show">
            Add Workout
          </button>
        </div>
        <div class="box" v-for="(activity, index) in activities.slice().reverse()" :key="index">
          <article class="media">
            <figure class="media-left">
              <p class="image is-64x64">
                <img src="https://bulma.io/images/placeholders/128x128.png">
              </p>
            </figure>
            <div class="media-content">
              <div class="content">
                <p class="is-size-5">
                  <strong>{{ session.user.firstName }} {{ session.user.lastName }}</strong> <small>@{{
                    session.user.username }}</small> <small>0m</small>
                  <br>
                  {{ activity.title }}
                </p>
                <div class="columns">
                  <div class="column has-text-centered"
                    style="display: flex; justify-content: space-around; align-items: center;">
                    <div class="title">
                      {{ activity.distance }}
                      <div class="subtitle is-size-7">DISTANCE</div>
                    </div>
                    <div class="title">
                      {{ activity.duration }}
                      <div class="subtitle is-size-7">DURATION</div>
                    </div>
                  </div>
                </div>
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
              <button class="delete" @click="remove(index)"></button>
            </div>
          </article>
        </div>
      </div>
    </div>
  </div>

      <div v-else>
        Please log in to see your activity.
      </div>

    </h2>
  </main>
</template>
