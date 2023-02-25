<template>
  <div class="card text-start">
    <div class="card-body">
      <button v-if="post.creator.id == account.id" @click="deletePost()" class="btn btn-danger">
        <i class="mdi mdi-delete"></i>
      </button>
      <span class="d-flex align-items-center mb-2">
        <img class="profile-pic" :src="post.creator.picture" :alt="post.creator.name">
        <h4 class="card-title ms-3">{{ post.creator.name }}</h4>
      </span>
      <p class="card-text">{{ post.body }}</p>
      <img v-if="post.imgUrl" class="card-img-top img-fluid" :src="post.imgUrl" alt="Title">
    </div>
  </div>


  
</template>


<script>
import { Post } from '../models/Post.js';
import { computed } from 'vue'
import { AppState } from '../AppState.js';
import Pop from '../utils/Pop';
import { postsService } from '../services/PostsService';

export default {
  props: {
    post: {
      type: Post,
      required: true,
    }
  },
  setup(props){

    return {
      account: computed(() => AppState.account),
      async deletePost(){
        try {
          if (await Pop.confirm())
            await postsService.deletePost(props.post.id)
        } catch (error) {
          Pop.error(error, 'deleting post')
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
  .post-image{
    height: 20vh;
    width: 20vh;
  }

  .profile-pic{
    height: 50px;
    width: 50px;
    border-radius: 50%;

  }

</style>