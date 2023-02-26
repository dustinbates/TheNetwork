<template>
  <Navbar />
  <header class="p-3">
    
    <div v-if="appState.loggedIn" class="container sticky-top">
      <div class="row flex-column text-light">
        <div class="col-12">
          <router-link :to="{ name: 'Profile', params: { profileId: appState.account.id } }">
            <img :src="appState.account.picture" alt="" class="rounded-circle">
          </router-link>
        </div>
        <div class="col-12">
          <p>{{ appState.account.class }}</p>
        </div>
        <div class="col-12">
          <p>{{ appState.account.name }}</p>
        </div>
        <div class="col-12">
          <ul>
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
          </ul>
        </div>
        <div class="col-12">

        </div>
      </div>
    </div>
    <div>

      <Login />
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

header{
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
