export class Profile{
  constructor(data){
    this.id = data._id
    this.name = data.name
    this.picture = data.picture
    this.bio = data.bio
    this.class = data.class
    this.graduated = data.graduated
  }
}