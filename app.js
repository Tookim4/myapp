const express = require('express')
const { default: mongoose, get } = require('mongoose')
const app = express()
const port = 3000
const Blog = require ('./models/blogModel.js')

// const mongoose = require('mongoose')

const dbURI = 'mongodb+srv://blog-user:a6HiqQqXvqVmhGJ6@blog0.ho1tvum.mongodb.net/'

mongoose.connect(dbURI)
  .then((result) => console.log('connected to db'))
  .catch((err) => console.log(err))

//listen for requests       
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

//static middleware
app.use(express.static('public'))

//morgan middleware for logging
var morgan = require('morgan')
app.use(morgan('tiny'))

//setting up the view engine
app.set('view engine', 'ejs')
app.set('views', './views')


// sandbox routesz
// create a new blog
// app.get('/add-blog', (req, res) => {
//     const blog = new Blog({
//         title: 'my 2nd blog',
//         snippet: 'About my 2nd new blog',
//         body: 'More about my new blog'
//     })

//     blog.save()
//         .then((result) => {
//             res.send(result)
//         })
//         .catch((err) => {
//             console.log(err)
//         })
// })

// // get all blogs
// app.get('/all-blogs', (req, res) => {
//     Blog.find()
//         .then((result) => {
//             res.send(result)
//         })
//         .catch((err) => {
//             console.log(err)
//         })
// })

// // get a single blog
// app.get('/single-blog', (req, res) => {
//     Blog.findById('68b9f3a916c2daf25f4d3f67')
//         .then((result) => {
//             res.send(result)
//         })
//         .catch((err) => {
//             console.log(err)
//         })
// })




app.get('/', (req, res) => {
    res.redirect('/blogs')
})

app.get('/blogs', (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render('index', { blogs: result, header: 'All Blogs', title: 'All Blogs' })
        })
        .catch((err) => {
            console.log(err)
        })
})

app.get('/about', (req, res) => {
    //   res.send('Hello World!')
    res.render('about', { header: 'About Me', title: 'About Me', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' })
})

app.get('/createBlog', (req, res) => {
    //   res.send('Hello World!')
    res.render('createBlog', { header: 'Create Blog', title: 'Create Blog' })
})


// 404 page, This is a middleware
app.use((req, res) => {
    res.status(404).render('404', { header: '404' , title: '404' , text: 'Page Not Found' })
})
