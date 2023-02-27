<template>
  <div class="card text-start shadow">
    <div class="card-body">
      <div class="d-flex justify-content-between">
        <span class="d-flex align-items-center mb-2">
          <router-link :to="{ name: 'Profile', params: { profileId: post.creator.id } }">
            <img class="profile-pic" :src="post.creator.picture" alt="" @error="brokenLink(post, 'profileImg')">
          </router-link>
          <div class="d-flex align-items-center">
            <h4 class="card-title ms-3">{{ post.creator.name }}</h4>
            <i v-if="post.creator.graduated" class="mdi mdi-school fs-5 mb-1 ms-2"></i>
          </div>
        </span>
        <div v-if="post.creator.id == account.id" class="dropdown text-end">
          <button class="btn btn-outline-dark dropdown-toggle" type="button" data-bs-toggle="dropdown"
            aria-expanded="false">
          </button>
          <ul class="dropdown-menu text-center">
            <li class="list-group-item dropdown-item list-group-item-action text-danger selectable" @click="deletePost()">
              Delete
              <i class="mdi mdi-delete"></i>
            </li>
          </ul>
        </div>
      </div>


      <p class="date" :datetime="post.createdAt"></p>
      <p class="card-text">{{ post.body }}</p>
      <img v-if="post.imgUrl" class="card-img-top img-fluid" :src="post.imgUrl" alt="Title" id="bodyImg" @error="brokenLink(post, 'bodyImg')">
      <div class="text-end">
        <i v-if="appState.loggedIn && !post.isLIked" @click="addLike()" class="mdi mdi-heart-outline red fs-2 me-2">{{ post.likeIds.length }}
        </i>
        <i v-if="appState.loggedIn && post.isLIked" @click="addLike()" class="mdi mdi-heart red fs-2 me-2">{{ post.likeIds.length }}
        </i>
        
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
          let likeId = this.account.id
          console.log(likeId)
          await postsService.addLike(props.post, likeId)
        } catch (error) {
          Pop.error(error, 'adding like')
        }
      },
      brokenLink(post, problem){
        if(problem == "profileImg"){
          post.creator.picture = 'https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_square.jpg'
        } else if(problem == "bodyImg"){
          post.imgUrl = 'https://images.unsplash.com/photo-1611915387288-fd8d2f5f928b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80'
        }
      }
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
  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.541);
}

.red{
  color: hotpink;
}
</style>