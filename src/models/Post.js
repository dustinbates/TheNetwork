export class Post {
  constructor(data){
    this.id = data.id
    this.body = data.body
    this.creator = data.creator
    this.imgUrl = data.imgUrl
    this.likeIds = data.likeIds
    this.likes = data.likes
    this.updatedAt = data.updatedAt
    this.createdAt = data.createdAt
  }
}