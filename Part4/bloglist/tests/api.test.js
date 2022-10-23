const mongoose = require('mongoose')
const helper = require('./test_helper')

const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')


const supertest = require('supertest')
const app = require('../app')

beforeEach(async () => {
  await User.deleteMany({})
  await Blog.deleteMany({})
  const noteObjects = helper.initialBlogs

    .map(blog => new Blog(blog))
  const promiseArray = noteObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

describe('get all blog information', () => {
  var header_values

  beforeEach(async () => {
    const newUser = {
      username: 'root',
      name: 'root',
      password: 'password',
    }

    await api
      .post('/api/users')
      .send(newUser)

    const result = await api
      .post('/api/login')
      .send(newUser)

    header_values = {
      'Authorization': `bearer ${result.body.token}`
    }
  })

  test('blogs are returned from database as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .set(header_values)
      .expect('Content-Type', /application\/json/)
  })

  test('when there are two blogs', async () => {
    const response = await api
                        .get('/api/blogs')
                        .set(header_values)

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('when the first blog is about React patterns', async () => {
    const response = await api
                      .get('/api/blogs')
                      .set(header_values)

    const contents = response.body.map(r => r.title)
    expect(contents).toContain('React patterns')
  })

  test('The unique identifier property is _id', async () => {

    const blogs = await Blog.find({})
    expect(blogs[0]._id).toBeDefined()
  })
})

describe('Adding a new blog', () => {

  let header_values
  beforeEach(async () => {
    const newUser = {
      username: 'root',
      name: 'root',
      password: 'password',
    }

    await api
      .post('/api/users').send(newUser)

    const result = await api
      .post('/api/login').send(newUser)

    header_values= {
      'Authorization': `bearer ${result.body.token}`
    }
  })

  test('A valid blog can be added successfully', async () => {
    const newBlog = {
      title:"Canonical string reduction",
      author:"Edsger W. Dijkstra",
      url:"http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes:12
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .set(header_values)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const contents = blogsAtEnd.map(n => n.title)
    expect(contents).toContain(
      'Canonical string reduction'
    )
  })

  test('when the title and url are missing respond with 400 bad request', async () => {
    const newBlog = {
      author:"Edsger W. Dijkstra",
      likes:12
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set(header_values)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })

  test('when the likes property is missing default to 0 ', async () => {
    const newBlog = {
      title:"First class tests",
      author:"Robert C. Martin",
      url:"http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set(header_values)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    const addedBlog = await blogsAtEnd.find(blog => blog.title === "First class tests")
    expect(addedBlog.likes).toBe(0)
  })
})

describe('Update a blog', () => {
  let header_values


  beforeEach(async () => {
    const newUser = {
      username: 'root',
      name: 'root',
      password: 'password',
    }

    await api
      .post('/api/users')
      .send(newUser)

    const result = await api
      .post('/api/login')
      .send(newUser)

    header_values= {
      'Authorization': `bearer ${result.body.token}`
    }
  })

  test('Blog update successful ', async () => {

    const newBlog = {
      title:"Masterpiece",
      author:"Edsger W. Dijkstra",
      url:"http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes:12
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set(header_values)
      .expect(200)

    const allBlogs = await helper.blogsInDb()
    const blogToUpdate = allBlogs.find(blog => blog.title === newBlog.title)

    const updatedBlog = {
      ...blogToUpdate,
      likes: blogToUpdate.likes + 1
    }

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .set(header_values)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    const foundBlog = blogsAtEnd.find(blog => blog.likes === 13)
    expect(foundBlog.likes).toBe(13)
  })
})

describe('Deletion of a blog', () => {
  let header_values
  beforeEach(async () => {
    const newUser = {
      username: 'root',
      name: 'root',
      password: 'password',
    }

    await api
      .post('/api/users')
      .send(newUser)

    const result = await api
      .post('/api/login')
      .send(newUser)

    header_values
     = {
      'Authorization': `bearer ${result.body.token}`
    }
  })

  test('succeeds with status code 204 if id is valid ', async () => {
    const newBlog = {
      title:"The best blog ever",
      author:"Me",
      url:"http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes:12
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set(header_values)
      .expect(200)

    const allBlogs = await helper.blogsInDb()
    const blogToDelete = allBlogs.find(blog => blog.title === newBlog.title)

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set(header_values)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length
    )

    const contents = blogsAtEnd.map(re => re.title)

    expect(contents).not.toContain(blogToDelete.title)
  })
})

afterAll(() => {
  mongoose.connection.close()
})