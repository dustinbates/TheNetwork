import { AppState } from "../AppState"
import { Profile } from "../models/Profile"
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

  async addLike(post, likeId){
    console.log(post.likeIds.includes(likeId));
    if(!post.likeIds.includes(likeId)){
      let like = likeId
      const res = await api.post('api/posts/' + post.id + '/like', like )
      return  post.likeIds.push(like)
      
    } 
    if(post.likeIds.includes(likeId)) {
      let like = likeId
      const res = await api.post('api/posts/' + post.id + '/like/', like)
      let index = post.likeIds.findIndex(l => l == likeId)
      return post.likeIds.splice(index, index + 1)
      
    }
  }

  async searchPosts(searchData){
    const res = await api.get('/api/posts?query=' + searchData.query) 
    AppState.posts = res.data.posts.map(p => new Post(p))
    AppState.totalPages = res.data.totalPages
    AppState.page = res.data.page
    AppState.newer = res.data.newer
    AppState.older = res.data.older
    logger.log(AppState.posts)
  }

  async searchProfiles(searchData){
    const res = await api.get('/api/profiles?query=' + searchData.query) 
    console.log(res.data);
    AppState.profiles = res.data.map(p => new Profile(p))
  }
}

export const postsService = new PostsService() 