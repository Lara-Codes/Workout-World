<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getSession } from '../model/session'
import { calculateDistance } from '../model/stats'
import { type Activity, postData, useCreate, useDelete, useEdit } from '../model/activities'
const { create } = useCreate()
const { remove } = useDelete()
const { edit } = useEdit()

let show = ref(false);
let showEdit = ref(false);
let editing = ref(false)
let post = ref(-1)

const session = getSession()

let posts = ref<Array<{ title: string; date: string; duration: string; distance: string, location: string, subject: string }>>([]);
onMounted(async () => {
  try {
    if (session.user) {
      const result = await postData().data(session.user.email);
      posts.value = result.posts
    }
  } catch (error) {
    console.error(error);
  }
});

const removePost = async (index: number) => {
  try {
    if (session.user) {
      const reversedIndex = posts.value.length - 1 - index;
      posts.value.splice(reversedIndex, 1);
      await remove(session.user.email, posts.value);
    }
  } catch (error) {
    console.error('Error removing post:', error);
  }
};


const title = ref('')
const date = ref('')
const duration = ref('')
const location = ref('')
const subject = ref('')
const distance = ref('')

const doPost = async () => {
  if (session.user) {
    try {
      // Create the post using the create method
      await create(session.user.email, title.value, date.value, duration.value, distance.value, location.value, subject.value);

      // Retrieve the updated posts from the server (assuming your backend returns the updated list of posts)
      const result = await postData().data(session.user.email);

      // Update the posts array with the new data
      posts.value = result.posts;

      // Reset form fields or perform any other necessary actions
      title.value = '';
      date.value = '';
      duration.value = '';
      distance.value = '';
      subject.value = '';
      location.value = '';

      // Close the modal
      show.value = false;
    } catch (error) {
      console.error('Error adding post:', error);
    }
  }
}
const newtitle = ref('')
const newdate = ref('')
const newduration = ref('')
const newlocation = ref('')
const newsubject = ref('')
const newdistance = ref('')

const i = ref(0)
const currTitle = ref('')
const currDate = ref('')
const currDuration = ref('')
const currLocation = ref('')
const currSubject = ref('')
const currDistance = ref('')
const getIndex = (index: number) => {
  const reversedIndex = posts.value.length - 1 - index;
  i.value = reversedIndex
  currTitle.value = posts.value[i.value].title
  currDate.value = posts.value[i.value].date
  currDuration.value = posts.value[i.value].duration
  currLocation.value = posts.value[i.value].location
  currSubject.value = posts.value[i.value].subject
  currDistance.value = posts.value[i.value].distance
}

const editPost = async () => {
  console.log(posts.value[i.value])
  console.log(newtitle.value)
  if(newtitle.value){
    posts.value[i.value].title = newtitle.value
  }
  if(newdate.value){
    posts.value[i.value].date = newdate.value
  }
  if(newduration.value){
    posts.value[i.value].duration = newduration.value 
  }
  if(newlocation.value){
    posts.value[i.value].location = newlocation.value
  }
  if(newsubject.value){
    posts.value[i.value].subject = newsubject.value
  }
  if(newdistance.value){
    posts.value[i.value].distance = newdistance.value
  }

  if(session.user){
    await edit(session.user.email, posts.value);
  }

  newtitle.value = ''
  newdate.value = ''
  newduration.value = ''
  newlocation.value = ''
  newsubject.value = ''
  newdistance.value = ''
};


// const doCalculation = () => {
//   calculateDistance(formData.value.distance);
// }

// const myActivities = computed(() =>
//   activities.value.filter((activity) => activity.userid === userid)
// );

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
                    <input class="input" type="number" placeholder="Distance in feet" v-model="distance">
                  </div>
                </div>

                <div class="field is-flex is-flex-direction-column has-text-left">
                  <label class="label">Location</label>
                  <div class="control">
                    <input class="input" type="text" placeholder="" v-model="location">
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
                <button class="button is-success" @click.prevent="doPost">Save
                  changes</button>
                <button class="button" @click="show = !show; editing = false">Cancel</button>
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
                      <strong>{{ session.user.firstName }} {{ session.user.lastName }}</strong> <small>{{
                        session.user.email
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
                  Delete
                  <button class="delete" @click="removePost(index)"></button>
                  <button class="button is-info is-small edit"
                    @click.prevent="getIndex(index); showEdit=!showEdit;">Edit</button>
                </div>
              </article>
            </div>

            <div v-if="showEdit">
              <div class="modal is-active">
                <div class="modal-background"></div>
                <div class="modal-card">

                  <header class="modal-card-head">
                    <p class="modal-card-title">Edit: Leave fields you don't want to change blank</p>
                    <button class="delete" @click="showEdit = !showEdit"></button>
                  </header>

                  <div class="modal-card-body">

                    <div class="field is-flex is-flex-direction-column has-text-left">
                      <label class="label">Title</label>
                      <div class="control">
                        <input class="input" type="text" :placeholder=currTitle v-model="newtitle">
                      </div>
                    </div>

                    <div class="field is-flex is-flex-direction-column has-text-left">
                      <label class="label" for="datePicker">Date:</label>
                      <input class="input" type="date" id="datePicker" name="date" :placeholder=currDate v-model="newdate">
                    </div>

                    <div class="field is-flex is-flex-direction-column has-text-left">
                      <label class="label">Duration</label>
                      <div class="control">
                        <input class="input" type="text" :placeholder=currDuration v-model="newduration">
                      </div>
                    </div>

                    <div class="field is-flex is-flex-direction-column has-text-left">
                      <label class="label">Distance</label>
                      <div class="control">
                        <input class="input" type="number" :placeholder=currDistance v-model="newdistance">
                      </div>
                    </div>

                    <div class="field is-flex is-flex-direction-column has-text-left">
                      <label class="label">Location</label>
                      <div class="control">
                        <input class="input" type="text" :placeholder=currLocation v-model="newlocation">
                      </div>
                    </div>

                    <div class="field field is-flex is-flex-direction-column has-text-left">
                      <label class="label">Subject</label>
                      <div class="control">
                        <div class="select">
                          <select :placeholder=currSubject v-model="newsubject">
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
                    <button class="button is-success" @click.prevent="editPost(); showEdit=!showEdit">Save
                      changes</button>
                    <button class="button" @click="showEdit = !showEdit;">Cancel</button>
                  </footer>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </h2>
  </main>
</template>

<style scoped>
.edit {
  margin: .5rem;
}
</style>
