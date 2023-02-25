<template>

  <header class="p-3">
    <!-- <Navbar /> -->
    <div>

      <div class="my-5">
        <Login />
      </div>

    </div>
  </header>

  <main>
    <router-view />
  </main>

  <footer class="bg-dark text-light p-3">
  </footer>

</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
import Login from './components/Login.vue'
import Navbar from './components/Navbar.vue'

export default {
  setup() {
    return {
      appState: computed(() => AppState)
    }
  },
  components: { Navbar, Login }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

:root{
  --main-height: calc(100vh - 32px - 64px);
}


footer {
  display: grid;
  place-content: center;
  // height: 32px;
}
</style>
