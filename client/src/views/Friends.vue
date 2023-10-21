<script setup lang="ts">
import { ref } from 'vue';
import { getSession } from '../model/session'
import { calculateDistance } from '../model/stats'
import Friends from './Friends.vue';
import { type Activity, addActivity, activities, remove } from '../model/activities'

let show = ref(false);
let close = () => {
  show.value = !show.value;
}
const session = getSession()

</script>

<template>
  <main>
    <h1 class="title is-3 hometitle ml-4 mt-4">Activity</h1>
    <h2 class="subtitle ml-4">

      <div v-if="session.user" class="">
        <div class="mb-5">
          Friend's Activity
        </div>

        <div class="columns">
          <div class="column is-four-fifths is-offset-1">
            <div v-if="session.user">
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
                      <!-- <strong>{{ session.user.firstName }} {{ session.user.lastName }}</strong> <small>@{{
                        session.user.username }}</small>  -->
                        <strong>{{ activity.firstname }} {{ activity.lastname }}</strong>   <small>{{ activity.username }}</small><br>
                        
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
