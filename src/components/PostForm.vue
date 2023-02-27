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
            <textarea v-model="editable.body" type="text" class="form-control" style="resize: none" id="body"
              placeholder="Share what's happening"></textarea>
          </div>
          <div>
            <input v-model="editable.imgUrl" type="url" class="form-control" id="imgUrl" placeholder="Image URL..." hidden>
          </div>
          <div class="d-flex justify-content-between mt-2">
            <div class="d-flex align-items-center">
              <button @click="hideImgUrl('imgUrl')" type="button" class="btn btn-outline-primary">
                <i class="mdi mdi-image"></i>
              </button>
              <p class="m-0 ms-1 p-0">Add Image</p>
            </div>
            <div class="d-flex align-items-center">
              <button type="submit" class="btn btn-outline-primary">
                <i class="mdi mdi-send"></i>
              </button>
              <p class="m-0 ms-1 p-0">Post</p>
            </div>
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
      },
      hideImgUrl(){
        imgUrl.hidden = !imgUrl.hidden
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