<template>
  <div v-if="appState.loggedIn" class="card">
    <div class="row justify-content-evenly">
      <div class="col-2 d-flex justify-content-center mt-4">
        <router-link :to="{ name: 'Profile', params: { profileId: account.id } }">
        <img class="profile-pic" :src="account.picture" :alt="account.name">
        </router-link>
      </div>
      <div class="col-9 m-2">
        <form @submit.prevent="handleSubmit()">
          <div class="text-center">
            <textarea v-model="editable.body" type="text" class="form-control" id="body"
              placeholder="Share what's happening"></textarea>
          </div>
          <div>
            <input v-model="editable.imgUrl" type="text" class="form-control" id="imgUrl" placeholder="Image URL...">
          </div>
          <div class="text-end">
            <button type="submit" class="btn btn-primary">
              <i class="mdi mdi-send"></i>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>


<script>
import { computed, ref } from 'vue';
import { AppState } from '../AppState';
import { postsService } from '../services/PostsService';
import Pop from '../utils/Pop';

export default {

  setup() {
    const editable = ref({})
    return {
      editable,
      account: computed(() => AppState.account),
      appState: computed(() => AppState),

      async handleSubmit() {
        try {
          await postsService.createPost(editable.value)
        } catch (error) {
          Pop.error(error, 'create post')
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

}
</style>