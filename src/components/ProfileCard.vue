<template>
  <div class="card text-start">
    <router-link v-if="profile.id" :to="{ name: 'Profile', params: { profileId: profile.id } }">
      <img class="card-img-top" :src="profile.picture" alt="Title">
    </router-link>
    <div class="card-body">
      <h4 class="card-title">{{profile.name}}</h4>
      <p class="card-text">{{profile.bio}}</p>
    </div>
  </div>
</template>


<script>
import { Profile } from '../models/Profile';

export default {
  props: {
    profile: {
      type: Profile,
      required: true,
    }
  },

  setup(){

    return {

    }
  }
}
</script>


<style lang="scss" scoped>

</style>