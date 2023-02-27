<template>
  <div class="about text-center margin">
    <Login />
    <h1>Welcome, {{ account.name }}</h1>
    <img class="rounded" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
  </div>
  <div class="container-fluid">
    <div class="row">
      <div class="col-8 m-auto">
        <form @submit.prevent="editAccount()">
          <div class="mb-3">
            <label for="name" class="form-label">Name</label>
            <input required v-model="editable.name" type="text" class="form-control" id="name" name="name">
          </div>
          <div class="mb-3">
            <label for="class" class="form-label">Class</label>
            <input required v-model="editable.class" type="text" class="form-control" id="class" name="class">
          </div>
          <div class="mb-3">
            <label for="bio" class="form-label">Bio</label>
            <input v-model="editable.bio" type="text" class="form-control" id="bio">
          </div>
          <div class="mb-3">
            <label for="picture" class="form-label">Picture</label>
            <input required v-model="editable.picture" type="url" class="form-control" id="picture">
          </div>
          <div class="mb-3">
            <label for="coverImg" class="form-label">CoverImg</label>
            <input required v-model="editable.coverImg" type="url" class="form-control" id="coverImg">
          </div>
          <div class="mb-3">
            <label for="github" class="form-label">Github</label>
            <input v-model="editable.github" type="url" class="form-control" id="github">
          </div>
          <div class="mb-3">
            <label for="linkedin" class="form-label">Linkedin</label>
            <input v-model="editable.linkedin" type="url" class="form-control" id="linkedin">
          </div>
          <div class="mb-3">
            <label for="resume" class="form-label">Resume</label>
            <input v-model="editable.resume" type="url" class="form-control" id="resume">
          </div>
          <div class="form-check mb-3">
            <input v-model="editable.graduated" :checked="editable.graduated" class="form-check-input" type="checkbox"
              id="flexCheckDefault">
            <label class="form-check-label" for="flexCheckDefault">
              Graduated?
            </label>
          </div>
          <button class="btn btn-secondary" type="submit">Save</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref, watchEffect } from 'vue'
import { AppState } from '../AppState'
import Login from '../components/Login.vue'
import { accountService } from '../services/AccountService'
import { postsService } from '../services/PostsService'
import Pop from '../utils/Pop'

export default {
    setup() {
        const editable = ref({});
        watchEffect(() => {
            if (AppState.account.id) {
                editable.value = { ...AppState.account };
            }
        });
        return {
            editable,
            account: computed(() => AppState.account),
            async editAccount() {
                try {
                    const formData = editable.value;
                    await accountService.editAccount(formData);
                }
                catch (error) {
                    Pop.error(error, "editing account");
                }
            }
        };
    },
    components: { Login }
}
</script>

<style scoped>
img {
  max-width: 100px;
}

.margin{
  margin-top: 10vh;
}
</style>
