<script setup lang="ts">
  import { ref, onMounted, onUnmounted } from 'vue';
  import { RouterLink } from 'vue-router';
  import LoginBadge from './LoginBadge.vue';
  import { getSession } from '../model/session'
  import FlyoutPanel from './FlyoutPanel.vue';
  import ShoppingCart from './ShoppingCart.vue'

  const isShoppingCartOpen = ref(false);

  const session = getSession()

  let dropdown = false;
  let isActive = ref(dropdown)

  const mobileMenuOpen = ref(false);

  function toggleMobileMenu() {
    mobileMenuOpen.value = !mobileMenuOpen.value;
  }

  onMounted(() => {
    window.addEventListener('resize', closeMobileMenuOnResize);
  });

  onUnmounted(() => {
    window.removeEventListener('resize', closeMobileMenuOnResize);
  });

  const closeMobileMenuOnResize = () => {
    // Define your screen width threshold (e.g., 768 pixels)
    const screenWidthThreshold = 768;
    if (window.innerWidth >= screenWidthThreshold) {
      mobileMenuOpen.value = false;
    }
  };

</script>

<template>
  <section class="section">
    <!-- NAVBAR  -->

    <div v-if="mobileMenuOpen">
      <nav class="navbar" :class="{ 'is-active': mobileMenuOpen }" role="navigation" aria-label="dropdown navigation">
        <div class="navbar-item has-dropdown is-active">
          <div class="navbar-dropdown">
            <a class="navbar-item">
              <RouterLink to="/activity">My Activity</RouterLink>
            </a>
            <a class="navbar-item">
              <RouterLink to="/stats">Statistics</RouterLink>
            </a>
            <a class="navbar-item">
              <RouterLink to="/friends">Friends Activity</RouterLink>
            </a>
            <hr class="navbar-divider">
            <div class="navbar-item">
              <RouterLink to="/search">People Search</RouterLink>
            </div>
          </div>
        </div>
      </nav>
    </div>

    <nav class="navbar is-fixed-top" role="navigation" aria-label="main navigation">

      <div class="navbar-brand">
        <RouterLink class="navbar-item" to="/home">
          <img src="@/assets/logo.svg" width="28" height="28">
        </RouterLink>

        <!-- Add the hamburger button -->
        <a role="button" class="navbar-burger" :class="{ 'is-active': mobileMenuOpen }" aria-label="menu"
          aria-expanded="false" @click="toggleMobileMenu">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
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
              Users
            </a>

            <!-- If there is a user: -->
            <div class="navbar-dropdown" v-if="session.user">
              <div v-if="session.user.role === 'admin'">
                <RouterLink class="navbar-item" to="/users">
                  Users
                </RouterLink>
              </div>
              <div v-else>
                <RouterLink class="navbar-item" to="/">
                  Admin
                </RouterLink>
              </div>
            </div>

            <div class="navbar-dropdown" v-else>
              <RouterLink class="navbar-item" to="/">
                Users
              </RouterLink>
            </div>

          </div>
        </div>

        <div class="navbar-end">
          <div class="navbar-item">
            <LoginBadge />
          </div>

          <button class="button">
            <span class="icon">
              <i class="fab fa-twitter"></i>
            </span>
            <a href="https://twitter.com/i/flow/login?redirect_after_login=%2Fintent%2Ftweet%3Ftext%3DBulma%3A%2520a%2520modern%2520CSS%2520framework%2520based%2520on%2520Flexbox%26hashtags%3Dbulmaio%26url%3Dhttps%3A%2F%2Fbulma.io%26via%3Djgthms"
              target="_blank" style="color:inherit"><span>Tweet</span></a>
          </button>
        </div>

      </div>


      <!-- <div class="navbar-end">
      <div class="navbar-item">
        <a class="button" :class="{'is-active': isShoppingCartOpen }" @click.prevent="isShoppingCartOpen = !isShoppingCartOpen">
          <span class="icon">
            <i class="fas fa-shopping-cart"></i>
          </span>
        </a>
      </div>
    </div> -->

    </nav>
  </section>
  <!-- <FlyoutPanel :class="{'is-active': isShoppingCartOpen }">
    <ShoppingCart />
  </FlyoutPanel> -->
</template>

<style scoped>
.icon {
  padding-right: 10px;
}

.button {
  margin: 15px;
}

.router-link {
  color: #00b1d2;
}

.router-link-active {
  font-weight: bold;
  border-top: 2px solid #00b1d2;
}

.navbar {
  border-bottom: 2px solid #00b1d2;
  /* You can change the color and thickness as needed */
}
</style>