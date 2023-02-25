<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-8 m-auto mt-3">
        <PostForm />
      </div>
    </div>
    <div class="row">
      <div v-for="p in posts" class="col-md-8 m-auto mt-3">
        <PostCard :post="p" />
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, computed } from 'vue';
import { AppState } from '../AppState';
import PostCard from '../components/PostCard.vue';
import PostForm from '../components/PostForm.vue';
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
        return {
          posts: computed(() => AppState.posts)
        };
    },
    components: { PostCard, PostForm }
}
</script>

<style scoped lang="scss">

</style>
