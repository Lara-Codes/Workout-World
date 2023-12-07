<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getSession } from '../model/session'
import { useRetrievePosts } from '../model/friends'

const session = getSession()
let posts = ref<Array<{ firstName: string, lastName: string, email: string, title: string; date: string; duration: string; distance: string, location: string, subject: string }>>([]);
  onMounted(async () => {
  try {
    if (session.user) {
      const result = await useRetrievePosts().data();
      posts.value = result.posts
    }
  } catch (error) {
    console.error(error);
  }
});


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


            <div class="box" v-for="(activity, index) in posts.slice().reverse()" :key="index">
              <article class="media">
                <figure class="media-left">
                  <p class="image is-64x64">
                    <img src="https://bulma.io/images/placeholders/128x128.png">
                  </p>
                </figure>
                <div class="media-content">
                  <div class="content">
                    <p class="is-size-5">
                        <strong>{{ activity.firstName }} {{ activity.lastName }}</strong>   <small>{{ activity.email }}</small><br>
                        
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
