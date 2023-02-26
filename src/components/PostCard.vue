<template>
  <div class="card text-start ">
    <div class="card-body">
      <button v-if="post.creator.id == account.id" @click="deletePost()" class="btn btn-danger">
        <i class="mdi mdi-delete"></i>
      </button>
      <span class="d-flex align-items-center mb-2">
        <router-link :to="{ name: 'Profile', params: { profileId: post.creator.id } }">
          <img class="profile-pic" :src="post.creator.picture" alt="">
        </router-link>
        <h4 class="card-title ms-3">{{ post.creator.name }}</h4>
      </span>
      <p class="date" :datetime="post.createdAt"></p>
      <p class="card-text">{{ post.body }}</p>
      <img v-if="post.imgUrl" class="card-img-top img-fluid" :src="post.imgUrl" alt="Title">
      <div>
        <i v-if="appState.loggedIn" @click="addLike()" class="mdi mdi-heart-outline">{{ post.likeIds.length }} </i>
      </div>
    </div>
  </div>
</template>


<script>
import { Post } from '../models/Post.js';
import { computed, onUpdated } from 'vue'
import { AppState } from '../AppState.js';
import Pop from '../utils/Pop';
import { postsService } from '../services/PostsService';
import * as timeago from 'timeago.js';


export default {
  props: {
    post: {
      type: Post,
      required: true,
    }
  },

  setup(props) {

  onUpdated(() => {
    timeago.render(document.querySelectorAll('.date'));
  })


    return {
      appState: computed(() => AppState),
      account: computed(() => AppState.account),
      async deletePost() {
        try {
          if (await Pop.confirm())
            await postsService.deletePost(props.post.id)
        } catch (error) {
          Pop.error(error, 'deleting post')
        }
      },
      async addLike(post, likeId) {
        try {
          // let post = props.post
          let likeId = this.account.id
          console.log(likeId)
          await postsService.addLike(props.post, likeId)
        } catch (error) {
          Pop.error(error, 'adding like')
        }
      },
    }
  }
}
</script>


<style lang="scss" scoped>
.post-image {
  height: 20vh;
  width: 20vh;
}

.profile-pic {
  height: 50px;
  width: 50px;
  border-radius: 50%;

}
</style>