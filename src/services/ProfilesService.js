import { AppState } from "../AppState"
import { Profile } from "../models/Account"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { api } from "./AxiosService"

class ProfilesService {
  async getProfileById(profileId){
    try {
      const res = await api.get('api/profiles/' + profileId)
      logger.log('getting profile', res.data)
      AppState.profile = new Profile(res.data)
    } catch (error) {
      Pop.error(error, 'getting data')
    }
    
  }

  async getPostsByProfileId(profileId){
    const res = await api.get('api/profiles/' + profileId + '/posts')
    logger.log('getting posts by profile', res.data)
    AppState.profilePosts = res.data.posts
    console.log(res.data.page);
    AppState.totalPages = res.data.totalPages
    AppState.page = res.data.page
    AppState.newer = res.data.newer
    AppState.older = res.data.older
    
  }
  async changeProfilePage(direction){
    const url = direction == 'newer' ? AppState.newer : AppState.older
    const res = await api.get(url)
    logger.log('getting posts', res.data)
    AppState.profilePosts = res.data.posts
    AppState.totalPages = res.data.totalPages
    AppState.page = res.data.page
    AppState.newer = res.data.newer
    AppState.older = res.data.older
    logger.log(AppState.posts)
  }
}



export const profilesService = new ProfilesService()