
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getSession } from '../model/session'
import { useGetUsers, useFilterUsers } from '@/model/users';
import { useRetrievePosts } from '../model/friends'
import Oruga from '@oruga-ui/oruga-next';

const {filterData} = useFilterUsers(); 

let userSelected = ref(false)
let selectedUserEmail = ref('');

const session = getSession()
let friends = ref<Array<{ firstName: string, lastName: string, email: string }>>([]);
let posts = ref<Array<{ firstName: string, lastName: string, email: string, title: string; date: string; duration: string; distance: string, location: string, subject: string }>>([]);

if (session) {
  onMounted(async () => {
    try {
      if (session.user) {
        const result = await useGetUsers().data()
        const simplifiedFriends = await result.map(({ firstName, lastName, email }: { firstName: string, lastName: string, email: string }) => ({ firstName, lastName, email }));
        friends.value = simplifiedFriends

        const res = await useRetrievePosts().data();
        posts.value = res?.posts || [];
      }
    } catch (error) {
      console.error(error);
    }
  });
}

function setSelectedUser(email: string | number) {
  const fullName = String(email);
  selectedUserEmail.value = email as string;
}

let filteredPosts = ref<Array<{ firstName: string, lastName: string, email: string, title: string; date: string; duration: string; distance: string, location: string, subject: string }>>([]);
async function getuserprofile() {
  filteredPosts.value = posts.value.filter((post) => post.email === selectedUserEmail.value);
  selectedUserEmail.value = ''
}

// TEST SEARCH 
import { computed } from "vue";
import { OField, OAutocomplete } from '@oruga-ui/oruga-next'; // Import necessary Oruga components


const name = ref("");
const selected = ref();

const filteredData = ref([]);
const namesArray = computed(() => {
  return filteredData.value.map(({ firstName, lastName }) => `${firstName} ${lastName}`);
});

const doFilter = async () => {
  filteredData.value = await filterData(name.value);
  console.log(namesArray.value);
}
</script>

<template>
  <link rel="stylesheet" href="https://unpkg.com/@oruga-ui/theme-oruga/dist/oruga.min.css" />
  <main columns is-multiline is-centered>
    <div class="column is-full ml-4 mr-4 mt-6">
      <h1 class="title is-3 hometitle">Search for friends!</h1>
      <h2 class="subtitle">
        <div v-if="session.user" class="level-item has-text-centered mt-6">

          <!-- <div v-if="!userSelected">
            <div v-for="friend in friends" :key="friend.email" class="card mb-5">
              <header class="card-header">
                <button class="card-header-title button-style"
                  @click.prevent="setSelectedUser(friend.email); getuserprofile(); userSelected = !userSelected">
                  {{ friend.firstName }} {{ friend.lastName }}
                </button>
              </header>
            </div>
          </div> -->

          <!-- TEST SEARCH -->
          <div v-if="!userSelected">
          <section>
            <o-field label="Search For a User">
              <o-autocomplete v-model="name" rounded expanded placeholder="e.g. Rabbi Plotkin" icon="search" clearable
                open-on-focus :data="namesArray" @select="(option) => {(selected = option); setSelectedUser(option)}" @input="doFilter">
                <template #empty>No results found</template>
              </o-autocomplete>
            </o-field>
            <br><br>
            <p><b>Selected:</b> {{ selected }}</p>
          </section>
        </div>

          <div v-if="userSelected">
            <button class="button-style" @click.prevent="userSelected = !userSelected">
              Go Back
            </button>
            <div class="box" v-for="(activity, index) in filteredPosts.slice().reverse()" :key="index">
              <article class="media">
                <figure class="media-left">
                  <p class="image is-64x64">
                    <img src="https://bulma.io/images/placeholders/128x128.png">
                  </p>
                </figure>
                <div class="media-content">
                  <div class="content">
                    <p class="is-size-5">
                      <strong>{{ activity.firstName }} {{ activity.lastName }}</strong> <small>{{ activity.email
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
              </article>
            </div>
          </div>


        </div>


        <div v-else>
          Please log in to search for your friends.
        </div>
      </h2>
    </div>
  </main>
</template>

<style scoped>
.button-style {
  transform: scale(1);
  /* Default scale */
  color: #3498db;
  /* Default text color */
  transition: transform 0.3s ease;
  /* Smooth transition effect */

  /* Other button styles */
}

.button-style:hover {
  transform: scale(1.1);
  /* Hover scale */
}
@import url('@oruga-ui/theme-oruga/dist/scss/oruga-full.scss');

</style>