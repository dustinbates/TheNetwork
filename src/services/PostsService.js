import { AppState } from "../AppState"
import { Post } from "../models/Post"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class PostsService {
  async getPosts(){
    const res = await api.get('api/posts')
    logger.log('getting posts', res.data)
    AppState.posts = res.data.posts.map(p => new Post(p))
    logger.log(AppState.posts)
  }

  async createPost(formData){
    const res = await api.post('api/posts/', formData)
    this.getPosts()
    return res.data
  }

  async deletePost(id){
    const res = await api.delete('api/posts/' + id)
    logger.log('deleted post')
    AppState.posts = AppState.posts.filter(p => p.id != id)
  }

}

export const postsService = new PostsService() 