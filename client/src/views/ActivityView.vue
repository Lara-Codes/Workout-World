<script setup lang="ts">
import { ref, computed } from 'vue';
import { getSession } from '../model/session'
import { calculateDistance } from '../model/stats'
import Friends from './Friends.vue';
import { type Activity, addActivity, activities, remove, edit } from '../model/activities'

let show = ref(false);
let close = () => {
  show.value = !show.value;
}

const session = getSession()
let userid = 0;
if (session.user) {
  userid = session.user.id;
}

const formData = ref({
  title: '',
  date: '',
  duration: '',
  location: '',
  picture: '',
  subject: '',
  distance: 0,
  userid: session.user.id,
  firstname: session.user.firstName,
  lastname: session.user.lastName,
  username: session.user.username
});

function addNewActivity() {
  const newActivity = {
    title: formData.value.title,
    date: formData.value.date,
    duration: formData.value.duration,
    location: formData.value.location,
    picture: formData.value.picture,
    subject: formData.value.subject,
    distance: formData.value.distance,
    userid: session.user.id,
    firstname: session.user.firstName,
    lastname: session.user.lastName,
    username: session.user.username
  };
  addActivity(newActivity)
}

function resetValues() {
  formData.value.title = '';
  formData.value.date = '';
  formData.value.duration = '';
  formData.value.location = '';
  formData.value.picture = '';
  formData.value.subject = '';
  formData.value.distance = 0; // Reset distance as needed
}

const doCalculation = () => {
  calculateDistance(formData.value.distance);
}

const myActivities = computed(() =>
  activities.value.filter((activity) => activity.userid === userid)
);

const editingIndex = ref(-1);
const editingData = ref({ title: '', date: '', duration: '', location: '', picture: '', subject: '', distance: 0 });

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
                    <input class="input" type="text" placeholder="" v-model="formData.title">
                  </div>
                </div>

                <div class="field is-flex is-flex-direction-column has-text-left">
                  <label class="label" for="datePicker">Date:</label>
                  <input class="input" type="date" id="datePicker" name="date" v-model="formData.date">
                </div>

                <div class="field is-flex is-flex-direction-column has-text-left">
                  <label class="label">Duration</label>
                  <div class="control">
                    <input class="input" type="text" placeholder="" v-model="formData.duration">
                  </div>
                </div>

                <div class="field is-flex is-flex-direction-column has-text-left">
                  <label class="label">Distance</label>
                  <div class="control">
                    <input class="input" type="number" placeholder="Distance in feet" v-model="formData.distance">
                  </div>
                </div>

                <div class="field is-flex is-flex-direction-column has-text-left">
                  <label class="label">Location</label>
                  <div class="control">
                    <input class="input" type="text" placeholder="" v-model="formData.location">
                  </div>
                </div>

                <div class="field is-flex is-flex-direction-column has-text-left">
                  <label class="label">Picture</label>
                  <div class="control">
                    <input class="input" type="text" placeholder="" v-model="formData.picture">
                  </div>
                </div>

                <div class="field field is-flex is-flex-direction-column has-text-left">
                  <label class="label">Subject</label>
                  <div class="control">
                    <div class="select">
                      <select v-model="formData.subject">
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
                <button class="button is-success"
                  @click.prevent="doCalculation(); addNewActivity(); show = !show; resetValues()">Save
                  changes</button>
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

            <div class="box" v-for="(activity, index) in myActivities.slice().reverse()" :key="index">
              <article class="media">
                <figure class="media-left">
                  <p class="image is-64x64">
                    <img src="https://bulma.io/images/placeholders/128x128.png">
                  </p>
                </figure>
                <div class="media-content">
                  <div class="content">
                    <p class="is-size-5">
                      <!-- <strong>{{ session.user.firstName }} {{ session.user.lastName }}</strong> <small>@{{
                        session.user.username }}</small>  -->
                      <strong>{{ activity.firstname }} {{ activity.lastname }}</strong> <small>{{ activity.username
                      }}</small><br>

                      <small>0m</small>
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
                  <button class="button is-info is-small edit" @click="edit(index)">Edit</button>
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

<style scoped>
.edit {
  margin: .5rem;
}
</style>
