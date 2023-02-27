<template>
  <div v-if="profile" class="container-fluid">
    <div class="card margin">
      <div class="row">
        <div class="col-12 text-center">
          <img :src="profile.coverImg" :alt="profile.name" class="img-fluid cover-image" @error="brokenLink(profile, 'coverImg')">
        </div>
        <div class="col-12 d-flex justify-content-between profileHeight">
          <div class="d-flex">
            <img :src="profile.picture" :alt="profile.name" class="profile-picture rounded-circle" @error="brokenLink(profile, 'profileImg')">
            <h1 v-if="profile.name" class="ms-4 mt-1">{{ profile.name }}</h1>
            <i :class="`${profile.graduated ? 'mdi mdi-school fs-1 ms-2' : ''}`"></i>
          </div>
          <div class="me-3">
            <span v-if="profile.github">
              <a :href="profile.github" target="_blank">
                <i class="mdi mdi-github fs-1 ms-2"></i>
              </a>
            </span>
            <span v-if="profile.linkedin">
              <a :href="profile.linkedin" target="_blank">
                <i class="mdi mdi-linkedin fs-1 ms-2"></i>
              </a>
            </span>
            <span v-if="profile.resume">
              <a :href="profile.resume" target="_blank">
                <i class="mdi mdi-note fs-1 ms-2"></i>
              </a>
            </span>
          </div>
        </div>
        <h4 v-if="profile.class" class="ms-2"><em>Class of {{ profile.class }} </em></h4>
      </div>
      <div class="row">
        <div class="col-12 m-2">
          <h3 class="">{{ profile.bio }}</h3>
        </div>
      </div>

    </div>

    <div v-if="profile.id == appState.account.id" class="mt-3 mb-3">
      <PostForm />
    </div>

    <div v-if="profilePosts" >
      <div  v-for="p in profilePosts" class="mt-3">
        <PostCard :post="p" />
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
import { useRoute } from 'vue-router';
import { AppState } from '../AppState';
import PostCard from '../components/PostCard.vue';
import PostForm from '../components/PostForm.vue';
import { Post } from '../models/Post';
import { postsService } from '../services/PostsService';
import { profilesService } from '../services/ProfilesService';
import Pop from '../utils/Pop';

export default {
  setup() {
    const route = useRoute();
    async function getProfileById() {
      try {
        const profileId = route.params.profileId;
        await profilesService.getProfileById(profileId);
      }
      catch (error) {
        Pop.error(error, "getting profile by id");
      }
    }
    async function getPostsByProfileId() {
      try {
        const profileId = route.params.profileId;
        await profilesService.getPostsByProfileId( profileId );
      }
      catch (error) {
        Pop.error(error, "getting posts by profile id");
      }
    }
    onMounted(async () => {
      await getProfileById();
      await getPostsByProfileId();
    });
    onUpdated(() => {
      window.scrollTo(0, 0)
    });
    return {
      appState: computed(() => AppState),
      profile: computed(() => AppState.profile),
      page: computed(() => AppState.page),
      newer: computed(() => AppState.newer),
      older: computed(() => AppState.older),
      profilePosts: computed(() => AppState.profilePosts),
      
      async changePage(direction) {
        try {
          await postsService.changePage(direction)
        } catch (error) {
          Pop.error(error, 'changing page')
        }
      },
      brokenLink(profile, problem){
        if(problem == "profileImg"){
          profile.picture = 'https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_square.jpg'
        } else if(problem == "coverImg"){
          profile.coverImg = 'https://upload.wikimedia.org/wikipedia/commons/1/15/Cat_August_2010-4.jpg'
        }
      }
    }
  },
  components: { PostForm }
}
</script>


<style lang="scss" scoped>
.cover-image {
  height: 40vh;
  width: 100%;
  object-fit: cover;
}

.profile-picture {
  height: 20vh;
  width: 20vh;
  object-fit: cover;
  transform: translateY(-5em);
  margin-left: 3em;
  position: relative;
}

.graduatedClass{
}

.profileHeight{
  height: 11vh;
}

.margin{
  margin-top: 9vh;
}
</style>