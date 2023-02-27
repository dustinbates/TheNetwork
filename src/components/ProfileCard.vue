<template>
  <div class="card text-start">
    <span class="d-flex align-items-center ms-2 mt-2">
      <router-link v-if="profile.id" :to="{ name: 'Profile', params: { profileId: profile.id } }">
        <img class="card-img-top profile-pic" :src="profile.picture" alt="Title" @error="brokenLink(profile, 'profileImg')">
      </router-link>
    </span>
    <div class="card-body">
      <h4 class="card-title">{{ profile.name }}</h4>
      <p class="card-text">{{ profile.bio }}</p>
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

  setup() {

    return {
      brokenLink(profile, problem) {
        if (problem == "profileImg") {
          profile.picture = 'https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_square.jpg'
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
.profile-pic {
  height: 64px;
  width: 64px;
  border-radius: 50%;
  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.541);
}
</style>