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
          <div class="d-flex align-items-end">
            <h6 class="p-0 m-0 mt-2">{{ appState.account.class }}</h6>
            <i v-if="appState.account.graduated" class="mdi mdi-school fs-4 ms-3"></i>
          </div>
          <div >
            <h2 class="p-0 m-0">{{ appState.account.name }}</h2>
          </div>
          <div >
            <ul class="p-0">
              <li v-if="appState.account.github">
                <a :href="appState.account.github">
                  <i class="mdi mdi-github fs-1"></i>
                </a>
              </li>
              <li v-if="appState.account.linkedin">
                <a :href="appState.account.linkedin">
                  <i class="mdi mdi-linkedin fs-1"></i>
                </a>
              </li>
              <li v-if="appState.account.resume">
                <a :href="appState.account.resume">
                  <i class="mdi mdi-note fs-1"></i>
                </a>
              </li>
              <li>
                <router-link :to="{ name: 'Account' }">
                  <i class="mdi mdi-cog fs-1"></i>
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div>


    </div>
    <AdCard />
  </header>

  <main>
    <router-view />
  </main>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
import AdCard from './components/AdCard.vue'
import Login from './components/Login.vue'
import Navbar from './components/Navbar.vue'

export default {
  setup() {
    return {
      appState: computed(() => AppState)
    }
  },
  components: { Navbar, Login, AdCard }
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
