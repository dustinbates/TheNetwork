<template>
  <Navbar />
  <header class="p-3">
    <div v-if="!appState.loggedIn" class="text-center fs-1 mb-2">
      <Login />
    </div>
    <div v-if="appState.loggedIn" class="container sticky-top">
      <div class="row flex-column text-light">
        <div class="card text-dark p-3 ">
          <div class="text-center">
            <router-link :to="{ name: 'Profile', params: { profileId: appState.account.id } }">
              <img :src="appState.account.picture" :alt="appState.account.name" class="rounded-circle img-fluid">
            </router-link>
          </div>
          <div class="d-flex align-items-center">
            <h6 class="p-0 m-0 mt-2">{{ appState.account.class }}</h6>
            <i v-if="appState.account.graduated" class="mdi mdi-school fs-4 ms-2 mt-1"></i>
          </div>
          <div>
            <h2 class="p-0 m-0">{{ appState.account.name }}</h2>
          </div>
          <div>
            <ul class="p-0">
              <li v-if="appState.account.github" class="d-flex align-items-center">
                <a :href="appState.account.github">
                  <i class="mdi mdi-github fs-1"></i>
                </a>
                <p class="m-0">Github</p>
              </li>
              <li v-if="appState.account.linkedin" class="d-flex align-items-center">
                <a :href="appState.account.linkedin">
                  <i class="mdi mdi-linkedin fs-1"></i>
                </a>
                <p class="m-0">LinkedIn</p>
              </li>
              <li v-if="appState.account.resume" class="d-flex align-items-center">
                <a :href="appState.account.resume">
                  <i class="mdi mdi-note fs-1"></i>
                </a>
                <p class="m-0">Resume</p>
              </li>
              <li class="d-flex align-items-center">
                <router-link :to="{ name: 'Account' }">
                  <i class="mdi mdi-cog fs-1"></i>
                </router-link>
                <p class="m-0">Account Settings</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="container-fluid">
      <Loading />
    </div>

    <div class="mt-2">
      <AdCard />
    </div>
  </header>

  <main>
    <router-view />
  </main>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
import AdCard from './components/AdCard.vue'
import Loading from './components/Loading.vue'
import Login from './components/Login.vue'
import Navbar from './components/Navbar.vue'

export default {
  setup() {
    return {
      appState: computed(() => AppState)
    }
  },
  components: { Navbar, Login, AdCard, Loading }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

:root {
  --main-height: calc(100vh - 32px - 64px);
}

header {
  min-width: 24vw;
  max-width: 24vw;
}

footer {
  display: grid;
  place-content: center;
  // height: 32px;
}

ul {
  list-style-type: none;
}
</style>
