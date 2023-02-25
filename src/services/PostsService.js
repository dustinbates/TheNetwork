import { AppState } from "../AppState"
import { Post } from "../models/Post"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class PostsService {
  async getPosts(){
    const res = await api.get('api/posts')
    logger.log('getting posts', res.data)
    AppState.posts = res.data.posts.map(p => new Post(p))
    AppState.totalPages = res.data.totalPages
    AppState.page = res.data.page
    AppState.newer = res.data.newer
    AppState.older = res.data.older
    logger.log(AppState.posts)
  }

  async changePage(direction){
    const url = direction == 'newer' ? AppState.newer : AppState.older
    const res = await api.get(url)
    logger.log('getting posts', res.data)
    AppState.posts = res.data.posts.map(p => new Post(p))
    AppState.totalPages = res.data.totalPages
    AppState.page = res.data.page
    AppState.newer = res.data.newer
    AppState.older = res.data.older
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