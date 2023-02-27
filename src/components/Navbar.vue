<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark px-3 position-fixed justify-content-between">
    <router-link @click="getPosts()" class="navbar-brand d-flex" :to="{ name: 'Home' }">
      <div class="d-flex flex-column align-items-center">
        <!-- <img alt="logo" src="../assets/img/cw-logo.png" height="45" /> -->
        <span><i class="mdi mdi-nativescript fs-1"></i><em class="fs-2"> e t w o r k</em></span>
      </div>
    </router-link>
    <!-- <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarText"
      aria-controls="navbarText"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button> -->
    <!-- <div class="collapse navbar-collapse" id="navbarText"> -->
    <!-- </div> -->

    <div>
      <form @submit.prevent="searchPosts()">
        <div class="d-flex">
          <input v-model="editable.query"  type="text" class="form-control" placeholder="Search...">
            <button class="btn btn-outline-primary" type="submit">
              <i class="mdi mdi-magnify"></i>
            </button>
        </div>
      </form>
    </div>

  </nav>
</template>

<script>
import { ref, computed } from 'vue';
import { AppState } from '../AppState';
import { postsService } from '../services/PostsService';
import Pop from '../utils/Pop';
import Login from './Login.vue'
export default {
  setup() {
    const editable = ref({})
    return {
      editable,
      posts: computed(() => AppState.posts),
      async searchPosts(){
        try {
          let searchData = editable.value
          await postsService.searchPosts(searchData)
          await postsService.searchProfiles(searchData)
          editable.value = {}
        } catch (error) {
          Pop.error(error, 'searching posts')
        }
      },
      async getPosts(){
        try {
          await postsService.getPosts()
        } catch (error) {
          Pop.error(error, 'getting posts')
        }
      }
    }
  },
  components: { Login }
}
</script>

<style scoped>
a:hover {
  text-decoration: none;
}

.nav-link {
  text-transform: uppercase;
}

.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

@media screen and (min-width: 768px) {
  nav {
    height: 64px;
  }
}

.navbar{
  height: 10vh;
  width: 76vw;
  margin-left: 24vw;
  z-index: 10;

}

</style>
