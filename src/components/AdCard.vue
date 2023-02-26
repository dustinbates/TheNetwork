<template>
  <div v-for="ad in ads" class="card text-start">
    <img class="card-img-top" :src="ad.tall" alt="Title">
  </div>
</template>


<script>
import { onMounted, computed } from 'vue';
import { AppState } from '../AppState';
import { adsService } from '../services/AdsService'

export default {

  setup(){
    onMounted(async () => {
      await adsService.getAds()
    })

    return {
      ads: computed(() => AppState.ads)
    }
    
  }
}
</script>


<style lang="scss" scoped>

</style>