import { AppState } from "../AppState"
import { Profile } from "../models/Account"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class ProfilesService {
  async getProfileById(profileId){
    const res = await api.get('api/profiles/' + profileId)
    logger.log('getting profile', res.data)
    AppState.profile = new Profile(res.data)
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
}

export const profilesService = new ProfilesService()