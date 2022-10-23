var _ = require('lodash')

const dummy = (blogs) => {
    return (1)
  }

  const totalLikes= (blogs) =>{
    let sum=0
    blogs.forEach(blog=>sum+=blog.likes)
    return (sum)
  }
  
const favouriteBlog= (blogs)=>{
    let maxLikes=0

    blogs.forEach(blog=>{
        if(blog.likes>maxLikes)
         maxLikes=blog.likes
         })

         console.log('maximun likes are',maxLikes)

         const favBlog=blogs.find(blog=> blog.likes===maxLikes)
         return(favBlog)
    

}

const mostBlogs = (blogs) =>{

  const result = _.countBy(blogs, (blog)=> blog.author);
  var maxBlogs=0,maxUser=''
  for(const user in result)
  {
    if(result[user]>maxBlogs)
    {
      maxBlogs=result[user]
      maxUser=user
    }
  }

   return ({author : maxUser, blogs : maxBlogs})
  
}

const mostLikes = (blogs) =>{
  
  var users = {}

  for(const user in blogs)
  {
    if(!users[blogs[user].author])
    users[blogs[user].author]=0

    users[blogs[user].author]+=blogs[user].likes
  }

  var maxLikes=0,maxUser

  for(const property in users)
  {
    if(users[property]>maxLikes)
    {

      maxLikes=users[property]
      maxUser=property
    }
  }

  return ({author : maxUser, likes : maxLikes})

}

  module.exports = {
    dummy,
    totalLikes, 
    favouriteBlog,
    mostBlogs,
    mostLikes
  }