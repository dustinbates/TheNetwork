<template>
  <div>

  </div>
  <div class="container-fluid main-margin">
    <div class="row">
      <div class="col-md-8 m-auto mt-3">
        <PostForm />
      </div>
    </div>
    <div class="row">
      <div v-if="posts" v-for="p in posts" class="col-md-8 m-auto mt-3">
        <PostCard :post="p" />
      </div>
    </div>
    <div class="row">
      <div v-if="profiles" v-for="prof in profiles" class="col-md-8 m-auto mt-3">
        <ProfileCard :profile="prof" />
      </div>
    </div>
    <div class="row">
      <div class="col-12 d-flex justify-content-center">
        <button v-if="newer" @click="changePage('newer')" class="btn btn-outline-primary">Newer Posts</button>
        <div class="fs-3 mx-4">{{ page }}</div>
        <button v-if="older" @click="changePage('older')" class="btn btn-outline-primary">Older Posts</button>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, computed, onUpdated } from 'vue';
import { AppState } from '../AppState';
import Navbar from '../components/Navbar.vue';
import PostCard from '../components/PostCard.vue';
import PostForm from '../components/PostForm.vue';
import ProfileCard from '../components/ProfileCard.vue';
import { postsService } from '../services/PostsService.js'
import Pop from '../utils/Pop';


export default {
  setup() {
    async function getPosts() {
      try {
        await postsService.getPosts();
      }
      catch (error) {
        Pop.error(error, "getting posts");
      }
    }

    onMounted(() => {
      getPosts();
    });
    onUpdated(() => {
      window.scrollTo(0, 0)
    })

    return {
      profiles: computed(() => AppState.profiles),
      appState: computed(() => AppState),
      posts: computed(() => AppState.posts),
      page: computed(() => AppState.page),
      newer: computed(() => AppState.newer),
      older: computed(() => AppState.older),
      async changePage(direction) {
        try {
          await postsService.changePage(direction)
        } catch (error) {
          Pop.error(error, 'changing page')
        }
      }
    };
  },

  components: { PostCard, PostForm, Navbar, ProfileCard }
}
</script>

<style scoped lang="scss">
.main-margin{
  margin-top: 10vh;
}
</style>
