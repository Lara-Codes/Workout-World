<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import LoginBadge from './LoginBadge.vue';
import { getSession, login } from '../model/session'

let dropdown = false; 
let isActive = ref(dropdown)

function drop(){
  dropdown = !dropdown; 
}
const session = getSession()
</script>

<template>
  <!-- NAVBAR  -->
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-item"></div>
    <div class="navbar-brand">
      <RouterLink class="navbar-item" to="/">
        <img src="@/assets/logo.svg" width="28" height="28">
      </RouterLink>
    </div>
    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start">
        <RouterLink class="navbar-item" to="/activity">
          <span class="icon">
            <i class="fas fa-running"></i>
          </span>
          My Activity
        </RouterLink>
        <RouterLink class="navbar-item" to="/stats">
          <span class="icon">
            <i class="fas fa-chart-line"></i>
          </span>
          Statistics
        </RouterLink>
        <RouterLink class="navbar-item" to="/friends">
          <span class="icon">
            <i class="fas fa-users"></i>
          </span>
          Friends Activity
        </RouterLink>
        <RouterLink class="navbar-item" to="/search">
          <span class="icon">
            <i class="fas fa-search"></i>
          </span>
          People Search
        </RouterLink>

        <div class="navbar-item has-dropdown is-hoverable">
          
          <a class="navbar-link">
            Admin
          </a>

          <div class="navbar-dropdown" v-if="session.user">
            <RouterLink class="navbar-item" to="/login">
              Users
            </RouterLink>
          </div>
          <div class="navbar-dropdown" v-else>
            <RouterLink class="navbar-item" to="/login">
              Users
            </RouterLink>
          </div>

        </div>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <LoginBadge />
        </div>

        <!-- <RouterLink class="navbar-item" to="signup">
          <strong>Sign up</strong>
        </RouterLink>
        <div class="buttons">
          <div class="dropdown is-active">
            <div class="dropdown-trigger">
              <button class="button" aria-haspopup="true" aria-controls="dropdown-menu">
                <span>Login</span>
                <span class="icon is-small">
                  <i class="fas fa-angle-down" aria-hidden="true"></i>
                </span>
              </button>
            </div>
            <div class="dropdown-menu" id="dropdown-menu" role="menu">
              <div class="dropdown-content">
                <a href="#" class="dropdown-item">
                  Moshe 
                </a>
                <a class="dropdown-item">
                  Kamala Harris 
                </a>
                <a href="#" class="dropdown-item">
                  John Smith 
                </a>
                <hr class="dropdown-divider">
                <a href="#" class="dropdown-item">
                  Other Account
                </a>
              </div>
            </div>
          </div>

          <button class="button">
            <span class="icon">
              <i class="fab fa-twitter"></i>
            </span>
            <a href="https://twitter.com/i/flow/login?redirect_after_login=%2Fintent%2Ftweet%3Ftext%3DBulma%3A%2520a%2520modern%2520CSS%2520framework%2520based%2520on%2520Flexbox%26hashtags%3Dbulmaio%26url%3Dhttps%3A%2F%2Fbulma.io%26via%3Djgthms"
              target="_blank" style="color:inherit"><span>Tweet</span></a>
          </button>
          <div class="navbar-item"></div>
        </div>-->
        
      </div> 

    </div>

  </nav>
</template>

<style scoped>
.icon {
  padding-right: 10px;
}

.button{
  margin:15px; 
}

.router-link{
  color: #00b1d2;
}
.router-link-active {
  font-weight: bold;
  border-top: 2px solid #00b1d2;
}

.navbar {
        border-bottom: 2px solid #00b1d2;/* You can change the color and thickness as needed */
    }

</style>